import { useContext } from "react";
import { SocketContext } from "../context/socketContext";

const useSocket = () => useContext(SocketContext);

export default useSocket;
