import Employee from "../../types/Employee"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from "axios"
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Stack, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";







const paginationModel = { page: 0, pageSize: 25}

const EmployeeIndex = () => {
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const columns: GridColDef[] =[
        {
            field: 'id',
            headerName: "ID",
            minWidth: 70,
            flex: 1
        },
        {
            field:'fName',
            headerName: "FirstName",
            minWidth: 100,
            flex:1
        },
        {
            field:'lName',
            headerName: "LastName",
            minWidth: 100,
            flex: 1
        },
        {
            field:'empDepartment',
            headerName: "EmpDepartment",
            minWidth: 100,
            flex: 1
        },
        {
            field: 'age',
            headerName: "Age",
            minWidth: 100,
            flex: 1
        },
        {
            field: ' email',
            headerName: "Email",
            minWidth: 100,
            flex: 1
        },
        {
            field: ' address',
            headerName: "Address",
            minWidth: 100,
            flex: 1
        },
        {
            field: ' company',
            headerName: "Company",
            minWidth: 100,
            flex: 1
        }
    ]

    const token = sessionStorage.getItem("Authorization")

    if(token != null){
        columns.push({
            field: 'actions',
            headerName: "Actions",
            minWidth:120,
            flex:1,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <IconButton
                        size="small"
                        onClick={() => navigate("/update-car/"+params.row.id, {state: params.row})}
                        color="primary"
                        >
                            <Edit fontSize="small"/>
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => handleDelete(params.row)}
                        color="error"
                        >
                        <Delete fontSize="small" />
                    </IconButton>
                </Stack>
            )
        })
    }

    const getAllEmployee = async () => {
        const request = await axios.get("http://localhost:8080/api/employee/allEmployee")
        const response = await request.data
        console.table(response)
        return response
    }

    const deleteEmployee = async (id:number) => {
        const request = axios.delete(`http://localhost:8080/api/employee/delete/${id}`, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("Authorization")}`
            }
        })
        return (await request).status
    }

    const deleteMutation = useMutation({
        mutationFn:deleteEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries()
            setDeleteDialog(false)
        }
    })

    const handleDelete = (employee:Employee) => {
        setSelectedEmployee(employee)
        setDeleteDialog(true)
    }

    const handleDeleteConfirm = () => {
        if (selectedEmployee) {
            deleteMutation.mutate(selectedEmployee.id)
        }
    }

    const {data, error, isLoading} = useQuery<Employee[], Error>({
        queryKey: ['employees'],
        queryFn: getAllEmployee
    })

    if(isLoading) return <div>Grabbing the employees please wait...</div>

    if(error) return <div>An error has occurred, Developers are hiding under the desk: {error.message}</div>

    return(
        <>
            <Container maxWidth="lg">
                <Typography variant="h2">
                    Employee Index
                </Typography>
                {
                    token ? <Link to="/create-employee">Create a employee</Link>: null
                }
                <Paper sx={{ height: 500, width: '100%',}}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        sx={{ border: 0, width: '100%'}}
                    />
                </Paper>
                <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)} >
                    <DialogTitle>
                        Confirm Delete
                    </DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete this employee?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
                        <Button
                        onClick={handleDeleteConfirm}
                        color="error"
                        variant="contained"
                        disabled={deleteMutation.isPending}
                        >
                            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    )

}

export default EmployeeIndex