export function emailRegexCheck(emailInput: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(emailInput)) {
    return {
      status: 400,
      message: "Invalid email format!",
      type: "Email",
    };
  }

  return {
    status: null,
    message: null,
    type: null,
  };
}

export function passwordRegexCheck(passwordInput: string) {
  const passwordRegex = /^(?=.*[0-9])[A-Za-z0-9!@#$%^&*]{6,}$/;
  if (!passwordRegex.test(passwordInput)) {
    return {
      status: 400,
      message:
        "Invalid password, must contain at least 1 number, and no less than 6 letters",
      type: "Password",
    };
  }

  return {
    status: null,
    message: null,
    type: null,
  };
}

export function contactNumberRegexCheck(contactNumberInput: number) {
  const contactNumberRegex = /^\d{10}$/;
  if (!contactNumberRegex.test(contactNumberInput.toString())) {
    return 
      "Invalid contact number, must be only 10 digits!";
  }

  return {
    status: null,
    message: null,
    type: null,
  };
}
