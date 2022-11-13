import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchPictures } from 'api/fetchPictures';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonAPI } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    pictureName: '',
    pictures: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    showBtn: false,
    ImageURL: '',
  };

  async componentDidUpdate(_, prevState) {
    const { pictureName, page } = this.state;
    let data;

    if (prevState.pictureName !== pictureName || prevState.page !== page) {
      try {
        data = await fetchPictures(pictureName, page);

        this.setState(prevState => ({
          showBtn: true,
          loading: true,
          error: null,
          page,
          pictures: [...prevState.pictures, ...data.hits],
        }));
        if (data.hits.length < 12) {
          console.log(page);
          this.setState({ showBtn: false });
        }
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ loading: false });
      }
    }

    // if (prevState.pictureName !== pictureName) {
    //   this.setState({
    //     loading: true,
    //     error: null,
    //     pictures: [],
    //     page: 1,
    //     showBtn: true,
    //   });
    //   try {
    //     data = await fetchPictures(pictureName, page);

    //     this.setState({
    //       pictures: data.hits,
    //     });
    //     if (data.hits.length < 12) {
    //       console.log(page);
    //       this.setState({ showBtn: false });
    //     }
    //   } catch (error) {
    //     this.setState({ error });
    //   } finally {
    //     this.setState({ loading: false });
    //   }
    // }
  }

  handleFormSubmit = pictureName => {
    this.setState({
      pictureName,
      loading: true,
      error: null,
      pictures: [],
      page: 1,
      showBtn: true,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal, ImageURL }) => ({
      showModal: !showModal,
      ImageURL: largeImageURL,
    }));
  };

  render() {
    const { pictures, loading, showModal, ImageURL, showBtn } = this.state;
    return (
      <div>
        <Searchbar dataForm={this.handleFormSubmit} />
        <ImageGallery pictures={pictures} toggleModal={this.toggleModal} />
        {loading && <Loader />}

        {!loading && showBtn && pictures.length !== 0 && (
          <ButtonAPI onClick={this.loadMore} />
        )}
        {showModal && (
          <Modal largeImageURL={ImageURL} onClick={this.toggleModal} />
        )}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}
