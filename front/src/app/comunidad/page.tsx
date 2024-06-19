'use client';

import React, { useState } from "react";
import Footer from "@/components/Chat/Footer";
import Group from "@/components/Group/Group";
import Main from "@/components/Chat/Main";
import { SocketProvider } from "@/components/Group/SocketContext";

const Comunidad: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  return (
    <SocketProvider>
      <div style={{ display: 'flex', flexDirection: 'column', height: '80vh' }}>
        <div style={{ display: 'flex', flexGrow: 1 }}>
          <div style={{ flex: '0 0 350px' }}>
            <Group username={username} />
          </div>
          <div style={{ flexGrow: 1,}}>
            <Main username={username} setUsername={setUsername} />
          </div>
        </div>
        <Footer username={username}/>
      </div>
    </SocketProvider>
  );
};

export default Comunidad;
