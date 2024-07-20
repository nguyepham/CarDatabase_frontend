import { useState } from 'react';
import axios from 'axios';
import ListCar from "./ListCar.tsx";
import { Button, Stack, TextField } from "@mui/material";

type User = {
  username: string;
  password: string;
}

function Login() {

  const [user, setUser] = useState<User>({
    username: "",
    password: ""
  })
  const [isAuth, setAuth] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const handleLogin = () => {
    axios.post(`${import.meta.env.VITE_API_URL}/login`, user, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        console.log(res.headers)
        const jwtToken = res.headers.authorization
        const accName = res.headers["account"]

        if (jwtToken !== null) {
          sessionStorage.setItem("jwtToken", jwtToken)
          sessionStorage.setItem("accName", accName)
          setAuth(true)
        }
      })
      .catch(err => console.error(err))
  }

  if (isAuth) {
    return <ListCar />
  } else {
    return (
      <Stack spacing={2} alignItems="center" mt={2}>
        <TextField
          name="username"
          label="Username"
          onChange={handleChange} />
        <TextField
          type="password"
          name="password"
          label="Password"
          onChange={handleChange} />
        <Button
          variant="outlined"
          color="primary"
          onClick={handleLogin}>
          Login
        </Button>
      </Stack>
    )
  }
}

export default Login