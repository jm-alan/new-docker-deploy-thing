import easyFetch from '../utils/easyFetch';

const LOAD = 'HomePage/LOAD';

const load = schools => ({
  type: LOAD,
  schools
});

export const getSchools = () => async dispatch => {
  const { schools } = await easyFetch.get('/api/schools');
  dispatch(load(schools));
};

export default function reducer (state = { schools: [] }, action) {
  switch (action.type) {
    case LOAD:
      return { schools: action.schools };
    default:
      return state;
  }
}
