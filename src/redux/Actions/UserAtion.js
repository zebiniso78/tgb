import { ActionTypes } from '../Constants/actionTypes';

export const AllComments = (comments) => {
  return {
    type: ActionTypes.USER_COMMENTS,
    payload: comments,
  };
};
