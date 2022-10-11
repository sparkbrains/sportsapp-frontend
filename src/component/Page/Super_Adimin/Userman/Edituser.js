/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel'
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';
import { useEffect } from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import * as yup from 'yup';
import { useFormik } from "formik";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router";
import swal from "sweetalert";
import AppLayout from '../../../../layout/appLayout';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


const phoneRegExp = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;

const emailRegx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const validationSchema = yup.object({
    name: yup
    .string()
    .max(25, "Must be 25 characters or less")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required.")
    .required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .matches(emailRegx, "Invalid Email ID...")
    .required("Email is required."),
  phone_no: yup
    .string()
    .min(10, "Phone number should not be less than 10 digits.")
    .max(10, "Phone number should not be more than 10 digits.")
    .required("Phone number is required.")
    .matches(phoneRegExp, "Phone number must contains only digits."),
  location: yup
    .string()
    .max(50, "Must be 50 characters or less.")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required.")
    .required("Location is required."),
  password: yup
    .string()
    .matches(PASSWORD_REGEX, "Invalid password...")
    .required("Password is required."),
  gender: yup.string().required("Gender is required."),
});


const EditUser = () => {
    const baseURL = process.env.REACT_APP_API_ENDPOINT;
    const { id } = useParams();
    let navigate = useNavigate();
    const [admin, setAdmin] = useState({
        name: "",
        gender: "",
        email: "",
        phone_no: "",
        location: "",
    });

    

    const onInputChange = e => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadAdmin();
        document.title = "Edit User"
    }, [])
    const onSubmit = async () => {
        // e.preventDefault();
        if (formik.isValid) {
            axios.patch(baseURL+`sports/user/?id=${id}`,
        {
            user: {
                email: admin.email,
                name: admin.name,
                // password: password,
              },
              profile: {
                role: "user",
                phone_no: admin.phone_no,
              },
              gender: admin.gender,
              location: admin.location,
        }
         ,gender
         )
        .then((res) => {
            // setMessage(res.data.message);
            swal("User Edited Successfully", "", "success", {
              button: "OK",
            });
          })
          .catch((error) => {
            if (error.response) {
              
              // Request made and server responded
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
            //{message && <div>{message}</div>}
      
            swal("Something went wrong!", "", "error", {
              button: "OK",
            });
          });
         navigate("/usermanagement");
    };
}

   
    const loadAdmin = async () => {
        const result = await axios.get(baseURL+`sports/user/?id=${id}`);
        setAdmin({
        name:result.data?.user?.name,
        gender:result.data?.gender,
        email:result.data?.user?.email,
        phone_no:result.data?.profile?.phone_no,
        location:result.data?.location
        });
       
    }

    const [gender, setgender] = useState();
    const handleGenderonChange = (e) => {
        setgender(e.target.value)
    };
    const classes = useStyles();
    // const [age, setAge] = useState('');
    const [open, setOpen] = useState(false);
    const onChange = (event,item) => {
       
        // setgender(gender.props.children)
        // setAge(event.target.value);
        setAdmin((prev) => {

            return { ...prev , 'gender' : event.target.value}
          })
        
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };


    const formik = useFormik({
        initialValues: admin,
        enableReinitialize:true,
        validateOnBlur: true,
        validationSchema: validationSchema,
        onSubmit,
      });

    return (
        <AppLayout>
            <Container>
                <h3 style={{ padding: "10px" }}>Edit User</h3>
                <Paper elevation={3}>
                  
                            <div className={classes.root} style={{ padding: "20px" }}>
                                <form method="POST" Validate autoComplete='off' onSubmit={formik.handleSubmit} >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={4}>

                                            <InputLabel className="Input"
                                                style={{
                                                    color: "rgba(12,11,69,255)",
                                                    display: "flex", fontSize: "15px", fontWeight: "bold",
                                                }}>
                                                 Name
                                            </InputLabel>
                                            <TextField
                                                error={Boolean(formik.touched.name && formik.errors.name)}
                                                margin="normal"
                                                id="name"
                                                required
                                                fullWidth
                                                helperText={formik.touched.name && formik.errors.name}
                                                name="name"
                                                onBlur={formik.handleBlur}
                                                onChange={e => onInputChange(e)}
                                                onClick={formik.handleChange}
                                                variant="outlined"
                                                type="text"
                                                value={admin?.name}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={4}>
                                            <InputLabel className="Input"
                                                style={{
                                                    color: "rgba(12,11,69,255)",
                                                    display: "flex", fontSize: "15px", fontWeight: "bold",
                                                }}>
                                                Location
                                            </InputLabel>
                                            <TextField
                                                error={Boolean(formik.touched.location && formik.errors.location)}
                                                helperText={formik.touched.location && formik.errors.location}
                                                margin="normal"
                                                required
                                                fullWidth
                                                onBlur={formik.handleBlur}
                                                onChange={e => onInputChange(e)}
                                                onClick={formik.handleChange}
                                                // onKeyUp={e => onInputChange(e)}
                                                name="location"
                                                type="text"
                                                variant="outlined"
                                                value={admin.location}
                                            />
                                        </Grid>
                                    
                                        <Grid item xs={12} sm={4}>
                                            <InputLabel className="Input"
                                                style={{
                                                    color: "rgba(12,11,69,255)",
                                                    display: "flex", fontSize: "15px", fontWeight: "bold",
                                                    padding: "8px"
                                                }}>
                                                Gender
                                            </InputLabel>
                                            <Select
                                                error={Boolean(formik.touched.gender && formik.errors.gender)}
                                                helperText={formik.touched.gender && formik.errors.gender}
                                                fullWidth
                                                id="gender"
                                                open={open}
                                                variant="outlined"
                                                onClose={handleClose}
                                                onOpen={handleOpen}
                                                onKeyUp={handleGenderonChange}
                                                value={admin.gender?.length > 1 && admin.gender || 'none' }
                                                onChange={onChange}
                                                name="gender"
                                            >
                                                <MenuItem disabled value="none">
                                                    <em>--- Gender ---</em>
                                                </MenuItem>
                                                <MenuItem value={'Male'}>Male</MenuItem>
                                                <MenuItem value={'Female'}>Female</MenuItem>
                                                <MenuItem value={'Other'}>Other</MenuItem>
                                            </Select> 

{/* <Select 
fullWidth
variant="outlined"
>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </Select> */}


                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={4}>
                                            <InputLabel className="Input"
                                                style={{
                                                    color: "rgba(12,11,69,255)",
                                                    display: "flex", fontSize: "15px", fontWeight: "bold",
                                                }}>
                                                Email
                                            </InputLabel>
                                            <TextField
                                                error={Boolean(formik.touched.email && formik.errors.email)}
                                                fullWidth
                                                helperText={formik.touched.email && formik.errors.email}
                                                margin="normal"
                                                id="email"
                                                name="email"
                                                onBlur={formik.handleBlur}
                                                onChange={e => onInputChange(e)}
                                                onClick={formik.handleChange}
                                                // onKeyUp={e => onInputChange(e)}
                                                type="email"
                                                // value={values.email}
                                                variant="outlined"
                                                value={admin?.email}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <InputLabel className="Input"
                                                style={{
                                                    color: "rgba(12,11,69,255)",
                                                    display: "flex", fontSize: "15px", fontWeight: "bold",
                                                }}>

                                                Phone Number
                                            </InputLabel>
                                            <TextField
                                                error={Boolean(formik.touched.phone_no && formik.errors.phone_no)}
                                                margin="normal"
                                                required
                                                id="phone_no"
                                                fullWidth
                                                helperText={formik.touched.phone_no && formik.errors.phone_no}
                                                onBlur={formik.handleBlur}
                                                onChange={e => onInputChange(e)}
                                                onClick={formik.handleChange}
                                                name="phone_no"
                                                variant="outlined"
                                                value={admin?.phone_no}
                                                type="tel"
                                                label="Phone Number"
                                            />
                                        </Grid>
                                        
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12}>
                                            <div style={{ textAlign: "center", marginTop: "80px", padding: "20px" }}>
                                                <Button
                                                    onClick={(e) => onSubmit(e)}
                                                    variant="contained"
                                                    // disabled={isSubmitting}
                                                    type="submit"
                                                    style={{
                                                        backgroundColor: "#232b58", color: "#fff",
                                                        borderRadius: "25px", width: "143Px",
                                                        padding: "13px"
                                                    }}
                                                >
                                                    SAVE
                                                </Button>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </form>
                       </div>
                </Paper>
            </Container>
        </AppLayout>

    );
};
export default EditUser;