import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteCar, getCars} from "../api/carapi.ts";
import {DataGrid, GridCellParams, GridColDef, GridToolbar} from "@mui/x-data-grid";
import {useState} from "react";
import {Snackbar} from "@mui/material";
import AddCar from "./AddCar.tsx";
import EditCar from "./EditCar.tsx";

function ListCar() {

    const queryClient = useQueryClient()

    const [toast, setToast] = useState(false)

    const columns: GridColDef[] = [
        {field: "brand", headerName: "Brand", width: 200},
        {field: "model", headerName: "Model", width: 200},
        {field: "color", headerName: "Color", width: 200},
        {field: "registrationNumber", headerName: "Reg.nr", width: 150},
        {field: "modelYear", headerName: "Model Year", width: 150},
        {field: "price", headerName: "Price", width: 150},
        {
            field: 'edit',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) =>
                <EditCar cardata={params.row} />
        },
        {
            field: "delete",
            headerName: "",
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <button
                    onClick={() => {
                        if (window.confirm(`Are you sure you want to delete ${params.row.brand} ${params.row.model}?`)) {
                            mutate(params.row._links.car.href)
                        }
                    }}>
                    Delete
                </button>
            )
        }
    ]

    const {data, error, isSuccess} = useQuery({
        queryKey: ["cars"],
        queryFn: getCars
    })

    const {mutate} = useMutation({
        mutationFn: deleteCar,
        onSuccess: () => {
            setToast(true)
            queryClient.invalidateQueries({queryKey: ["cars"]})
        },
        onError: (err) => {
            console.log(err)
        },
    })

    if (!isSuccess) {
        return <span>Loading...</span>
    }
    else if (error) {
        return <span>Error fetching cars...</span>
    }
    else {
        return (
            <>
                <AddCar />
                <DataGrid
                    rows={data}
                    columns={columns}
                    disableRowSelectionOnClick={true}
                    getRowId={row => row._links.self.href}
                    slots={{toolbar: GridToolbar}}
                />
                <Snackbar
                    open={toast}
                    autoHideDuration={2000}
                    onClose={() => setToast(false)}
                    message="Car deleted"
                />
            </>
        )
    }
}

export default ListCar