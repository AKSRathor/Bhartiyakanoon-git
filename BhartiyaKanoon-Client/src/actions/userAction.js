import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";
import api from "axios";
// import api from "./api";
import Cookies from 'js-cookie';


// Login
export const login = (email, password) => async (dispatch) => {
  try {
    console.log("Im at Action");
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    // const { data } = await api.post(
    //   `/api/v1/login`,
    //   { email, password },
    //   config
    // );
    fetch('https://bhartiyakanoon.onrender.com/api/v1/login' , {
      method : "POST",
      mode : "cors",
      headers : {
        "Content-Type":"application/json",
      },
      credentials : "include",
      redirect:"follow",
      referrerPolicy:"no-referrer",
      body: JSON.stringify({
        "email" : email,
        "password" : password ,
      }),
    }).then(response => response.json()).then(async (data) => {
      console.log("SUCCESS");
      console.log(data);
      if(data.success == false){
        dispatch({ type: LOGIN_FAIL, payload: data.message });
        return;
      }
      await Cookies.set('token', data.token);
      await localStorage.setItem("userinfovkname",data.user.name )
      await localStorage.setItem("userinfovkaccno",data.user.acc_no )
      await localStorage.setItem("userinfovkphoneno",data.user.phoneNumber )
      await localStorage.setItem("userinfovkemail",data.user.email )
      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    }).catch(error => {
      console.error(error);
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    });
  } catch (error) {
    console.log("TRYING FETCH");
    fetch('https://bhartiyakanoon.onrender.com/api/v1/myCertificates').then(response => response.json()).then(data => console.log(data)).catch(error => console.error(error));
    console.log(error);
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const payloadObj = {
      ...userData,
      "acc_no" : userData.account
    };
    fetch('https://bhartiyakanoon.onrender.com/api/v1/register' , {
      method : "POST",
      mode : "cors",
      headers : {
        "Content-Type":"application/json",
      },
      credentials : "include",
      redirect:"follow",
      referrerPolicy:"no-referrer",
      body: JSON.stringify(payloadObj),
    }).then(response => response.json()).then(async (data) => {
      console.log("SUCCESS REGIS");
      console.log(data);
      if(data.success == false){
        dispatch({ type: REGISTER_USER_FAIL, payload: data.message });
        return;
      }
      await Cookies.set('token', data.token);
      await localStorage.setItem("userinfovkname",data.user.name )
      await localStorage.setItem("userinfovkaccno",data.user.acc_no )
      await localStorage.setItem("userinfovkphoneno",data.user.phoneNumber )
      await localStorage.setItem("userinfovkemail",data.user.email )
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    }).catch(error => {
      console.error(error);
      dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await api.get(`/api/v1/me`);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    fetch('https://bhartiyakanoon.onrender.com/api/v1/logout' , { mode : "cors" , credentials : "include" }).then(response => response.json()).then(async (data) => {
      console.log(data)
      // await api.get(`/api/v1/logout`);
      await Cookies.remove('token');
      await localStorage.removeItem("userinfovkname")
      await localStorage.removeItem("userinfovkaccno")
      await localStorage.removeItem("userinfovkphoneno")
      await localStorage.removeItem("userinfovkemail")
      dispatch({ type: LOGOUT_SUCCESS });
    }).catch(error => console.error(error));

  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await api.put(`/api/v1/me/update`, userData, config);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await api.put(
      `/api/v1/password/update`,
      passwords,
      config
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await api.post(`/api/v1/password/forgot`, email, config);

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await api.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get  User Details // Not Needed Currently
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await api.get(`/api/v1/admin/user/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
