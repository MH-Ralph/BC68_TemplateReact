import React from "react";
import useRoutesCustom from "./hooks/useRoutesCustom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NotificationContext = React.createContext();

function App() {
  const handleNotifycation = (content, type) => {
    return toast[type](content, {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
      hideProgressBar: false,
    });
  };
  const routes = useRoutesCustom();
  return (
    <NotificationContext.Provider
      value={{
        handleNotifycation,
      }}
    >
      {routes}
      <ToastContainer />
    </NotificationContext.Provider>
  );
}

export default App;
