export function validateName(name) {
  let error;
  const nameRegex = /^[A-Za-z\s]{2,}$/;
  if (name.length === 0) {
    error = "This field is required";
  } else if (!nameRegex.test(name)) {
    error =
      "Name must be at least 2 characters long and contain only letters and spaces";
  }
  return error;
}

export function validatePhoneNumber(phoneNumber: string) {
  const phoneRegex = /^\+?\d{8,15}$/;

  if (phoneRegex.test(phoneNumber)) return "";
  return "Please enter a valid phone number";
}

export function validateRegular(value: string) {
  let error;
  if (value.length === 0) {
    error = "This field is required";
  }
  return error;
}

export function validateEmail(email: string) {
  let error;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.length === 0) {
    error = "This field is required";
  } else if (!emailRegex.test(email)) {
    error = "Invalid email format";
  }
  return error;
}

export function validatePassword(password) {
  let error;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (password.length === 0) {
    error = "This field is required";
  } else if (!passwordRegex.test(password)) {
    error =
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character";
  }
  return error;
}
