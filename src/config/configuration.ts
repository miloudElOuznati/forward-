export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  manager: {
    accessToken: {
      secret: process.env.MANAGER_ACCESS_TOKEN,
      expires: process.env.MANAGER_ACCESS_EXPIRES,
    },
    refreshToken: {
      secret: process.env.MANAGER_REFRESH_TOKEN,
      expires: process.env.MANAGER_REFRESH_EXPIRES,
    },
  },
});
