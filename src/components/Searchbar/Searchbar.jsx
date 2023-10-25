
import React, {Component} from 'react';
import css from './Searchbar.module.css'
import PropTypes from 'prop-types';

export default class Searchbar extends Component {

    state = { 
        query: '' 
    };

    handleQueryChange = (e) => {
        this.setState({query: e.currentTarget.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.query.trim());
        this.reset()
        
    }

    reset = () => {
        this.setState({ query: '' });
      };

  render() {
    const {query} = this.state
    return (
      <header className={css.SearchBar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.handleQueryChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = { 
    onSubmit: PropTypes.func.isRequired 
};