/**
 * @description 获取qq头像
 * @param account
 * @returns
 */
export function getQQAvatar(account: string) {
  return `https://q1.qlogo.cn/g?b=qq&nk=${account}&s=100`;
}