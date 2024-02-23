import { LoginRequest } from "../../entities";

export const handleLogin = (userData: LoginRequest) => {
  const loginTime = new Date().getTime();
  localStorage.setItem("userData", JSON.stringify(userData));
  localStorage.setItem("loginTime", loginTime.toString());
};

export const handleLogout = () => {
  localStorage.removeItem("userData");
  localStorage.removeItem("loginTime");
};

export const checkIfUserIsLoggedIn = () => {
  const userData = localStorage.getItem("userData");
  const loginTime = localStorage.getItem("loginTime");

  if (userData && loginTime) {
    const currentTime = new Date().getTime();
    const fifteenMinutesInMillis = 15 * 60 * 1000;
    if (currentTime - parseInt(loginTime) <= fifteenMinutesInMillis) {
      return JSON.parse(userData);
    } else {
      localStorage.removeItem("userData");
      localStorage.removeItem("loginTime");
    }
  }

  return null;
};
