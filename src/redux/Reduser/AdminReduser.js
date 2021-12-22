import { ActionTypes } from '../Constants/actionTypes';

const initialState = {
  AllComments: [],
};

export const handleComments = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.USER_COMMENTS:
      return { AllComments: payload };
    default:
      return state;
  }
};
