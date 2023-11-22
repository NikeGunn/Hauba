// import { createReducer } from "@reduxjs/toolkit";

// const initialState = {
//   userLoading: false,
//   userError: null,
//   userListing: null, // Use null as the initial value
// };

// const userListingReducer = createReducer(initialState, {
//   getUserListingRequest: (state) => {
//     state.userLoading = true;
//     state.userError = null;
//   },
//   getUserListingSuccess: (state, action) => {
//     state.userLoading = false;
//     state.userListing = action.payload; // Update userListing with the fetched data
//     state.userError = null;
//   },
//   getUserListingFailure: (state, action) => {
//     state.userLoading = false;
//     state.userListing = null; // Clear userListing on failure if needed
//     state.userError = action.payload;
//   },
// });

// export default userListingReducer;
