import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30064107-c73b2a0aceced325114b9b159';

export const fetchPictures = async (pictureName, page) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 12,
        page: page,
        q: pictureName,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
