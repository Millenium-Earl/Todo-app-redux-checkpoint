import { createStore } from 'redux'
//import counterReducer from '../features/counter/counterSlice';
import rootReducer from "../Reducers";

export default createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

