export const checkFirstName = (firstName) => {
  const regex = /^[A-Za-z]+$/;
  return firstName.trim() !== "" && regex.test(firstName);
};

export const checkLastName = (lastName) => {
  const regex = /^[A-Za-z]+$/;
  return lastName.trim() !== "" && regex.test(lastName);
};

export const checkEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const checkPhone = (phone) => {
  const regex = /^\(?[2-9]\d{2}\)?[- ]?\d{3}[- ]?\d{4}$/;
  return regex.test(phone);
};
