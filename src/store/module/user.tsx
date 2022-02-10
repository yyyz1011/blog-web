import { createStore } from 'redux';
import { SET_USER_AVATAR } from '@/store/type/user';

const initUser = {
  avatar: null,
  username: null
};

function user(state: any, payload: any) {
  if (payload.type === SET_USER_AVATAR) {
    const { avatar, username } = payload.value;
    return {
      ...state,
      avatar,
      username
    };
  }
  return state;
}

const userStore = createStore(user, initUser);

export default userStore;