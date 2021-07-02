import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LoadConversations } from '../../store/messenger';

import './messenger.css';

export default function Messegner () {
  const dispatch = useDispatch();

  const conversations = useSelector(state => state.messenger.conversations);

  useEffect(() => {
    dispatch(LoadConversations());
  }, [dispatch]);

  return (
    <div className='messenger-container'>
      <div className='conversation-list'>
        <h1>Placeholder</h1>
      </div>
      <div className='chat-container'>
        <h1>Placeholder</h1>
      </div>
    </div>
  );
}
