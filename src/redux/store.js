import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer";
import uiReducer from "./reducers/uiReducer";
import dataReducer from "./reducers/dataReducers";

const initialState = {};

const middleWare = [thunk];

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleWare), devTools)
);

export default store;
