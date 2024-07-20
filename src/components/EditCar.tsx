import { Car, CarEntry, CarResponse } from "../type.ts";
import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle, Tooltip } from "@mui/material";
import CarDialog from "./CarDialog.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCar } from "../api/carapi.ts";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

type FormProps = {
  cardata: CarResponse
}

function EditCar({ cardata }: FormProps) {

  const queryClient = useQueryClient()

  const [dialog, setDialog] = useState(false)

  const [car, setCar] = useState<Car>({
    brand: "",
    model: "",
    color: "",
    registrationNumber: "",
    modelYear: 0,
    price: 0
  })

  const handleOpen = () => {
    setCar({
      brand: cardata.brand,
      model: cardata.model,
      color: cardata.color,
      registrationNumber: cardata.registrationNumber,
      modelYear: cardata.modelYear,
      price: cardata.price
    })

    setDialog(true)
  }

  const handleClose = () => {
    setDialog(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCar({ ...car, [event.target.name]: event.target.value })
  }

  const handleSave = () => {
    const url = cardata._links.self.href
    const carEntry: CarEntry = { car, url }

    mutate(carEntry)
    setCar({
      brand: "",
      model: "",
      color: "",
      registrationNumber: "",
      modelYear: 0,
      price: 0
    })

    setDialog(false)
  }

  const { mutate } = useMutation({
    mutationFn: updateCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] })
    },
    onError: (err) => {
      console.log(err)
    }
  })

  return (
    <>
      <Tooltip title="Edit car">
        <IconButton aria-label="edit" size="small" onClick={handleOpen}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog open={dialog} onClose={handleClose}>
        <DialogTitle>Edit car</DialogTitle>
        <CarDialog car={car} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditCar