import React, { createContext, useState } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket] = useState(() => io(process.env.REACT_APP_API_URL));

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
