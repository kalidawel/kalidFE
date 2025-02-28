import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useState } from 'react';

export default function Register() {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const validationRules = yup.object({
        username: yup.string()
            .min(2, "The username must be 2 or more characters")
            .max(50, "The username must not go past 50 characters")
            .matches(/^[a-zA-Z0-9]+$/, "Only Alphanumeric characters")
            .required("Username must be filled out"),
        password: yup.string()
            .min(8, "Password must be 8 characters long")
            .max(100, "Password should not be more than 100 characters")
            .required("Password must be filled out"),
        role: yup.string().required("Role must be selected")
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            role: "USER"
        },
        validationSchema: validationRules,
        onSubmit: async (values) => {
            try {
                const response = await axios.post("http://localhost:8080/api/users/", values);
                if (response.status === 201) {
                    navigate("/");
                } else {
                    throw new Error("Unexpected error occurred");
                }
            } catch (error) {
                setErrorMessage("Something went wrong with registration. Please try again.");
                console.error(error);
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <h2>Register to gain access to new cars and dealers</h2>
            <br />
            <TextField
                id='username'
                name='username'
                label='Username'
                type='text'
                style={{ width: "250px", margin: "5px 0" }}
                value={formik.values.username}
                variant='outlined'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
            />
            <br />
            <TextField
                id='password'
                name='password'
                label='Password'
                type='password'
                style={{ width: "250px", margin: "5px 0" }}
                value={formik.values.password}
                variant='outlined'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
            <br />
            <InputLabel id="role-label">Role:</InputLabel>
            <Select
                labelId="role-label"
                id="role"
                name="role"
                value={formik.values.role}
                style={{ width: "250px", margin: "5px 0" }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.role && Boolean(formik.errors.role)}
            >
                <MenuItem value="USER">User</MenuItem>
                <MenuItem value="Company">Company</MenuItem>
            </Select>
            <br />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                style={{ marginTop: "10px" }}
                disabled={formik.isSubmitting}
            >
                Register
            </Button>
        </form>
    );
}
