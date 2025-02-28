import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, TextField, Container, Typography } from "@mui/material";
import Company from "../../types/Company";


const UpdateCompany = () => {
    const company = useLocation().state;
    const { companyId, companyName,companyEmail,companyType } = company;

    const validationSchema = yup.object({
       companyName:yup.string()
         .min(2, "The company name must at least 2 characters")
         .max(20, "The company name must not go past 20 characters")
         .required("The company name must be filled out"),
         companyEmail:yup.string()
         .min(2, "The company email must at least 2 characters")
         .max(20, "The company email must not go past 20 characters")
         .required("The company email must be filled out"),
         companyType:yup.string()
         .min(2, "The company type must at least 2 characters")
         .max(20, "The company type must not go past 20 characters")
         .required("The company type must be filled out")
    });

    const queryClient = new QueryClient();
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: async (data: Company) => {
            const request = await axios.put(`http://localhost:8080/api/company/update/${companyId}`, data);
            return request.data;
        },
        onSuccess: () => {
            alert("Company has been successfully updated");
            queryClient.invalidateQueries();
            navigate("/company-index");
        },
        onError: error => {
            alert("Something went wrong: " + error.message);
        }
    });

    const formik = useFormik({
        initialValues: {
            companyId: companyId,
            companyName: companyName,
            companyEmail: companyEmail,
            companyType: companyType
        },
        validationSchema,
        onSubmit: data => mutate(data)
    });

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Update Company
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    label="Company Name"
                    id="companyName"
                    name="companyName"
                    type="text"
                    fullWidth
                    margin="normal"
                    value={formik.values.companyName}
                    variant="outlined"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                    helperText={formik.touched.companyName && formik.errors.companyName}
                />
                   <TextField
                    label="Company Email"
                    id="companyEmail"
                    name="companyEmail"
                    type="text"
                    fullWidth
                    margin="normal"
                    value={formik.values.companyEmail}
                    variant="outlined"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.companyEmail && Boolean(formik.errors.companyEmail)}
                    helperText={formik.touched.companyEmail && formik.errors.companyEmail}
                />
                   <TextField
                    label="Company Type"
                    id="companyType"
                    name="companyType"
                    type="text"
                    fullWidth
                    margin="normal"
                    value={formik.values.companyType}
                    variant="outlined"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.companyType && Boolean(formik.errors.companyType)}
                    helperText={formik.touched.companyType && formik.errors.companyType}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default UpdateCompany;