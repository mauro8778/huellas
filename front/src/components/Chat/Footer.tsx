'use client';

import React, { useState, useRef } from "react";
import { Box, IconButton, InputAdornment, Stack, TextField, useTheme, styled } from "@mui/material";
import { PaperPlaneTilt, Smiley } from "phosphor-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useSocket } from "../Group/SocketContext";

const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px !important",
    paddingBottom: "12px !important",
  },
}));

interface ChatInputProps {
  openPicker: boolean;
  setOpenPicker: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  inputRef: React.RefObject<HTMLInputElement>;
}

const ChatInput: React.FC<ChatInputProps> = ({ openPicker, setOpenPicker, setValue, value, inputRef }) => {
  return (
    <StyledInput
      inputRef={inputRef}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      placeholder="Escribe tu mensaje..."
      variant="filled"
      InputProps={{
        disableUnderline: true,
        endAdornment: (
          <Stack sx={{ position: "relative" }}>
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setOpenPicker(!openPicker);
                }}
              >
                <Smiley />
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
      }}
    />
  );
};

interface FooterProps {
  username: string | null;
}

const Footer: React.FC<FooterProps> = ({ username }) => {
  const theme = useTheme();
  const [openPicker, setOpenPicker] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { socket } = useSocket();

  const handleEmojiClick = (emoji: any) => {
    const input = inputRef.current;
    if (input) {
      const selectionStart = input.selectionStart;
      const selectionEnd = input.selectionEnd;
      if (selectionStart !== null && selectionEnd !== null) {
        setValue(
          value.substring(0, selectionStart) +
            emoji.native +
            value.substring(selectionEnd)
        );
        input.selectionStart = input.selectionEnd = selectionStart + emoji.native.length;
      }
    }
  };

  const handleSendMessage = () => {
    if (value.trim() !== "") {
      if (socket) {
        socket.emit("send-message", value);
      }
      setValue(""); // Limpiar el input después de enviar el mensaje
    }
  };

  return (
    <Box sx={{ position: "relative", backgroundColor: "transparent !important", bottom: 0, top:-80 }}>
      <Box
        marginLeft={44}
        p={2}
        sx={{
          backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.default,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Stack direction="row" alignItems={"center"} spacing={3}>
          <Stack sx={{ width: "100%" }}>
            <Box
              style={{
                zIndex: 10,
                position: "fixed",
                display: openPicker ? "inline" : "none",
                bottom: 81,
                right: 100,
              }}
            >
              <Picker
                theme={theme.palette.mode}
                data={data}
                onEmojiSelect={(emoji:any) => {
                  handleEmojiClick(emoji);
                }}
              />
            </Box>
            <ChatInput
              inputRef={inputRef}
              value={value}
              setValue={setValue}
              openPicker={openPicker}
              setOpenPicker={setOpenPicker}
            />
          </Stack>
          <Box
            sx={{
              height: 48,
              width: 48,
              backgroundColor: username ? theme.palette.primary.main : theme.palette.action.disabledBackground,
              borderRadius: 1.5,
            }}
          >
            <Stack
              sx={{ height: "100%" }}
              alignItems={"center"}
              justifyContent="center"
            >
              <IconButton onClick={handleSendMessage} disabled={!username}>
                <PaperPlaneTilt color="#ffffff" />
              </IconButton>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
