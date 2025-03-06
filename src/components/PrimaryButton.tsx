import React from "react";
import Button from "@mui/material/Button";

const PrimaryButton: React.FC = () => {
  return (
    <Button
      sx={{
        bgcolor: "rgb(153, 138, 255)",
        color: "white",
        // border: "2px solid rgb(138, 99, 153)",
      }}
      variant="contained"
    >
      Primary
    </Button>
  );
};

export default PrimaryButton;
