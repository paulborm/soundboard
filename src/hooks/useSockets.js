import { useContext } from "react";
import { SocketContext } from "../context/socketContext";

const useSockets = () => useContext(SocketContext);

export default useSockets;
