import easyFetch from '../utils/easyFetch';
import { SetCurrentErrors } from './errors';

const SEARCHRESULTS = 'search/SEARCHRESULTS';
const FOCUSID = 'search/FOCUSID';
const ENABLE_EMPTY = 'search/EMPTY/ENABLE';
const DISABLE_EMPTY = 'search/EMPTY/DISABLE';

const setSearch = (properties, center) => ({
  type: SEARCHRESULTS,
  properties,
  center
});

export const setFocusId = focusId => ({
  type: FOCUSID,
  focusId
});

export const EnableEmptySearch = () => ({
  type: ENABLE_EMPTY
});

export const DisableEmptySearch = () => ({
  type: DISABLE_EMPTY
});

export const search = ({ searchLocation, guestNumber, startDate, endDate }) => async dispatch => {
  try {
    const { properties, center } = await easyFetch.get('/api/search/', {
      searchLocation,
      guestNumber,
      startDate,
      endDate
    });
    dispatch(setSearch(properties, center));
  } catch (_) {
    dispatch(SetCurrentErrors(['Sorry, something went wrong. Please refresh the page and try again.']));
  }
};

export const getPropertiesNearSchools = id => async dispatch => {
  const { center, properties } = await easyFetch.get(`/api/schools/${id}`);
  dispatch(setSearch(properties, center));
};

export default function searchReducer (
// eslint-disable-next-line default-param-last
  state = {
    properties: [],
    loaded: false,
    center: null,
    location: null,
    focusId: null,
    emptyEnabled: false
  },
  { type, properties, center, focusId }
) {
  switch (type) {
    case SEARCHRESULTS:
      return {
        ...state,
        properties,
        center,
        loaded: true
      };
    case ENABLE_EMPTY:
      return { ...state, emptyEnabled: true };
    case DISABLE_EMPTY:
      return { ...state, emptyEnabled: false };
    case FOCUSID:
      return { ...state, focusId };
    default:
      return state;
  }
}
