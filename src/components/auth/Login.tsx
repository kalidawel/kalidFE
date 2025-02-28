import { TextField, Button } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

export default function Login() {
    const navigate = useNavigate()

    const validationRules = yup.object({
        username: yup.string().required("A username is required to login"),
        password: yup.string().required("A password is required to login")
    })

    const login = async (loginInfo) => {
        const request = await axios.post("http://localhost:8080/api/users/login", loginInfo)
        if(request.status != 200){
            throw new Error("Invalid Credentials")
        }
        return request.data
    }

    const loginMutation = useMutation({
        mutationFn:login,
        onSuccess:(data) => {
            sessionStorage.setItem("Authorization", data)
            navigate("/")
        },
        onError: (error) => {
            alert("An error has occurred please try again: " + error.message)
        }
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: validationRules,
        onSubmit: (values) => loginMutation.mutate(values)
    })
  return (
    <form onSubmit={formik.handleSubmit}>
        <h2>Login</h2>
        <br />
        <TextField
            id='username'
            label='Username'
            type='text'
            style={{ width: "120px", margin: "5px 0"}}
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
            label='Password'
            type='text'
            style={{ width: "120px", margin: "5px 0"}}
            value={formik.values.password}
            variant='outlined'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
        />
        <br />
            <Button type='submit'>
                Submit
            </Button>
    </form>
  )
}