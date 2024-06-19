import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  connect: (name: string) => void;
}

interface SocketProviderProps {
  children: ReactNode;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const connect = useCallback((name: string) => {
    if (!socket) {
      const newSocket = io("https://huellasdesperanza.onrender.com/", {
        auth: {
          token: "abc-123",
          name: name,
        },
      });

      newSocket.on("connect", () => {
        console.log("Conectado al servidor de WebSocket");
      });

      newSocket.on("connect_error", (err) => {
        console.error("Error de conexión:", err);
      });

      setSocket(newSocket);
    }
  }, [socket]);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, connect }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
