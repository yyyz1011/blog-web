// import { clientId, clientSecret } from "../config/github.config";

/**
 * @description 获取qq头像
 * @param account
 * @returns
 */
export function getQQAvatar(account: string) {
  return `https://q1.qlogo.cn/g?b=qq&nk=${account}&s=100`;
}

// TODO github 第三方登录有跨域问题，先注释

// export function githubLogin() {
//   const redirectUri = encodeURIComponent("http://localhost:8081");
//   window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;
// }

// export async function getGithubToken(githubToken: string) {
//   const tokenResponse = await fetch(
//     `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${githubToken}`,
//     {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//       },
//       mode: "cors",
//     }
//   );
//   console.log(tokenResponse);
// }
