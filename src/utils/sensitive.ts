const sensitiveWords = ['傻逼', "shabi", "傻b"];
export const containsSensitiveWords = (nickname: string) => {
    return sensitiveWords.some(word => nickname.includes(word));
};