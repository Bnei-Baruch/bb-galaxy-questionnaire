import { combineReducers } from 'redux';
import results from './results';
import busyIndicator from './busyIndicator';
import notification from './notification';

const rootReducer = combineReducers({
  results,
  busyIndicator,
  notification,
});

export default rootReducer;
