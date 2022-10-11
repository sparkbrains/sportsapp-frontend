import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import { useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import AppLayout from "../../../../layout/appLayout";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
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
    .matches(PASSWORD_REGEX, " Password must have at least 8 characters and the combination of the following: uppercase letter, lowercase letter, numbers, and symbols.")
    .required("Password is required."),
  gender: yup.string().required("Gender is required."),
});

export default function AddUser() {
  let navigate = useNavigate();

  useEffect(() => {
    document.title = "Add User";
  }, []);
  const [error, seterror] = useState();
  const [name, setname] = useState();
  const handlefirstnameChange = (e) => {
    setname(e.target.value);
  };

  const [email, setemail] = useState();
  const handleEmailChange = (e) => {
    setemail(e.target.value);
  };
  const [password, setPassword] = useState();
  const handlepasswordonChange = (e) => {
    setPassword(e.target.value);
  };
  const [phone_no, setphone_no] = useState();
  const handlephonenoChange = (e) => {
    setphone_no(e.target.value);
  };
  const [location, setlocation] = useState();
  const handlelocationChange = (e) => {
    setlocation(e.target.value);
  };
  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  const token = localStorage.getItem("token");

  const onSubmit = async (e) => {
    // e.preventDefault();
    console.log(gender,"gennnnnn");
    if (formik.isValid) {
     axios
      .post(
        baseURL + "sports/user/",
        {
          user: {
            email: email,
            name: name,
            password: password,
          },
          profile: {
            role: "user",
            phone_no: phone_no,
          },
          gender: gender,
          location: location,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        swal("User added successfully.", "", "success", {
          button: "OK",
        });
        navigate("/usermanagement");
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          seterror(error?.response?.data?.error);
          console.log(error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        swal("Something went wrong!", "", error, {
          button: "OK",
        });
      });
  };
}

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone_no: "",
      location: "",
      password: "",
      gender: "",
    },
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit,
  });

  const [gender, setgender] = useState("");
  const handleGenderonChange = (e) => {
    setgender(e.target.value);
  };
  const classes = useStyles();
  const [age, setAge] = useState("");
  const [open, setOpen] = useState(false);
  const onChange = (event, gender) => {
    setgender(event.target.value);
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <AppLayout>
      <Container>
        <h3 style={{ padding: "10px" }}>Add New User</h3>
        <Paper elevation={3}>
          <div className={classes.root} style={{ padding: "20px" }}>
            <form
              method="POST"
              noValidate
              autoComplete="off"
              onSubmit={formik.handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item sm={12} md={4}>
                  <InputLabel
                    className="Input"
                    style={{
                      color: "rgba(12,11,69,255)",
                      display: "flex",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    Name
                  </InputLabel>
                  <TextField
                    inputProps={{ maxLength: 50 }}
                    error={Boolean(formik.touched.name && formik.errors.name)}
                    margin="normal"
                    required
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    onKeyUp={handlefirstnameChange}
                    label="User Name"
                    variant="outlined"
                    type="text"
                  />
                </Grid>

                <Grid item sm={12} md={4}>
                  <InputLabel
                    className="Input"
                    style={{
                      color: "rgba(12,11,69,255)",
                      display: "flex",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    Location
                  </InputLabel>
                  <TextField
                    inputProps={{ maxLength: 50 }}
                    error={Boolean(
                      formik.touched.location && formik.errors.location
                    )}
                    helperText={
                      formik.touched.location && formik.errors.location
                    }
                    margin="normal"
                    required
                    fullWidth
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    onKeyUp={handlelocationChange}
                    name="location"
                    type="text"
                    variant="outlined"
                    label="Location"
                  />
                </Grid>

                <Grid item sm={12} md={4}>
                  <InputLabel
                    id="gender"
                    className="Input"
                    style={{
                      color: "rgba(12,11,69,255)",
                      display: "flex",
                      fontSize: "15px",
                      fontWeight: "bold",
                      padding: "8px",
                    }}
                  >
                    Gender
                  </InputLabel>
                  <Select
                    error={Boolean(
                      formik.touched.gender && formik.errors.gender
                    )}
                    helperText={formik.touched.gender && formik.errors.gender}
                    fullWidth
                    id="gender"
                    open={open}
                    variant="outlined"
                    onClose={handleClose}
                    onOpen={handleOpen}
                    // onKeyUp={handleGenderonChange}
                    value={age}
                    onChange={onChange}
                    // label="Gender"
                    name="gender"
                    displayEmpty
                  >
                    <MenuItem disabled value="">
                      <em>--- Gender ---</em>
                    </MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item sm={12} md={4}>
                  <InputLabel
                    className="Input"
                    style={{
                      color: "rgba(12,11,69,255)",
                      display: "flex",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    Email
                  </InputLabel>
                  <TextField
                    inputProps={{ maxLength: 50 }}
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    margin="normal"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    onKeyUp={handleEmailChange}
                    type="email"
                    label="Email"
                    variant="outlined"
                  />
                  <p style={{ color: "red", margin: "0px", fontSize: "12px" }}>
                    {error}
                  </p>
                </Grid>
                <Grid item sm={12} md={4}>
                  <InputLabel
                    className="Input"
                    style={{
                      color: "rgba(12,11,69,255)",
                      display: "flex",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    Phone Number
                  </InputLabel>
                  <TextField
                    inputProps={{ maxLength: 13 }}
                    error={Boolean(
                      formik.touched.phone_no && formik.errors.phone_no
                    )}
                    margin="normal"
                    required
                    fullWidth
                    helperText={
                      formik.touched.phone_no && formik.errors.phone_no
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    onKeyUp={handlephonenoChange}
                    name="phone_no"
                    type="tel"
                    variant="outlined"
                    label="Phone No"
                  />
                </Grid>
                <Grid item sm={12} md={4}>
                  <InputLabel
                    className="Input"
                    style={{
                      color: "rgba(12,11,69,255)",
                      display: "flex",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    Password
                  </InputLabel>
                  <TextField
                    inputProps={{ maxLength: 50 }}
                    error={Boolean(
                      formik.touched.password && formik.errors.password
                    )}
                    margin="normal"
                    required
                    fullWidth
                    location="password"
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    onBlur={formik.handleBlur}
                    onKeyUp={handlepasswordonChange}
                    onChange={formik.handleChange}
                    name="password"
                    type="password"
                    autoComplete="password"
                    variant="outlined"
                    label="Password"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}></Grid>
              <Grid container spacing={2}>
                <Grid item sm={12} md={12}>
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "180px",
                      padding: "20px",
                    }}
                  >
                    <Button
                      variant="contained"
                      //   disabled={isSubmitting}
                      type="submit"
                      onClick={(e) => {
                        onSubmit(e);
                      }}
                      style={{
                        backgroundColor: "#232b58",
                        color: "#fff",
                        borderRadius: "25px",
                        width: "143Px",
                        padding: "13px",
                        fontSize: "17px",
                      }}
                    >
                      ADD USER
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
}
