import React, { createContext } from "react";
import io from "socket.io-client";

const socket = io(process.env.API_URL || "http://localhost:3001");

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
