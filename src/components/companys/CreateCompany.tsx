import { TextField, Button } from "@mui/material";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup'
import Company from "../../types/Company";

export default function CreateCompany() {

    const validationRules = yup.object({
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
    })

    const queryClient = new QueryClient()

    const navigate = useNavigate();

    const {mutate} = useMutation({
        mutationFn:async (data:Company) => {
            const company:Company = data
            const request = await axios.post("http://localhost:8080/api/company/create", company)
            const response = await request.data
            return response
        },
        onSuccess:() => {
            alert("Company has been successfully added in")
            queryClient.invalidateQueries()
            navigate("/company-index")
        },
        onError:error => {
            alert("Something went wrong here is the message: " + error.message)
        }
    })

    const formik = useFormik({
        initialValues: {
            companyName: "",
            companyEmail:"",
            companyType:""
        },
        validationSchema: validationRules,
        onSubmit: data => mutate(data)
    })

  return (
    <>
            <form onSubmit={formik.handleSubmit}>
                <h2>
                    Create new company
                </h2>
                <br />
                <TextField
                label="companyName"
                id='companyName'
                name='companyName'
                type='text'
                style={{ width: "250px", margin: "5px 0"}}
                value={formik.values.companyName}
                variant='outlined'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                helperText={formik.touched.companyName && formik.errors.companyName}
                />
                
                <br />
                <TextField
                label="companyEmail"
                id='companyEmail'
                name='companyEmail'
                type='text'
                style={{ width: "250px", margin: "5px 0"}}
                value={formik.values.companyEmail}
                variant='outlined'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.companyEmail && Boolean(formik.errors.companyEmail)}
                helperText={formik.touched.companyEmail && formik.errors.companyEmail}
                />
              
                <br />
                <TextField
                label="companyType"
                id='companyType'
                name='companyType'
                type='text'
                style={{ width: "250px", margin: "5px 0"}}
                value={formik.values.companyType}
                variant='outlined'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.companyType && Boolean(formik.errors.companyType)}
                helperText={formik.touched.companyType && formik.errors.companyType}
                />
                <br />
                <Button type='submit'>
                    Submit
                </Button>
            </form>
        </>
  )
}
