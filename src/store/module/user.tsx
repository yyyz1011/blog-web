import { createStore } from "redux";
import { SET_USER_AVATAR } from "@/store/type/user";

type UserType = {
  avatar: null | string;
  account: null | string;
  nickname: null | string;
};

const initUser: UserType = {
  avatar: null,
  account: null,
  nickname: null,
};

function user(state: any, payload: any) {
  if (payload.type === SET_USER_AVATAR) {
    const { avatar, nickname, account } = payload.value;
    return {
      ...state,
      avatar,
      nickname,
      account,
    };
  }
  return state;
}

const userStore = createStore(user, initUser);

export default userStore;
