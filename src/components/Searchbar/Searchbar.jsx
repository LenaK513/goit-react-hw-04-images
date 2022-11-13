import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchBar, Form, Button, Input } from './SearchBar.styled';
import { FaSistrix } from 'react-icons/fa';

export class Searchbar extends Component {
  state = {
    pictureName: '',
  };

  handleNameChange = event => {
    this.setState({ pictureName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.pictureName.trim() === '') {
      toast.warn('There is no information in search field!');
      return;
    }
    this.setState({ pictureName: '' });
    this.props.dataForm(this.state.pictureName);
  };

  render() {
    return (
      <SearchBar>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <span>
              <FaSistrix />
            </span>
          </Button>

          <Input
            type="text"
            autocomplite="off"
            autoFocus
            value={this.state.pictureName}
            onChange={this.handleNameChange}
          />
        </Form>
      </SearchBar>
    );
  }
}
