import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Mount, UnMount } from '../../store/socket';

export default function Socket () {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Mount());
    return () => dispatch(UnMount());
  }, [dispatch]);

  return null;
}
