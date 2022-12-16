import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState, useMemo, useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context";


function HomePage() {
    const [redirect, setRedirect] = useState(null);
  const [waiting, setWaiting] = useState(false);
function makeNewRoom(access){

}


    const user = useContext(UserContext);
  return (
    <Container maxWidth="md">
      <Box sx={{ bgcolor: "#cfe8fc", height: "70vh", marginTop: "1rem", }}>
        <Stack spacing={2} direction="row" sx={{ paddingTop: "0.5rem", paddingLeft: "0.5rem", justifyContent: "center"  }}>
          <Button variant="contained">Create Game</Button>
          <Button variant="contained" onClick={() => makeNewRoom("private")}>Create Private Game</Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default HomePage;
