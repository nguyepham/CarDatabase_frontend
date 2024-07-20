import { AppBar, Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./components/Login.tsx";
import AccountName from "./components/AccountName.tsx";
import { useState } from "react";

const queryClient = new QueryClient()

function App() {

  const [isAuth, setAuth] = useState(false)

  const getAccountName: () => void = () => setAuth(true)

  return (
    // The Container is used to center component content horizontally
    <Container maxWidth='xl'>
      {/*The CssBaseline is used to ensure uniform appearance across different browser    */}
      <CssBaseline />
      <AppBar position='static'>
        <Toolbar style={{
          display: "flex",
          justifyContent: "space-between",
        }}>
          <Typography variant='h5'>
            Car Shop
          </Typography>
          <AccountName isAuth={isAuth} />
        </Toolbar>
      </AppBar>
      <QueryClientProvider client={queryClient}>
        <Login getAccountName={getAccountName} />
      </QueryClientProvider>
    </Container>
  )
}

export default App
