import axios from "axios";

const serverUrl = "http://192.168.1.76:4000/api/v1";

//login action also need to hash the password
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const { data } = await axios.post(
      `${serverUrl}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFailure", payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });

    const { data } = await axios.get(`${serverUrl}/me`);
    dispatch({ type: "loadUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loadUserFailure", payload: error.response.data.message });
  }
};

//Add action for addtask where data is title, price, category, description, images
export const addListing = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "addTaskRequest" });

    const { data } = await axios.post(`${serverUrl}/addlisting`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: "addTaskSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "addTaskFailure",
      payload: error.response.data.message,
    });
  }
};

//Add action for getlisting
export const getAllListing = () => async (dispatch) => {
  try {
    dispatch({ type: "getListingRequest" });

    const { data } = await axios.get(`${serverUrl}/getlistings`);
    dispatch({ type: "getListingSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getListingFailure",
      payload: error.response.data.message,
    });
  }
};

//Add action for getuserlisting
export const getUserListing = () => async (dispatch) => {
  try {
    dispatch({ type: "getUserListingRequest" });

    const { data } = await axios.get(`${serverUrl}/getuserlistings`);
    dispatch({ type: "getUserListingSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getUserListingFailure",
      payload: error.response.data.message,
    });
  }
};

//Add action for deleteuserlisting
export const deleteUserListing = (itemId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteUserListingRequest" });

    const { data } = await axios.delete(
      `${serverUrl}/getuserlistings/${itemId}`
    );
    dispatch({ type: "deleteUserListingSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteUserListingFailure",
      payload: error.response.data.message,
    });
  }
};

// Action to update a user's listing by id and form data
export const updateUserListing = (itemId, formData) => async (dispatch) => {
  try {
    dispatch({ type: "updateUserListingRequest" });

    const { data } = await axios.put(
      `${serverUrl}/getuserlistings/${itemId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch({ type: "updateUserListingSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateUserListingFailure",
      payload: error.response.data.message,
    });
  }
};

// //Add action for delete task
// export const removeTask = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: "deleteTaskRequest" });

//     const { data } = await axios.delete(
//       `${serverUrl}/deleteuserlistings/${id}`
//     );
//     dispatch({ type: "deleteTaskSuccess", payload: data.message });
//   } catch (error) {
//     dispatch({
//       type: "deleteTaskFailure",
//       payload: error.response.data.message,
//     });
//   }
// };

// //Add action for update task
// export const updateTask = (id, formData) => async (dispatch) => {
//   try {
//     dispatch({ type: "updateTaskRequest" });

//     const { data } = await axios.put(`${serverUrl}/task/${id}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     dispatch({ type: "updateTaskSuccess", payload: data.message });
//   } catch (error) {
//     dispatch({
//       type: "updateTaskFailure",
//       payload: error.response.data.message,
//     });
//   }
// };

export const updateProfile = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "updateProfileRequest" });

    const { data } = await axios.put(`${serverUrl}/updateprofile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: "updateProfileSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });

    await axios.get(`${serverUrl}/logout`);
    dispatch({ type: "logoutSuccess" });
  } catch (error) {
    dispatch({
      type: "logoutFailure",
      payload: error.response.data.message,
    });
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "registerRequest" });

    const { data } = await axios.post(`${serverUrl}/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: "registerSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "registerFailure",
      payload: error.response.data.message,
    });
  }
};

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: "updatePasswordRequest" });

      const { data } = await axios.put(
        `${serverUrl}/updatepassword`,
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: "updatePasswordSuccess", payload: data.message });
    } catch (error) {
      dispatch({
        type: "updatePasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

export const verify = (otp) => async (dispatch) => {
  try {
    dispatch({ type: "verificationRequest" });

    const { data } = await axios.post(
      `${serverUrl}/verify`,
      { otp },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "verificationSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "verificationFailure",
      payload: error.response.data.message,
    });
  }
};

export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "forgetPasswordRequest" });

    const { data } = await axios.post(
      `${serverUrl}/forgetpassword`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "forgetPasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "forgetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (otp, newPassword) => async (dispatch) => {
  try {
    dispatch({ type: "resetPasswordRequest" });

    const { data } = await axios.put(
      `${serverUrl}/resetpassword`,
      { otp, newPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "resetPasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "resetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

//Add action for postitem
export const postItem = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "postItemRequest" });

    const { data } = await axios.post(`${serverUrl}/postitem`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: "postItemSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "postItemFailure",
      payload: error.response.data.message,
    });
  }
};

export const FETCH_USER_LISTINGS_REQUEST = "FETCH_USER_LISTINGS_REQUEST";
export const FETCH_USER_LISTINGS_SUCCESS = "FETCH_USER_LISTINGS_SUCCESS";
export const FETCH_USER_LISTINGS_FAILURE = "FETCH_USER_LISTINGS_FAILURE";

export const fetchUserListingsRequest = () => ({
  type: FETCH_USER_LISTINGS_REQUEST,
});

export const fetchUserListingsSuccess = (listings) => ({
  type: FETCH_USER_LISTINGS_SUCCESS,
  payload: listings,
});

export const fetchUserListingsFailure = (error) => ({
  type: FETCH_USER_LISTINGS_FAILURE,
  payload: error,
});

export const fetchUserListings = () => async (dispatch) => {
  try {
    dispatch(fetchUserListingsRequest());

    // Make an API request to fetch user listings
    const response = await axios.get(`${serverUrl}/getallitems`);

    // Dispatch the success action with the fetched listings
    dispatch(fetchUserListingsSuccess(response.data));
  } catch (error) {
    // Dispatch the failure action with the error message
    dispatch(fetchUserListingsFailure(error.message));
  }
};
