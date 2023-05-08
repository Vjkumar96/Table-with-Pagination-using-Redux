import { createStore,applyMiddleware } from "redux";
import rootReducer from "../reducers/reducer-index";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import logger from 'redux-logger'

const store = createStore(
  rootReducer,
 composeWithDevTools( applyMiddleware(thunk,logger)));
 store.subscribe(() => {});
export default store;