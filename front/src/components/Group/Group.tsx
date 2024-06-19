'use client';

import {
  Box,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { SimpleBarStyle } from "./SimpleBarStyle";
import { useEffect, useState } from "react";
import { useSocket } from "./SocketContext";

interface User {
  id: string;
  name: string;
  online: boolean;
}

interface GroupProps {
  username: string | null;
}

const Group: React.FC<GroupProps> = ({ username }) => {
  const [userList, setUserList] = useState<User[]>([]);
  const { socket, connect } = useSocket();

  useEffect(() => {
    if (username && socket === null) {
      connect(username);
    }
  }, [username, socket, connect]);

  useEffect(() => {
    if (socket) {
      socket.on("on-clients-changed", (data: User[]) => {
        setUserList(data);
      });

      return () => {
        socket.off("on-clients-changed");
      };
    }
  }, [socket]);

  const theme = useTheme();

  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        {/* Left */}

        <Box
          sx={{
            overflowY: "scroll",
            height: "85vh",
            width: 350,
            backgroundColor: theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background.default,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack p={2} spacing={2} sx={{ maxHeight: "100vh" }}>
            <Stack
              alignItems={"center"}
              justifyContent="space-around"
              direction="row"
            >
              <Typography variant="h5">Comunidad Huellas</Typography>
            </Stack>
            <Divider />
            <Stack sx={{ flexGrow: 1, overflow: "scroll", height: "100%" }}>
              <SimpleBarStyle clickOnTrack={false}>
                <Stack spacing={3}>
                  <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                    Usuarios conectados
                  </Typography>
                  {userList.map((user) => (
                    <li key={user.id}>{user.name}</li>
                  ))}
                </Stack>
              </SimpleBarStyle>
            </Stack>
          </Stack>
        </Box>

        {/* Right */}
      </Stack>
    </>
  );
};

export default Group;
  