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
