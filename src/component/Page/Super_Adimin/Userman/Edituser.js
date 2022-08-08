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


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = yup.object({
  firstname: yup
    .string()
    .max(25, "Must be 25 characters or less")
    .matches(/^[A-Za-z ]*$/, 'Only alphabets are required.')
    .required("Firstname is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  phoneno: yup
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
        firstname: "",
        lastname: "",
        gender: "",
        email: "",
        phoneno: "",
        location: "",
    });

   console.log(admin,"admin");
    

    const onInputChange = e => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadAdmin();
        document.title = "Edit User"
    }, [])
    const onSubmit = async () => {
        // e.preventDefault();
        await axios.put(baseURL+`sports/user/${id}/`,
         admin,gender
         )
        .then((res) => {
            // setMessage(res.data.message);
            console.log(res, "ssssssankul");
            swal("User Edit Successfully", "", "success", {
              button: "ok",
            });
          })
          .catch((error) => {
            if (error.response) {
              
              // Request made and server responded
              console.log(error.response.data.gender, "hellp1234567890");
              console.log(error.response.status);
              console.log(error.response.gender, "hellp");
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
        const result = await axios.get(baseURL+`sports/user/${id}/`);
        setAdmin(result.data);
        console.log(admin,"adminAnkul");

   
    }

    const [gender, setgender] = useState();
    const handleGenderonChange = (e) => {
        setgender(e.target.value)
    };
    const classes = useStyles();
    const [age, setAge] = useState('');
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
          firstname: "",
          email: "",
          phoneno: "",
          lastname: "",
          location: "",
        },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema,
      });

    return (
        <div>
            <Container>
                <h3 style={{ padding: "10px" }}>Edit User</h3>
                <Paper elevation={3}>
                  
                            <div className={classes.root} style={{ padding: "20px" }}>
                                <form method="POST" noValidate onSubmit={formik.handleSubmit} >
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
                                                id="firstname"
                                                required
                                                fullWidth
                                                helperText={formik.touched.name && formik.errors.name}
                                                name="firstname"
                                                onBlur={formik.handleBlur}
                                                onChange={e => onInputChange(e)}
                                                onClick={formik.handleChange}
                                                // onKeyUp={e => onInputChange(e)}
                                                autoComplete="firstname"
                                                variant="outlined"
                                                value={admin.name}
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
                                                value={admin.email}
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
                                                error={Boolean(formik.touched.phoneno && formik.errors.phoneno)}
                                                margin="normal"
                                                required
                                                id="phoneno"
                                                fullWidth
                                                helperText={formik.touched.phoneno && formik.errors.phoneno}
                                                onBlur={formik.handleBlur}
                                                onChange={e => onInputChange(e)}
                                                onClick={formik.handleChange}
                                                // onKeyUp={e => onInputChange(e)}
                                                name="phoneno"
                                                autoComplete="number"
                                                variant="outlined"
                                                value={admin.phoneno}
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