import {Car, CarResponse} from "../type.ts";
import axios from "axios";

export const getCars = async (): Promise<CarResponse[]> => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars`)
    return res.data._embedded.cars
}

export const deleteCar = async (link: string): Promise<void> => {
    await axios.delete(link)
}

export const addCar = async (car: Car): Promise<CarResponse> => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/cars`, car, {
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return res.data
}