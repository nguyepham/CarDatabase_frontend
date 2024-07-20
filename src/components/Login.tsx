import { useEffect, useState } from 'react';
import axios from 'axios';
import ListCar from "./ListCar.tsx";
import { Button, Stack, TextField } from "@mui/material";

type User = {
  username: string;
  password: string;
}

type CallbackFn = {
  updateAccountName: () => void
}

function Login({ updateAccountName }: CallbackFn) {

  const [user, setUser] = useState<User>({
    username: "",
    password: ""
  })
  const [isAuth, setAuth] = useState(false)

  // If user/admin hasn't signed out, re-fetch the car list when refreshing the page
  useEffect(() => {
    if (sessionStorage.getItem("jwtToken") !== null) {
      updateAccountName()
      setAuth(true)
    }
  }, [])

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
          // This method is a callback function for the actual method in this component's parent component
          // It is used here to lift the `isAuth` state from the Login component to the App component
          updateAccountName()
          // Here we change the value of the Login's `isAuth` state,
          // not the App's `isAuth` state
          setAuth(true)
        }
      })
      .catch(err => console.error(err))
  }

  const logOut = () => {
    sessionStorage.clear()
    updateAccountName()
    // Here we change the value of the Login's `isAuth` state,
    // not the App's `isAuth` state
    setAuth(false)
  }

  if (isAuth) {
    return <ListCar handleLogout={logOut} />
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