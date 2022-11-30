let baseURL = process.env.VUE_APP_BASE_API;

const tokens = {
  admin: {
    token: "admin-token",
  },
  'user_mail@qq.com': {
    token: "user-token",
  },
};

const users = {
  "admin-token": {
    roles: ["admin"],
    introduction: "I am a super administrator",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Super Admin",
    is_authenticated: true,
  },
  "user-token": {
    roles: ["user"],
    introduction: "I am an user",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Normal User",
    is_authenticated: true,
  },
};

module.exports = [
  // user login
  {
    url: baseURL + "/user/login",
    type: "post",
    response: (config) => {
      const { mail } = config.body;
      const token = tokens[mail];

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: "Account and password are incorrect.",
        };
      }

      return {
        code: 20000,
        data: token,
      };
    },
  },

  // admin login
  {
    url: baseURL + "/admin/login",
    type: "post",
    response: (config) => {
      const { account } = config.body;
      const token = tokens[account];

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: "Account and password are incorrect.",
        };
      }

      return {
        code: 20000,
        data: token,
      };
    },
  },

  // get user info
  {
    url: baseURL + "/user/info.*",
    type: "get",
    response: (config) => {
      const { token } = config.query;
      const info = users[token];

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: "Login failed, unable to get user details.",
        };
      }

      return {
        code: 20000,
        data: info,
      };
    },
  },

  // user logout
  {
    url: baseURL + "/user/logout",
    type: "post",
    // eslint-disable-next-line no-unused-vars
    response: (_) => {
      return {
        code: 20000,
        data: "success",
      };
    },
  },
];
