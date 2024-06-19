'use client';

import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useSocket } from "../Group/SocketContext";
import UsernameInput from "./UsernameInput";

interface Message {
  userId: string;
  message: string;
  name: string;
}

interface MainProps {
  username: string | null;
  setUsername: (username: string) => void;
}

const Main: React.FC<MainProps> = ({ username, setUsername }) => {
  const theme = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      const handleNewMessage = (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      socket.on("on-message", handleNewMessage);

      return () => {
        socket.off("on-message", handleNewMessage);
      };
    }
  }, [socket]);

  return (
    <Box>
      {!username ? (
        <UsernameInput setUsername={setUsername}/>
      ) : (
        <Box
          width={"100%"}
          height={"72.3vh"}
          sx={{
            position: "relative",
            flexGrow: 1,
            overflow: "scroll",
            backgroundColor: theme.palette.mode === "light" ? "#F0F4FA" : theme.palette.background.default,
            /* boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", */
          }}
        >
          {messages.map((message, index) => (
            <Box key={index} sx={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
              <strong>{message.name}: </strong> {message.message}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Main;
