import { observable, computed, action } from "mobx";

interface UserInfoReq {
  avatar: string | null;
  account: string | null;
  nickname: string | null;
}

class UserStore {
  @observable
  avatar: UserInfoReq["avatar"] = null;
  @observable
  account: UserInfoReq["account"] = null;
  @observable
  nickname: UserInfoReq["nickname"] = null;

  @computed
  get getUserInfo() {
    const { avatar, account, nickname } = this;
    return {
      avatar,
      account,
      nickname,
    };
  }

  @action.bound
  setUserInfo(payLoad: UserInfoReq) {
    const { avatar, account, nickname } = payLoad;
    this.avatar = avatar;
    this.account = account;
    this.nickname = nickname;
  }
}

export default UserStore;
