import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState, useMemo, useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context";
import { optionalCallExpression } from "@babel/types";
import firebase, { createGame } from "../firebase";

function HomePage() {
    const [redirect, setRedirect] = useState(null);
  const [waiting, setWaiting] = useState(false);

  function roomIDGenerator(){
    let success = false;
    while (!success)
    {
        let result = "";
        let options = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM0123456789";
        for(let i =0; i < 5;i++){
        result += options.charAt(Math.floor(Math.random()*options.length))
        }
        const gameId= result;
        return gameId;
    }
  }


async function makeNewRoom(access){
    setWaiting(true);
    const gameId = roomIDGenerator();
    console.log("test");
    const response = await createGame({ gameId, access });
    console.log(response);

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
