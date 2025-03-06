import React from "react";
import Button from "@mui/material/Button";
import { List, Typography } from "@mui/material";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";

const HomePage: React.FC = () => {
  return (
    <List>
      <Typography variant="body1" margin={"20px"}>
        <div>Home</div>

        <PrimaryButton />
        <SecondaryButton />
      </Typography>
    </List>
  );
};

export default HomePage;
