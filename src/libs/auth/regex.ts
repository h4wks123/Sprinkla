export function emailRegexCheck(emailInput: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(emailInput)) {
    return {
      status: 400,
      message: "Invalid email format!",
      type: "Email",
    };
  }
}

export function contactNumberRegexCheck(contactNumber: number) {
  const contactNumberRegex = /^\d{10}$/;
  if (!contactNumberRegex.test(contactNumber.toString())) {
    return {
      status: 400,
      message: "Invalid contact number, must be only 10 digits!",
      type: "ContactNumber",
    };
  }
}
