import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteCar, getCars} from "../api/carapi.ts";
import {DataGrid, GridCellParams, GridColDef} from "@mui/x-data-grid";

function Carlist() {

    const queryClient = useQueryClient()

    const columns: GridColDef[] = [
        {field: "brand", headerName: "Brand", width: 200},
        {field: "model", headerName: "Model", width: 200},
        {field: "color", headerName: "Color", width: 200},
        {field: "registrationNumber", headerName: "Reg.nr", width: 150},
        {field: "modelYear", headerName: "Model Year", width: 150},
        {field: "price", headerName: "Price", width: 150},
        {
            field: "delete",
            headerName: "",
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <button
                    onClick={() => mutate(params.row._links.car.href)}>
                    Delete
                </button>
            )
        }
    ]

    const {data, error, isSuccess} = useQuery({
        queryKey: ["car"],
        queryFn: getCars
    })

    const {mutate} = useMutation({
        mutationFn: deleteCar,
        onSuccess: () => {
            // Car deleted
            queryClient.invalidateQueries({queryKey: ["car"]})
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
            <DataGrid
                rows={data}
                columns={columns}
                disableRowSelectionOnClick={true}
                getRowId={row => row._links.self.href}
            />
        )
    }
}

export default Carlist