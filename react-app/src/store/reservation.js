import easyFetch from '../utils/easyFetch';

const LOAD = 'reservation/LOAD';

const UNLOAD = 'reservation/UNLOAD';

const COMPLETE = 'reservation/COMPLETE';

const load = (property, dateRange) => ({
  type: LOAD,
  property,
  dateRange
});

const complete = () => ({
  type: COMPLETE
});

export const UnloadReservation = () => ({
  type: UNLOAD
});

export const LoadReservation = (propertyId, dates) => async dispatch => {
  const { property, dateRange } = await easyFetch.get(`/api/reservation/${propertyId}/${dates}/`);
  dispatch(load(property, dateRange));
};

export const EditReservation = (propertyId, dates, newReservation) => async dispatch => {
  const { success } = await easyFetch.post(`/api/reservation/${propertyId}/${dates}/`, newReservation);
  if (success) dispatch(complete());
  else throw new Error('Oops');
};

export default function reducer (
  // eslint-disable-next-line default-param-last
  state = { property: null, dateRange: null, loaded: false, success: false },
  { type, property, dateRange }
) {
  switch (type) {
    case LOAD:
      return { ...state, property, dateRange, loaded: true };
    case COMPLETE:
      return { ...state, success: true };
    case UNLOAD:
      return { property: null, dateRange: null, loaded: false, success: false };
    default:
      return state;
  }
}
