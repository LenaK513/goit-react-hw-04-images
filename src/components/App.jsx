import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchPictures } from 'api/fetchPictures';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonAPI } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export function App() {
  const [pictureName, setPictureName] = useState('');
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [ImageURL, setImageURL] = useState('');

  useEffect(() => {
    async function Api() {
      try {
        const data = await fetchPictures(pictureName, page);
        setLoading(true);
        setError(null);
        setPage(page);
        setPictures(prevState => [...prevState, ...data.hits]);
        setShowBtn(true);
        if (data.hits.length < 12) {
          setShowBtn(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.log(error);
      }
    }
    Api();
  }, [page, pictureName]);

  const handleFormSubmit = pictureName => {
    setPictureName(pictureName);
    setLoading(true);
    setError(null);
    setPictures([]);
    setPage(1);
    setShowBtn(true);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = largeImageURL => {
    setShowModal(!showModal);
    setImageURL(largeImageURL);
  };
  return (
    <div>
      <Searchbar dataForm={handleFormSubmit} />
      <ImageGallery pictures={pictures} toggleModal={toggleModal} />
      {loading && <Loader />}

      {!loading && showBtn && pictures.length !== 0 && (
        <ButtonAPI onClick={loadMore} />
      )}
      {showModal && <Modal largeImageURL={ImageURL} onClick={toggleModal} />}
      <ToastContainer autoClose={2000} />
    </div>
  );
}

// export class App extends Component {
//   state = {
//     pictureName: '',
//     pictures: [],
//     loading: false,
//     error: null,
//     page: 1,
//     showModal: false,
//     showBtn: false,
//     ImageURL: '',
//   };

//   async componentDidUpdate(_, prevState) {
//     const { pictureName, page } = this.state;
//     let data;

//     if (prevState.pictureName !== pictureName || prevState.page !== page) {
//       try {
//         data = await fetchPictures(pictureName, page);

//         this.setState(prevState => ({
//           showBtn: true,
//           loading: true,
//           error: null,
//           page,
//           pictures: [...prevState.pictures, ...data.hits],
//         }));
//         if (data.hits.length < 12) {
//           console.log(page);
//           this.setState({ showBtn: false });
//         }
//       } catch (error) {
//         this.setState({ error });
//       } finally {
//         this.setState({ loading: false });
//       }
//     }
//   }
//   handleFormSubmit = pictureName => {
//     this.setState({
//       pictureName,
//       loading: true,
//       error: null,
//       pictures: [],
//       page: 1,
//       showBtn: true,
//     });
//   };
//   loadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   toggleModal = largeImageURL => {
//     this.setState(({ showModal, ImageURL }) => ({
//       showModal: !showModal,
//       ImageURL: largeImageURL,
//     }));
//   };

//   render() {
//     const { pictures, loading, showModal, ImageURL, showBtn } = this.state;
//     return (
//       <div>
//         <Searchbar dataForm={this.handleFormSubmit} />
//         <ImageGallery pictures={pictures} toggleModal={this.toggleModal} />
//         {loading && <Loader />}

//         {!loading && showBtn && pictures.length !== 0 && (
//           <ButtonAPI onClick={this.loadMore} />
//         )}
//         {showModal && (
//           <Modal largeImageURL={ImageURL} onClick={this.toggleModal} />
//         )}
//         <ToastContainer autoClose={2000} />
//       </div>
//     );
//   }
// }
