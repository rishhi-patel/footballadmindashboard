import api from "../API/api";

import {
  MATCHES_FETCH_BEGIN,
  MATCHES_FETCH_SUCCESS,
  MATCHES_FETCH_FAILURE,
  MATCH_CREATE_BEGIN,
  MATCH_CREATE_SUCCESS,
  MATCH_CREATE_FAILURE,
  MATCH_UPDATE_BEGIN,
  MATCH_UPDATE_SUCCESS,
  MATCH_UPDATE_FAILURE,
  MATCH_DELETE_BEGIN,
  MATCH_DELETE_SUCCESS,
  MATCH_DELETE_FAILURE,
} from "../reducers/matchesReducer";
import Notification from "../views/common/Notifications";

export const fetchMatches = (matches) => {
  return async (dispatch) => {
    dispatch({ type: MATCHES_FETCH_BEGIN });
    try {
      const { data } = await api.post("/adminGetMatches", matches);
      const { data: teamsData, message, status, total } = data;
      if (status) {
        dispatch({
          type: MATCHES_FETCH_SUCCESS,
          payload: { teamsData, total },
        });
      } else {
        Notification("error", message);
        dispatch({ type: MATCHES_FETCH_FAILURE, payload: message });
      }
    } catch (error) {
      Notification("error", error.message);
      dispatch({ type: MATCHES_FETCH_FAILURE, payload: error.message });
    }
  };
};

export const createMatch = (matchData, fetchMatchespayload) => {
  console.log("fetchMatchespayload", fetchMatchespayload);
  return async (dispatch) => {
    dispatch({ type: MATCH_CREATE_BEGIN });
    try {
      const { data } = await api.post("/adminAddMatch", matchData);
      const { message, status } = data;
      if (status) {
        Notification("success", message);
        dispatch(fetchMatches(fetchMatchespayload));
        dispatch({ type: MATCH_CREATE_SUCCESS });
      } else {
        Notification("error", message);
        dispatch({ type: MATCH_CREATE_FAILURE, payload: message });
      }
    } catch (error) {
      Notification("error", error.message);
      dispatch({ type: MATCH_CREATE_FAILURE, payload: error.message });
    }
  };
};

export const updateMatch = (matchId, updateData) => {
  return async (dispatch) => {
    dispatch({ type: MATCH_UPDATE_BEGIN });
    try {
      const { data } = await api.put(`/updateMatch/${matchId}`, updateData);
      const { message, status, data: updatedData } = data;
      if (status) {
        dispatch({ type: MATCH_UPDATE_SUCCESS, payload: updatedData });
        Notification("success", message);
      } else {
        Notification("error", message);
        dispatch({ type: MATCH_UPDATE_FAILURE, payload: message });
      }
    } catch (error) {
      Notification("error", error.message);
      dispatch({ type: MATCH_UPDATE_FAILURE, payload: error.message });
    }
  };
};

export const deleteMatch = (matchId) => {
  console.log("matchId", matchId);
  return async (dispatch) => {
    dispatch({ type: MATCH_DELETE_BEGIN });
    try {
      // const { data } = await api.post(`/adminDeleteMatch/${matchId}`);
      const { data } = await api.post(`/adminDeleteMatch`, { id: matchId });
      const { message, status } = data;
      if (status) {
        dispatch({ type: MATCH_DELETE_SUCCESS, payload: { id: matchId } });
        dispatch(fetchMatches());
        Notification("success", message);
      } else {
        Notification("error", message);
        dispatch({ type: MATCH_DELETE_FAILURE, payload: message });
      }
    } catch (error) {
      Notification("error", error.message);
      dispatch({ type: MATCH_DELETE_FAILURE, payload: error.message });
    }
  };
};
