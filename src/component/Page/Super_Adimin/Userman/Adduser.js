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
import { useHistory } from "react-router";
import swal from "sweetalert";

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

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  name: yup
    .string()

    .max(50, "Must be 50 characters or less")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required.")
    .required("name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  phone_no: yup
    .string()
    .min(10, "Phone number must be at least 10 number.")
    .max(15, "phone number must be at least 12 number.")
    .required("phone number is required.")
    .matches(phoneRegExp, "Only numbers are allowed."),
  location: yup.string().required("Location is required."),
  password: yup.string().required("Password is required."),
});

export default function AddUser() {
  let history = useHistory();

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
    const res = await axios
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
        // setMessage(res.data.message);
        console.log(res, "ssssssankul");
        swal("User Created Successfully.", "", "success", {
          button: "OK",
        });
        history.push("/superadmin/usermanagement");
      })
      // .catch((err) => { });
      .catch((error) => {
        if (error.response) {
          seterror(error?.response?.data?.error);
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
          button: "OK",
        });
      });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone_no: "",
      location: "",
      password: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  const [gender, setgender] = useState("Male");
  const handleGenderonChange = (e) => {
    setgender(e.target.value);
  };
  const classes = useStyles();
  const [age, setAge] = useState("Male");
  const [open, setOpen] = useState(false);
  const onChange = (event, gender) => {
    console.log(gender.props.children);
    setgender(gender.props.children);
    setAge(event.target.value);
    console.log(event);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Container>
        <h3 style={{ padding: "10px" }}>Add User</h3>
        <Paper elevation={3}>
          <div className={classes.root} style={{ padding: "20px" }}>
            <form method="POST" noValidate onSubmit={formik.handleSubmit}>
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
                    Name:
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
                    autoComplete="name"
                    variant="outlined"
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
                    Location:
                  </InputLabel>
                  <TextField
                    inputProps={{ maxLength: 50 }}
                    error={Boolean(
                      formik.touched.location && formik.errors.location
                    )}
                    margin="normal"
                    required
                    fullWidth
                    helperText={
                      formik.touched.location && formik.errors.location
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    onKeyUp={handlelocationChange}
                    name="location"
                    autoComplete=""
                    variant="outlined"
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
                      padding: "8px",
                    }}
                  >
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
                    value={age}
                    onChange={onChange}
                    defaultValue="Male"
                  >
                  
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
                    Email:
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
                    variant="outlined"
                  />
                  <p style={{ color: "red", margin: "0px" }}>{error}</p>
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
                    Phone No:
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
                    autoComplete="number"
                    variant="outlined"
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
                    Password:
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
                      style={{
                        backgroundColor: "#232b58",
                        color: "#fff",
                        borderRadius: "25px",
                        width: "143Px",
                        padding: "13px",
                        fontSize: "17px",
                      }}
                    >
                      ADD UESR
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
}
