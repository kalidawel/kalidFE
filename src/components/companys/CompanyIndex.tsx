import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from "axios";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Stack, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Company from "../../types/Company";

const paginationModel = { page: 0, pageSize: 25 };

const CompanyIndex = () => {
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const columns: GridColDef[] = [
        {
            field: 'companyId',
            headerName: "ID",
            minWidth: 70,
            flex: 1
        },
        {
            field: ' companyName',
            headerName: " Company Name",
            minWidth: 100,
            flex: 1
        },
        ,
        {
            field: ' companyEmail',
            headerName: " Company Email",
            minWidth: 100,
            flex: 1
        },
        ,
        {
            field: ' companyType',
            headerName: " Company Type",
            minWidth: 100,
            flex: 1
        },
        {
            field: 'actions',
            headerName: "Actions",
            minWidth: 120,
            flex: 1,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <IconButton
                        size="small"
                        onClick={() => navigate("/update-company/" + params.row.companyId, { state: params.row })}
                        color="primary"
                    >
                        <Edit fontSize="small" />
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
        }
    ];

    const getAllCompany = async () => {
        const request = await axios.get("http://localhost:8080/api/company/all");
        return request.data;
    };

    const deleteCompany = async (id: number) => {
        const request = await axios.delete(`http://localhost:8080/api/company/delete/${id}`);
        return request.status;
    };

    const deleteMutation = useMutation({
        mutationFn: deleteCompany,
        onSuccess: () => {
            queryClient.invalidateQueries(['company']);
            setDeleteDialog(false);
        }
    });

    const handleDelete = (company: Company) => {
        console.log("Selected Company:", company);
        setSelectedCompany(company);
        setDeleteDialog(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedCompany) {
            deleteMutation.mutate(selectedCompany.companyId);
        }
    };

    const { data, error, isLoading } = useQuery<Company[], Error>({
        queryKey: ['company'],
        queryFn: getAllCompany
    });

    if (isLoading) return <div>Loading company, please wait...</div>;

    if (error) return <div>Error loading company: {error.message}</div>;

    return (
        <Container maxWidth="lg">
            <Typography variant="h2">
                Company Index
            </Typography>
            <Link to="/create-company">
                <Button variant="contained" color="primary">
                    Create New Company
                </Button>
            </Link>
            <Paper sx={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    getRowId={(row) => row.companyId}
                    initialState={{ pagination: { paginationModel } }}
                    sx={{ border: 0, width: '100%' }}
                />
            </Paper>
            <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>Are you sure you want to delete this company?</DialogContent>
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
    );
};

export default CompanyIndex;