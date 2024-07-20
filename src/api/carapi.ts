import { Car, CarEntry, CarResponse } from "../type.ts";
import axios, { AxiosRequestConfig } from "axios";

const getAxiosConfig = (): AxiosRequestConfig => {
  const token = sessionStorage.getItem("jwtToken")

  return {
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    }
  }
}

export const getCars = async (): Promise<CarResponse[]> => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars`, getAxiosConfig())
  return res.data._embedded.cars
}

export const deleteCar = async (link: string): Promise<void> => {
  await axios.delete(link, getAxiosConfig())
}

export const addCar = async (car: Car): Promise<CarResponse> => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/cars`,
    car,
    getAxiosConfig())

  return res.data
}

export const updateCar = async (carEntry: CarEntry): Promise<CarResponse> => {
  const response = await axios.put(
    carEntry.url,
    carEntry.car,
    getAxiosConfig())

  return response.data
}