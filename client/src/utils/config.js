const config = {};

config.BASE_URL = import.meta.env.VITE_BASE_URL;

config.API_BASE_URL = "/api/v1/";

config.API_NAME = {
  auth: "auth",
};

config.API_URL = {
  //Auth apis
  register: `${config.BASE_URL}${config.API_BASE_URL}${config.API_NAME.auth}/register`,
  login: `${config.BASE_URL}${config.API_BASE_URL}${config.API_NAME.auth}/login`,
};

config.validationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address",
  },
  password: {
    required: true,
    minLength: 8,
    message: "Password must be at least 8 characters long",
  },
};

export default config;
