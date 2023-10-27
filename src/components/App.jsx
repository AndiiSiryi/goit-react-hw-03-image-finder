import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import getImages from './PixabayApi/PixabayApi';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './App.module.css';

export class App extends Component {
  state = {
    searchQuery: null,
    images: [],
    page: 1,
    totalHits: 0,
    isLoading: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
  if (this.state.searchQuery !== prevState.searchQuery || this.state.page !== prevState.page) {
    const { searchQuery, page } = this.state;

    if (!searchQuery) {
      Notify.failure('Search query is empty. Please enter a query.');
      return;
    }

    this.setState({ isLoading: true, error: null });

    getImages(searchQuery, page)
      .then((response) => {
        console.log(response);
        const { data } = response;

        if (data.totalHits === 0) {
          Notify.failure('No results, please try another query.');
          this.setState({ isLoading: false});
        } else {
          this.setState((prevState) => ({
            images: page === 1 ? [...data.hits] : [...prevState.images, ...data.hits],
            totalHits: data.totalHits,
            isLoading: false,
          }));
        }
      })
      .catch((error) => {
        this.setState({ error, isLoading: false });
        Notify.failure('Error');
      });
  }
}

   handleSubmit = (searchQuery) => {
    if (this.state.searchQuery === searchQuery) {
      Notify.warning(`You are already viewing the request ${searchQuery}`);
    return;
  }

    if (searchQuery !== this.state.searchQuery) {
      this.setState({ searchQuery, images: [], page: 1 });
    }
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoading, error } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        {error && <h2>Error, please, try again</h2>}
        {images.length > 0 ? <ImageGallery data={images} /> : (
          <p
            style={{
              padding: 100,
              textAlign: 'center',
              fontSize: 30,
              fontFamily: 'cursive',
              color: '#9797a5',
            }}
          >
            Image gallery is empty... 🖼️
          </p>
        )}
        {!isLoading && images.length !== 0 &&
          <Button onBtnClick={this.handleLoadMore} />}
        {isLoading && <Loader />}
      </div>
    );
  }
}
