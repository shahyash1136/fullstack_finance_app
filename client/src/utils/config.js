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
  registration: {
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
    firstName: {
      required: true,
      message: "First name is required",
    },
    lastName: {
      required: true,
      message: "Last name is required",
    },
  },
  login: {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
    password: {
      required: true,
      message: "Password is required",
    },
  },
};

export default config;
