import { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";

export const useSocket = (serverPath) => {
  const socket = useMemo(() => io(serverPath), [serverPath]);

  const [isOnLine, setIsOnLine] = useState(false);

  useEffect(() => {
    setIsOnLine(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setIsOnLine(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {
      setIsOnLine(false);
    });
  }, [socket]);

  return { socket, isOnLine };
};
