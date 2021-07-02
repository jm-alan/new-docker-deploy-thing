import easyFetch from '../utils/easyFetch';
import { SetCurrentErrors } from './errors';

const LOAD = 'propertyPage/LOAD';
const REVIEWS = 'propertyPage/REVIEWS';
const UNLOAD = 'propertyPage/UNLOAD';
const BOOKED = 'propertyPage/BOOKED';
const RESERVED = 'propertyPage/RESERVED';

const load = details => ({
  type: LOAD,
  details
});

const setReviews = reviews => ({
  type: REVIEWS,
  reviews
});

const booked = booked => ({
  type: BOOKED,
  booked
});

const reserved = () => ({
  type: RESERVED
});

export const unload = () => ({
  type: UNLOAD
});

export const CreateProperty = (property, history) => async dispatch => {
  try {
    const { success, id, errors } = await easyFetch.post('/api/property/', property);
    if (success && id) history.push(`/properties/${id}`);
    else {
      dispatch(SetCurrentErrors(errors));
    }
  } catch (_) {
    dispatch(SetCurrentErrors(['Sorry, something went wrong. Please refresh the page and try again']));
  }
};

export const getPage = id => async dispatch => {
  const { details } = await easyFetch.get(`/api/property/${id}`);
  dispatch(load(details));
};

export const getReviews = id => async dispatch => {
  const { reviews } = await easyFetch.get(`/api/reviews/${id}`);
  dispatch(setReviews(reviews));
};

export const createReservation = newReservation => async dispatch => {
  const { success } = await easyFetch.post('/api/reservation/', newReservation);
  if (success) dispatch(reserved());
  else throw new Error('Oops');
};

export const GetBooked = propertyId => async dispatch => {
  const { dates } = await easyFetch.get(`/api/property/${propertyId}/booked/`);
  dispatch(booked(dates));
};

const propertyPageReducer = (
  // eslint-disable-next-line default-param-last
  state = { details: null, reviews: [], reservationSuccess: false, loaded: false, booked: null },
  { type, details, reviews, booked }
) => {
  switch (type) {
    case LOAD:
      return { ...state, details, loaded: true };
    case REVIEWS:
      return { ...state, reviews };
    case RESERVED:
      return { ...state, reservationSuccess: true };
    case BOOKED:
      return { ...state, booked };
    case UNLOAD:
      return { details: null, reviews: [], reservationSuccess: false, booked: null };
    default:
      return state;
  }
};

export default propertyPageReducer;
