import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './Button.styled';
export const ButtonAPI = ({ onClick }) => {
  return (
    <Button type="button" onClick={onClick}>
      Load More
    </Button>
  );
};

ButtonAPI.propTypes = {
  onClick: PropTypes.func.isRequired,
};
