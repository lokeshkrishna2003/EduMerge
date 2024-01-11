// auth.js

const isAuthenticated = () => {
  const userId = localStorage.getItem("userId");
  return userId != null;
};

export default isAuthenticated;
