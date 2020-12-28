import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import loadingReducer from './loading.reducer';
import errorReducer from './error.reducer';
import callReducer from './call.reducer';
import imageReducer from './image.reducer';
import socketReducer from './socket.reducer';
import deviceTokenReducer from './deviceToken.reducer';
import processReducer from './process.reducer';
import delayReducer from './delay.reducer'

const reducers = {
  user: userReducer,
  loading: loadingReducer,
  error: errorReducer,
  call: callReducer,
  image: imageReducer,
  socket: socketReducer,
  deviceToken: deviceTokenReducer,
  process: processReducer,
  delay: delayReducer
};

export default combineReducers(reducers);
