import { handleActions } from 'redux-actions';
import { fillResults } from '../actions/result';

const initialState = {};

export default handleActions({
  [fillResults]: (state, action) => action.payload,
}, initialState);