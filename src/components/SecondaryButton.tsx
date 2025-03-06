import React from "react";
import Button from "@mui/material/Button";

const SecondaryButton: React.FC = () => {
  return (
    <Button
      sx={{
        bgcolor: "white",
        color: "rgb(153, 138, 255)",
        border: "2px solid rgb(153, 138, 255)",
      }}
      variant="contained"
    >
      Secondary
    </Button>
  );
};

export default SecondaryButton;
