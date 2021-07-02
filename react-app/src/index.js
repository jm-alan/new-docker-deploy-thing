import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';

import App from './App';
import Wrapper from './components/Wrapper';
import Modal from './components/Modal';
import Socket from './components/Socket';
import createStore from './store';
import easyFetch from './utils/easyFetch';
import { setMooring } from './store/modal';
import './index.css';

// eslint-disable-next-line no-extend-native
String.prototype.toTitleCase = function () {
  if (!this.match(/ /g)) return [this[0].toUpperCase(), this.slice(1)].join('');
  return this
    .split(' ')
    .map($ => $ && [$[0].toUpperCase(), $.slice(1)].join(''))
    .join(' ');
};

Object.deepEq = (_, $) => {
  if (
    !_ || !$ ||
    typeof _ !== 'object' ||
    typeof $ !== 'object'
  ) return false;
  const [__, $$] = [_, $].map(Object.values);
  if (__.length !== $$.length) return false;
  // eslint-disable-next-line curly
  for (const _$ in __) if (
    typeof __[_$] !== typeof $$[_$] || (
      typeof __[_$] === 'function' &&
      __[_$].toString() !== $$[_$].toString()
    ) || (
      typeof __[_$] !== 'object' &&
      typeof __[_$] !== 'function' &&
      __[_$] !== $$[_$]
    ) || (
      typeof __[_$] === 'object' &&
      __[_$] !== null &&
      !Object.deepEq(__[_$], $$[_$])
    ) || (
      __[_$] === null &&
      __[_$] !== $$[_$]
    )
  ) return false;
  return true;
};

const store = createStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.dispatch = store.dispatch;
  window.easyFetch = easyFetch;
}

function Root () {
  const dispatch = useDispatch();
  const mooringRef = useRef(null);

  useEffect(() => {
    dispatch(setMooring(mooringRef.current));
  }, [dispatch]);

  return (
    <Wrapper>
      <Modal />
      <App />
      <div ref={mooringRef} className='modalMooring' />
    </Wrapper>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Socket />
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
