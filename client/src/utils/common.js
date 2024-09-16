import Cookies from "js-cookie";
import config from "./config";

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

//local storage
export function getLocalStorage(key) {
  const localData = localStorage.getItem(`${config.nameSpaceKey}-${key}`);
  if (localData === null) {
    return false;
  }
  try {
    return JSON.parse(localData);
  } catch (error) {
    return false;
  }
}

export function setLocalStorage(key, value) {
  localStorage.setItem(`${config.nameSpaceKey}-${key}`, JSON.stringify(value));
}

export function removeLoaclStorage(key) {
  localStorage.removeItem(key);
}


export const getInitials = (name) => {
  const names = name.split(' ');
  const initials = names.map((n) => n[0].toUpperCase()).join('');
  return initials;
}

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}