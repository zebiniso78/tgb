import { combineReducers } from 'redux';
import { handleComments } from './AdminReduser';

const redusers = combineReducers({
  comments: handleComments,
});

export default redusers;
