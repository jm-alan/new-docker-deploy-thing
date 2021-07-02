import easyFetch from '../utils/easyFetch';
import { SetCurrentErrors } from './errors';
import { AfterEffect } from './modal';

const USER = 'session/USER';

const setSession = (user = null) => ({
  type: USER, user
});

export const LogIn = (email, password) => async dispatch => {
  try {
    const { user, errors } = await easyFetch.post('/api/auth/login', { email, password });
    if (user) {
      dispatch(setSession(user));
      dispatch(AfterEffect());
    } else dispatch(SetCurrentErrors(errors));
  } catch (_) {
    dispatch(SetCurrentErrors(['Sorry, something went wrong. Please refresh the page and try again.']));
  }
};

export const SignUp = (username, email, password) => async dispatch => {
  try {
    const { user, errors } = await easyFetch.post('/api/auth/signup', { username, email, password });
    if (user) {
      dispatch(setSession(user));
      dispatch(AfterEffect());
    } else dispatch(SetCurrentErrors(errors));
  } catch (_) {
    dispatch(SetCurrentErrors(['Sorry, something went wrong. Please refresh the page and try again.']));
  }
};

export const LogOut = () => async dispatch => {
  await easyFetch.delete('/api/auth/logout');
  dispatch(setSession());
};

export const Restore = () => async dispatch => {
  try {
    const { user } = await easyFetch.get('/api/auth/');
    if (user) dispatch(setSession(user));
    else dispatch(setSession());
  } catch (_) {
    dispatch(SetCurrentErrors(['Sorry, something went wrong. Please refresh the page and try again.']));
  }
};

export default function sessionReducer (
  // eslint-disable-next-line default-param-last
  state = { user: null, loaded: false }, { type, user }) {
  return (type === USER) ? { user, loaded: true } : state;
}
