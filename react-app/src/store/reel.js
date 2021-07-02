import easyFetch from '../utils/easyFetch';
import { SetCurrentErrors } from './errors';

const PROPERTIES = 'reel/PROPERTIES';
const RESERVATIONS = 'reel/RESERVATIONS';

const populateProperties = list => ({ type: PROPERTIES, list });

const populateReservations = list => ({ type: RESERVATIONS, list });

export const PopulateProperties = whereAmI => async dispatch => {
  try {
    const { list } = await easyFetch.get(`/api${whereAmI}/properties`);
    return dispatch(populateProperties(list));
  } catch (_) {
    dispatch(SetCurrentErrors(['Sorry, something went wrong. Please refresh the page and try again.']));
  }
};

export const PopulateReservations = () => async dispatch => {
  try {
    const { list } = await easyFetch.get('/api/users/me/reservations');
    return dispatch(populateReservations(list));
  } catch (_) {
    dispatch(SetCurrentErrors(['Sorry, something went wrong. Please refresh the page and try again.']));
  }
};

export default function reelReducer (state = { list: null }, { type, list }) {
  switch (type) {
    case PROPERTIES:
      return { ...state, propertyList: list };
    case RESERVATIONS:
      return { ...state, reservationList: list };
    default:
      return state;
  }
}
