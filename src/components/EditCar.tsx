import {Car, CarEntry, CarResponse} from "../type.ts";
import React, {useState} from "react";
import {Dialog, DialogActions, DialogTitle} from "@mui/material";
import CarDialog from "./CarDialog.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateCar} from "../api/carapi.ts";

type FormProps = {
    cardata: CarResponse
}

function EditCar({cardata}: FormProps) {

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
        setCar({...car, [event.target.name]: event.target.value})
    }

    const handleSave = () => {
        const url = cardata._links.self.href
        const carEntry: CarEntry = {car, url}

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

    const {mutate} = useMutation({
        mutationFn: updateCar,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["cars"]})
        },
        onError: (err) => {
            console.log(err)
        }
    })

    return (
        <>
            <button onClick={handleOpen}>
                Edit
            </button>
            <Dialog open={dialog} onClose={handleClose}>
                <DialogTitle>Edit car</DialogTitle>
                <CarDialog car={car} handleChange={handleChange} />
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditCar