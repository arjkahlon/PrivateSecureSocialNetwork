import * as api from '../api/index.js';
import { FOLLOW, FETCH_USER } from '../constants/actionTypes';


export const storeUser = (result, router) => async (dispatch) => {
  try {
    const { data } = await api.login(result);

    router.push('/Homes');
  } catch (error) {
    console.log(error);
  }
}

export const followUser = (id) => async (dispatch) => {
  try {
    console.log(id)
    const { data } = await api.follow({id: id});

    dispatch({ type: FOLLOW, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const getUser = (id) => async (dispatch) => {
  try {
    console.log(id)
    const { data } = await api.fetchUser(id);

    dispatch({ type: FETCH_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
}
