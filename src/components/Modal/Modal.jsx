import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClick();
    }
  };

  handleBdClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClick();
    }
  };

  render() {
    const { largeImageURL } = this.props;
    return (
      <Overlay onClick={this.handleBdClick}>
        <ModalWindow>
          <img src={largeImageURL} alt="" />
        </ModalWindow>
      </Overlay>
    );
    //   );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  handleBdClick: PropTypes.func,
  handleKeyDown: PropTypes.func,
};
