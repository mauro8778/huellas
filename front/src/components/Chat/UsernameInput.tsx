import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

interface UsernameInputProps {
  setUsername: (username: string) => void;
}

const UsernameInput: React.FC<UsernameInputProps> = ({ setUsername }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      setUsername(inputValue.trim());
    }
  };

  return (
    <Box sx={{ padding: "20px", position: "relative" }}>
      <TextField
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ingresa tu nombre"
      />
      <br />
      <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ marginTop: "10px" }}>
        Enviar
      </Button>
    </Box>
  );
};

export default UsernameInput;
