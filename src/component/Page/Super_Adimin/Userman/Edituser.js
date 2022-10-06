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
import { useHistory } from "react-router";
import swal from "sweetalert";

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


const phoneRegExp = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

const emailRegx = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

const validationSchema = yup.object({
//   firstname: yup
//     .string()
//     .max(25, "Must be 25 characters or less")
//     .matches(/^[A-Za-z ]*$/, 'Only alphabets are required.')
//     .required("Firstname is required"),
  email: yup.string().email("Email is invalid").matches(emailRegx, "Invalid Email ID...").required("Email is required"),
  phone_no: yup
    .string()
    .min(10, "Phone number not less that 10 character.")
    .max(15, "Phone number not more than 15 character.")
    .required("phone number is required.")
    .matches(phoneRegExp, 'Only numbers are allowed.'),
  location: yup.string().required("Location is required."),
  lastname: yup.string()
  .max(25, "Must be 25 characters or less")
  .matches(/^[A-Za-z ]*$/, 'Only alphabets are required.')
  .required("Lastname  is required."),
});


const EditUser = () => {
    const baseURL = process.env.REACT_APP_API_ENDPOINT;
    const { id } = useParams();
    let history = useHistory();
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
        await axios.patch(baseURL+`sports/user/?id=${id}`,
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
            swal("User Edit Successfully", "", "success", {
              button: "ok",
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
      
            swal("Something went wrong!", "Oops...", "error", {
              button: "ok",
            });
          });
         history.push("/superadmin/usermanagement");
    };

   
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
        initialValues: {
        //   firstname: "",
          email: "",
          phone_no: "",
          lastname: "",
          location: "",
        },
        validateOnBlur: true,
        validationSchema: validationSchema,
        onSubmit,
      });

    return (
        <div>
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
                                                 Name:
                                            </InputLabel>
                                            <TextField
                                                error={Boolean(formik.touched.name && formik.errors.name)}
                                                margin="normal"
                                                id="name"
                                                required
                                                fullWidth
                                                helperText={formik.touched.name && formik.errors.name}
                                                name="name"
                                                // onBlur={formik.handleBlur}
                                                onChange={e => onInputChange(e)}
                                                // onClick={formik.handleChange}
                                                autoComplete=""
                                                variant="outlined"
                                                value={admin?.name}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={4}>
                                            <InputLabel className="Input"
                                                style={{
                                                    color: "rgba(12,11,69,255)",
                                                    display: "flex", fontSize: "15px", fontWeight: "bold",
                                                }}>
                                                Location:
                                            </InputLabel>
                                            <TextField
                                                error={Boolean(formik.touched.location && formik.errors.location)}
                                                margin="normal"
                                                required
                                                fullWidth
                                                helperText={formik.touched.location && formik.errors.location}
                                                onBlur={formik.handleBlur}
                                                onChange={e => onInputChange(e)}
                                                onClick={formik.handleChange}
                                                // onKeyUp={e => onInputChange(e)}
                                                name="location"
                                                autoComplete=""
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
                                                Gender:
                                            </InputLabel>
                                            <Select
                                                fullWidth
                                                labelId="demo-controlled-open-select-label"
                                                id="demo-controlled-open-select"
                                                open={open}
                                                variant="outlined"
                                                onClose={handleClose}
                                                onOpen={handleOpen}
                                                onKeyUp={handleGenderonChange}
                                                value={admin.gender?.length > 1 && admin.gender || 'none' }
                                                onChange={onChange}
                                            
                                            >
                                                <MenuItem value="none">
                                                    <em>None</em>
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
                                                Email:
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

                                                Phone No:
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
                                                autoComplete="number"
                                                variant="outlined"
                                                value={admin?.phone_no}
                                            />
                                        </Grid>
                                        
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12}>
                                            <div style={{ textAlign: "center", marginTop: "180px", padding: "20px" }}>
                                                <Button
                                                    onClick={() => onSubmit()}
                                                    variant="contained"
                                                    // disabled={isSubmitting}
                                                    // type="submit"
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
        </div>

    );
};
export default EditUser;