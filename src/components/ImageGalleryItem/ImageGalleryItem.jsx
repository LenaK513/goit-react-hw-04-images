import React from 'react';
import PropTypes from 'prop-types';
import { Item } from './ImageGalleryItem.styled';
import { Image } from './ImageGalleryItem.styled';
export const ImageGalleryItem = ({ id, src, toggleModal, largeImageURL }) => {
  return (
    <Item key={id} id={id}>
      <Image src={src} alt="" onClick={() => toggleModal(largeImageURL)} />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.node,
  tags: PropTypes.string,
  toggleModal: PropTypes.func,
  largeImageURL: PropTypes.node,
  onClick: PropTypes.func,
};
