import { configureStore } from "@reduxjs/toolkit";
import {
  authReducer,
  messageReducer,
  userListingReducer,
  getListingReducer,
} from "./reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    userListing: userListingReducer,
    getListing: getListingReducer,
  },
});

export default store;
