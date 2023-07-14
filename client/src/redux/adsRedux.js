import { API_URL } from '../config';

//selectors
export const getAds = (state) => state.ads;
export const getAdById = ({ ads }, adId) => {
  return ads.find((ad) => ad._id === adId);
};

//Actions
const createActionName = (actionName) => `app/ads/${actionName}`;
const UPDATE_ADS = createActionName('UPDATE_ADS');
const REMOVE_AD = createActionName('REMOVE_AD');
const ADD_AD = createActionName('ADD_AD');
const SEARCH_AD = createActionName('SEARCH_AD');
const EDIT_AD = createActionName('EDIT_AD');

//action creators
export const updateAds = (payload) => ({ type: UPDATE_ADS, payload });
export const removeAd = (payload) => ({ type: REMOVE_AD, payload });
export const addAds = (payload) => ({ type: ADD_AD, payload });
export const searchAdd = (payload) => ({ type: SEARCH_AD, payload });
export const editAd = (payload) => ({ type: EDIT_AD, payload });

export const fetchAds = () => {
  return (dispatch) => {
    fetch(`${API_URL}/api/ads`)
      .then((res) => res.json())
      .then((ads) => {
        dispatch(updateAds(ads));
      });
  };
};

export const removeAdRequest = (adId) => {
  return (dispatch) => {
    const options = {
      method: 'DELETE',
    };

    return fetch(`${API_URL}/api/ads/${adId}`, options)
      .then(() => {
        dispatch(removeAd(adId));
      })
      .catch((error) => {
        console.error('Error removing ad:', error);
      });
  };
};

const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_ADS:
      return [...action.payload];
    case REMOVE_AD:
      return statePart.filter((ad) => ad._id !== action.adId);
    case ADD_AD:
      return [...action.payload];
    case SEARCH_AD:
      return [...action.payload];
    case EDIT_AD:
      return [...action.payload];
    default:
      return statePart;
  }
};

export default adsReducer;
