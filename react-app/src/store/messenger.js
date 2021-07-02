import easyFetch from '../utils/easyFetch';

const CONVERSATIONS = 'messenger/CONVERSATIONS';
const CURRENT_CONVERSATION = 'messenger/CURRENT';
const NEW_CONVERSATION = 'messenger/CONVERSATION';
const NEW_MESSAGE = 'messenger/MESSAGE';
const DELETE_CONVERSATION = 'messenger/DELETE_CONVO';
const DELETE_MESSAGE = 'messenger/DELETE_MESSAGE';

const setConversations = conversations => ({
  type: CONVERSATIONS,
  conversations
});

export const SetConversation = current => ({
  type: CURRENT_CONVERSATION,
  current
});

export const LoadConversations = () => async dispatch => {
  const { conversations } = await easyFetch.get('/api/conversations/');
  dispatch(setConversations(conversations));
};

export default function reducer (
  // eslint-disable-next-line default-param-last
  state = { conversations: [], current: null, loaded: false },
  { type, current, conversations }
) {
  switch (type) {
    case CONVERSATIONS:
      return { ...state, conversations, loaded: true };
    default:
      return state;
  }
}
