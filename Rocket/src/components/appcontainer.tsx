import { useState } from "react";
import { Login } from "../login";
import { App } from "../app";
import { checkIfUserIsLoggedIn, handleLogout } from "./util/authutils";
import { Button } from "./ui/button";
import { X } from "lucide-react";

const AppContainer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(checkIfUserIsLoggedIn());

  const handleLogin = (onLogin) => {
    setIsLoggedIn(true);
  };

  const handleUserLogout = () => {
    handleLogout();
    setIsLoggedIn(null);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <div className="block text-right m-3 cursor-pointer">
            <Button onClick={handleUserLogout}>
              <X /> Sair
            </Button>
          </div>
          <App />
        </div>
      )}
    </div>
  );
};

export default AppContainer;
