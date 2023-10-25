
import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
  state = {
    modalIsOpen: false,
  };

  toggleModal = () => {
    this.setState(({ modalIsOpen }) => ({ modalIsOpen: !modalIsOpen }));
  };

  render() {
    const { webformatURL, tags, id, largeImageURL } = this.props;
    return (
      <li className={css.ImageGalleryItem}>
        <img
          className={css.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
          onClick={this.toggleModal}
          id={id}
        />
        {this.state.modalIsOpen && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            closeModal={this.toggleModal}
          />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};