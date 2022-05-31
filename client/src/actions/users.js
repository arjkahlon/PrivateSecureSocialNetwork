import * as api from "../api/index.js";
import { FOLLOW, FETCH_USER, AUTH } from "../constants/actionTypes";

export const storeUser = (res, router) => async (dispatch) => {
  try {
    const { data } = await api.login(res?.profileObj);
    console.log(data);
    const result = data?.result;
    const token = res?.tokenId;
    dispatch({ type: AUTH, data: { result, token } });

    router.push("/Homes");
  } catch (error) {
    console.log(error);
  }
};

export const followUser = (id) => async (dispatch) => {
  try {
    console.log(id);
    const { data } = await api.follow({ id: id });
    console.log(data)

    dispatch({ type: AUTH, data: {result: data, token: JSON.parse(localStorage.getItem("profile"))?.token} });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    console.log(id);
    const { data } = await api.fetchUser(id);

    dispatch({ type: FETCH_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};
