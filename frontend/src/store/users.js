import { csrfFetch } from "./csrf";

export const GET_USER = "users/GET_USER";
export const GET_ALL_USERS = "users/GET_ALL_USERS";

export const getUser = (user) => ({
  type: GET_USER,
  user,
});

export const getUsers = (users) => ({
  type: GET_ALL_USERS,
  users,
});

export const getOneUser = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${userId}`);

  if (res.ok) {
    const user = await res.json();
    dispatch(getUser(user));
    return user;
  }
};

export const getAllUsers = () => async (dispatch) => {
  const res = await csrfFetch("/api/users");

  if (res.ok) {
    const users = await res.json();
    dispatch(getUsers(users));
  }
};

export const updateUser = (payload) => async (dispatch) => {
  const { userId } = payload;
  const res = await csrfFetch(`/api/users/${userId}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const user = await res.json();
    dispatch(getUser(user));
  }
};

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER: {
      return {
        ...state,
        [action.user.id]: {
          ...state[action.user.id],
          ...action.user,
        },
      };
    }
    case GET_ALL_USERS: {
      const allUsers = {};
      action.users.forEach((user) => {
        allUsers[user.id] = user;
      });
      return {
        ...state,
        ...allUsers,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
