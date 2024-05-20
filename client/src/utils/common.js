import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function capitalizeWords(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

export const formValidator = (formData, rules) => {
  const errors = {};

  for (const field in rules) {
    const fieldRules = rules[field];
    const value = formData[field];

    if (fieldRules.required) {
      if (!value) {
        errors[field] = `${capitalizeWords(field)} is required`;
      }
      if (fieldRules.pattern && value && !fieldRules.pattern.test(value)) {
        errors[field] = fieldRules.message;
      }
    }

    if (field === "password") {
      if (value.length < fieldRules.minLength) {
        errors[field] = `Minimum length is ${fieldRules.minLength}`;
      }
    }
  }

  return errors;
};

export const getCookies = (name) => {
  return Cookies.get(name);
};

export const removeCookies = (name) => {
  return Cookies.remove(name);
};

// Function to check if token is expired
export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true; // Token is expired
    }
    return false; // Token is not expired
  } catch (error) {
    return true; // Error decoding token
  }
};
