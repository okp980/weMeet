import {io} from 'socket.io-client';
import {store} from '../store';
const token = store.getState().auth.token;
const socket = io('http://localhost:3000', {
  extraHeaders: {authorization: `Bearer ${token}`},
  // autoConnect: false,
});
export default socket;
