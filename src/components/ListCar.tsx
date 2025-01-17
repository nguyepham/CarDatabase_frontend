import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCar, getCars } from "../api/carapi.ts";
import { DataGrid, GridCellParams, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { Button, Snackbar, Stack, Tooltip } from "@mui/material";
import AddCar from "./AddCar.tsx";
import EditCar from "./EditCar.tsx";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

type ListcarProps = {
  handleLogout?: () => void
}

function ListCar({ handleLogout }: ListcarProps) {

  const queryClient = useQueryClient()

  const [toast, setToast] = useState(false)

  const [toastDenyAdd, setToastDenyAdd] = useState(false)
  
  const [toastDenyEdit, setToastDenyEdit] = useState(false)
  
  const [toastDenyDelete, setToastDenyDelete] = useState(false)

  const denyAdd: () => void = () => {
    setToastDenyAdd(true)
  }

  const denyEdit: () => void = () => {
    setToastDenyEdit(true)
  }

  const columns: GridColDef[] = [
    { field: "brand", headerName: "Brand", width: 200 },
    { field: "model", headerName: "Model", width: 200 },
    { field: "color", headerName: "Color", width: 200 },
    { field: "registrationNumber", headerName: "Reg.nr", width: 150 },
    { field: "modelYear", headerName: "Model Year", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    {
      field: 'edit',
      headerName: '',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) =>
        <EditCar denyEdit={denyEdit} cardata={params.row} />
    },
    {
      field: "delete",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <Tooltip title="Delete car">
          <IconButton aria-label="delete" size="small" onClick={() => {
            if (sessionStorage.getItem("accName") !== "admin") {
              setToastDenyDelete(true)
              return
            }
            if (window.confirm(`Are you sure you want to delete ${params.row.brand} ${params.row.model}?`)) {
              mutate(params.row._links.car.href)
            }
          }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )
    }
  ]

  const { data, error, isSuccess } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars
  })

  const { mutate } = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      setToast(true)
      queryClient.invalidateQueries({ queryKey: ["cars"] })
    },
    onError: (err) => {
      console.log(err)
    },
  })

  if (!isSuccess) {
    return <span>Loading...</span>
  } else if (error) {
    return <span>Error fetching cars...</span>
  } else {
    return (
      <>
        <Stack direction="row" alignItems="center"
          justifyContent="space-between">
          <AddCar denyAdd={denyAdd}/>
          <Button onClick={handleLogout}>Log out</Button>
        </Stack>
        <DataGrid
          rows={data}
          columns={columns}
          disableRowSelectionOnClick={true}
          getRowId={row => row._links.self.href}
          slots={{ toolbar: GridToolbar }}
        />
        <Snackbar
          open={toast}
          autoHideDuration={2000}
          onClose={() => setToast(false)}
          message="Car deleted"
        />
        <Snackbar
          open={toastDenyAdd}
          autoHideDuration={2000}
          onClose={() => setToastDenyAdd(false)}
          message="Only admin can add cars"
        />
        <Snackbar
          open={toastDenyEdit}
          autoHideDuration={2000}
          onClose={() => setToastDenyEdit(false)}
          message="Only admin can edit cars"
        />
        <Snackbar
          open={toastDenyDelete}
          autoHideDuration={2000}
          onClose={() => setToastDenyDelete(false)}
          message="Only admin can delete cars"
        />
      </>
    )
  }
}

export default ListCar