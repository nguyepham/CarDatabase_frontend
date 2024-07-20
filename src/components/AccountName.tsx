import { Typography } from "@mui/material";

type authProps = {
  isAuth: boolean;
}

function AccountName({ isAuth }: authProps) {

  let accName: string = ""
  if (isAuth) {
    const storedAccName = sessionStorage.getItem("accName")
    if (storedAccName !== null) {
      accName = storedAccName
    }
  }

  return (
    <Typography variant='h6'>
      {accName}
    </Typography>
  )
}

export default AccountName