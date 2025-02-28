import Employee from "../../types/Employee";
import { QueryClient, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'


const CreateEmployee = () => {
    const validationRules = yup.object({
        fName:yup.string()
        .min(2, "The employee fname must at least 2 characters")
        .max(20, "The employee fname must not go past 20 characters")
        .required("The fname must be filled out"),
        lName:yup.string()
        .min(2, "The employee lname must be atleast 2 characters")
        .max(30, "The employee lname must be shorter then 31 character")
        .required(),
        empDepartment:yup.string()
        .min(2, "The employee department name must be atleast 2 characters")
        .max(25, "The employee department name must be shorter then 31 character")
        .required(),
        age: yup.number()
        .min(20, "employee age minimum be 20")
        .required(),
        email:yup.string()
        .min(10, "The employee email must be atleast 10 characters")
        .max(25, "The employee email must be shorter then 25 character")
        .required(),
        address:yup.string()
        .min(10, "The employee address must be atleast 10 characters")
        .max(25, "The employee address must be shorter then 25 character")
        .required(),
        company: yup.object()
       
        .required()
    })

    const queryClient = new QueryClient()

    const navigate = useNavigate();

    const {mutate} = useMutation({
        mutationFn:async (data:Employee) => {
            const employee:Employee = data
            const request = await axios.post("http://localhost:8080/api/employee/create/", employee,{
                headers:{
                    "Authorization": `Bearer ${sessionStorage.getItem("Authorization")}`
                }
            })
            const response = await request.data
            return response
        },
        onSuccess:() => {
            alert("Employee has been successfully added in")
            queryClient.invalidateQueries()
            navigate("/employee-index")
        },
        onError:error => {
            alert("Something went wrong here is the message: " + error.message)
        }
    })

    const formik = useFormik({
        initialValues: {
            fName: "",
            lName: "",
            empDepartment: "",
            age:0,
            email:"",
            address:"",
            company:{}
        },
        validationSchema: validationRules,
        onSubmit: data => mutate(data)
    })

    return(
        <>
            <form onSubmit={formik.handleSubmit}>
                <h2>
                    Create new employee
                </h2>
                <br />
                <TextField
                label="fName"
                id='fName'
                name='fName'
                type='text'
                style={{ width: "250px", margin: "5px 0"}}
                value={formik.values.fName}
                variant='outlined'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.fName && Boolean(formik.errors.fName)}
                helperText={formik.touched.fName && formik.errors.fName}
                />
                <br />
                <TextField
                label="lName"
                id='lName'
                name='lName'
                type='text'
                style={{ width: "250px", margin: "5px 0"}}
                value={formik.values.lName}
                variant='outlined'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.lName && Boolean(formik.errors.lName)}
                helperText={formik.touched.lName && formik.errors.lName}
                />
                <br />
                <TextField
                label="empDepartment"
                id='empDepartment'
                name='empDepartment'
                type='text'
                style={{ width: "250px", margin: "5px 0"}}
                value={formik.values.empDepartment}
                variant='outlined'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.empDepartment && Boolean(formik.errors.empDepartment)}
                helperText={formik.touched.empDepartment && formik.errors.empDepartment}
                />
                <br />
                <TextField
                label="email"
                id='email'
                name='email'
                type='text'
                style={{ width: "250px", margin: "5px 0"}}
                value={formik.values.age}
                variant='outlined'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                />
                <br />
                <TextField
                label="age"
                id='age'
                name='age'
                type='number'
                style={{ width: "250px", margin: "5px 0"}}
                value={formik.values.age}
                variant='outlined'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.age && Boolean(formik.errors.age)}
                helperText={formik.touched.age && formik.errors.age}
                />
                <br />
                <TextField
                label="address"
                id='address'
                name='address'
                type='text'
                style={{ width: "250px", margin: "5px 0"}}
                value={formik.values.address}
                variant='outlined'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                />
                 <br />
                <TextField
                label="company"
                id='company'
                name='company'
                type='object'
                style={{ width: "250px", margin: "5px 0"}}
                value={formik.values.company}
                variant='outlined'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.company && Boolean(formik.errors.company)}
                helperText={formik.touched.company && formik.errors.company}
                />
                <br />
                <Button type='submit'>
                    Submit
                </Button>
            </form>
        </>
    )
}

export default CreateEmployee