import React, {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Car} from "../type.ts";
import {addCar} from "../api/carapi.ts";
import {Dialog, DialogActions, DialogTitle} from "@mui/material";
import CarDialog from "./CarDialog.tsx";

function AddCar() {

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
        setDialog(true)
    }

    const handleClose = () => {
        setDialog(false)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCar({...car, [event.target.name]: event.target.value})
    }

    const handleSave = () => {
        mutate(car)
        setCar({
            brand: "",
            model: "",
            color: "",
            registrationNumber: "",
            modelYear: 0,
            price: 0
        })
        handleClose()
    }

    const { mutate } = useMutation({
        mutationFn: addCar,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["cars"]});
        },
        onError: (err) => {
            console.error(err);
        },
    })

    return(
        <>
            <button onClick={handleOpen}>New Car</button>
            <Dialog open={dialog} onClose={handleClose}>
                <DialogTitle>New car</DialogTitle>
                <CarDialog car={car} handleChange={handleChange} />
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddCar