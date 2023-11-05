const ValidationForRegister = (password) => {
    if (password.length < 6) {
        return "Password must be at least 6 characters long.";
      }
      if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one capital letter.";
      }
      if (!/[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/.test(password)) {
        return "Password must contain at least one special character.";
      }
      return null;
    };
export default ValidationForRegister;