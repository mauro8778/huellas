'use client';

import React from "react";
import { Box, Badge, Stack, Avatar, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

const truncateText = (string: string, n: number) => {
  return string?.length > n ? `${string?.slice(0, n)}...` : string;
};

const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

interface ChatElementProps {
  img: string;
  name: string;
  msg: string;
  time: string;
  unread: number;
  online: boolean;
  id: string | number;
}

const ChatElement: React.FC<ChatElementProps> = ({ img, name, msg, time, unread, online, id }) => {

  const theme = useTheme();

  return (
    <StyledChatBox>
      <Stack
        border={"1px, solid"}
        borderColor={"rgba(1, 98, 196, 0.5)"}
        borderRadius={"5px"}
        padding={"10px"}
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2.5}>
          {" "}
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
            <Typography variant="caption">{truncateText(msg, 20)}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={1.5} alignItems={"center"} marginRight={2}>
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            {time}
          </Typography>
          <Badge
            className="unread-count"
            color="primary"
            badgeContent={unread}
          />
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

export default ChatElement;
