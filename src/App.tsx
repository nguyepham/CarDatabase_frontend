import {AppBar, Container, CssBaseline, Toolbar, Typography} from "@mui/material";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Login from "./components/Login.tsx";

const queryClient = new QueryClient()

function App() {

  return (
      // The Container is used to center component content horizontally
      <Container maxWidth='xl'>
      {/*The CssBaseline is used to ensure uniform appearance across different browser    */}
      <CssBaseline />
          <AppBar position='static'>
              <Toolbar>
                  <Typography variant='h6'>
                      Car Shop
                  </Typography>
              </Toolbar>
          </AppBar>
          <QueryClientProvider client={queryClient}>
            <Login />
          </QueryClientProvider>
      </Container>
  )
}

export default App
