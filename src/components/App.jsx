import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import getImages from './PixabayApi/PixabayApi';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './App.module.css'


export class App extends Component {

  state = {
    searchQuery: null,
    images: [],
    page: 1,
    totalHits: 0,
    isLoading: false,
    error: null,
  };

  queryImage = async searchQuery => {
    
    if (this.state.searchQuery === searchQuery) {
      Notify.warning('Search query is invalid');
      return;
    }
      
    if (searchQuery === '') {
    Notify.failure('Search query is empty. Please enter a query.');
    return;
  }
    this.setState({ isLoading: true });

    try {
      const {
        data: { hits, totalHits }
      } = await getImages(searchQuery, 1);
      if (!totalHits) Notify.failure('No results, please, try again');
      this.setState(_ => ({
        searchQuery,
        images: [...hits],
        page: 1,
        totalHits: totalHits,
        isLoading: false,
      }));
    } catch (error) {
      this.setState({ error });
      Notify.failure('Error');
    }

  };

  onBtnClick = async () => {
    try {
      const { page, searchQuery } = this.state;
      this.setState({ isLoading: true });

      const {
        data: { hits },
      } = await getImages(searchQuery, page + 1);
      if (hits.length === 0) Notify.failure('No results, please, try again');

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        page: prevState.page + 1,
        isLoading: false,
      }));
    } catch (error) {
      this.setState({ error});
      Notify.failure('Error');
    }
  };

  render() {
    const { images, isLoading, error } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.queryImage} />
        {error && <h2>Error, please, try again</h2>}
        {images.length > 0 ? (
         <ImageGallery data={images}/>
        ) : (
          <p
            style={{
              padding: 100,
              textAlign: 'center',
              fontSize: 30,
                fontFamily: 'cursive',
              color:'#9797a5',
            }}
          >
            Image gallery is empty... 🖼️
          </p>
        )}
        
        {!isLoading && images.length !== 0 && (
        <Button onBtnClick={this.onBtnClick} />)}
        { isLoading && <Loader />}
      </div>
    );
  }
}
