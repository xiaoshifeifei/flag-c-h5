const getters = {
    isLogin: (state) => {
        const token = state.user.token;
        return !!token;
    },
    token: (state) => state.user.token,
    refreshToken: (state) => state.user.refreshToken,
    tokenType: (state) => state.user.tokenType,
    userInfo: (state) => state.user.userInfo,
};
export default getters;