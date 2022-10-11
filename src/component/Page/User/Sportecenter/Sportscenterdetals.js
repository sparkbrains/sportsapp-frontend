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
// import { useNavigate } from "react-router";

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

const phoneRegExp = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

const validationSchema = yup.object({
  firstname: yup
    .string()
    .max(25, "Must be 25 characters or less")
    .matches(/^[A-Za-z ]*$/, 'Only alphabets are required.')
    .required("Firstname is required"),
    timings: yup
    .string(),
    // .timings("timings is invalid")
    // .required("Timings is required"),
  phoneno: yup
    .string()
    .min(10, "Contact number must have at least 10 number.")
    .max(10, "Contact number must have at least 10 number.")
    .required("Phone number is required.")
    .matches(phoneRegExp, "Only numbers are allowed."),
  location: yup.string().required("Location is required."),
  lastname: yup.string()
  .max(25, "Must be 25 characters or less")
  .matches(/^[A-Za-z ]*$/, 'Only alphabets are required.')
  .required("Lastname  is required."),
});

export default function AddUser() {
  // let navigate = useNavigate();

  useEffect(() => {
    document.title = "Add User";
  }, []);

  const [firstname, setfirstname] = useState();
  const handlefirstnameChange = (e) => {
    setfirstname(e.target.value);
  };
  const [lastname, setlastname] = useState();
  const handlelastnameChange = (e) => {
    setlastname(e.target.value);
  };
  const [timings, settimings] = useState();
  const handleEmailChange = (e) => {
    settimings(e.target.value);
  };
  const [phoneno, setphoneno] = useState();
  const handlephonenoChange = (e) => {
    setphoneno(e.target.value);
  };
  const [location, setlocation] = useState();
  const handlelocationChange = (e) => {
    setlocation(e.target.value);
  };

 
  const onSubmit = async (e) => {
    // e.preventDefault();
   const res = await axios
   .post(
      "https://88e8-124-253-244-184.ngrok.io/superadmin_api/usermanagement/",
      {
        firstname: (firstname),
        timings: (timings),
        phoneno: (phoneno),
        lastname: (lastname),
        location: (location),
        gender: (gender), 
      }
    )
    .then((res) =>{

    })
    .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
    // navigate("/category-management");
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      timings: "",
      phoneno: "",
      lastname: "",
      location: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  const [gender, setgender] = useState();
  const handleGenderonChange = (e) => {
    setgender(e.target.value);
  };
  const classes = useStyles();
  const [age, setAge] = useState("");
  const [open, setOpen] = useState(false);
  const onChange = (event, gender) => {
    setgender(gender.props.children);
    setAge(event.target.value);
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
        <h3 style={{ padding: "10px" }}>Sport Center Detail </h3>
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
                        Center Name:
                      </InputLabel>
                      <TextField
                      inputProps={{ maxLength: 50 }}
                        error={Boolean(formik.touched.firstname && formik.errors.firstname)}
                        margin="normal"
                        required
                        fullWidth
                        helperText={formik.touched.firstname && formik.errors.firstname}
                        name="firstname"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        onKeyUp={handlefirstnameChange}
                        autoComplete="firstname"
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
                        Owner:
                      </InputLabel>
                      <TextField
                      inputProps={{ maxLength: 50 }}
                        error={Boolean(formik.touched.lastname && formik.errors.lastname)}
                        margin="normal"
                        required
                        fullWidth
                        helperText={formik.touched.lastname && formik.errors.lastname}
                        name="lastname"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        onKeyUp={handlelastnameChange}
                        autoComplete="lastname"
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
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Male</MenuItem>
                        <MenuItem value={20}>Female</MenuItem>
                        <MenuItem value={30}>Other</MenuItem>
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
                        Timings:
                      </InputLabel>
                      <TextField
                      inputProps={{ maxLength: 50 }}
                        error={Boolean(formik.touched.timings && formik.errors.timings)}
                        fullWidth
                        helperText={formik.touched.timings && formik.errors.timings}
                        margin="normal"
                        name="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        onKeyUp={handleEmailChange}
                        // value={timings}
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
                        Phone No:
                      </InputLabel>
                      <TextField
                      inputProps={{ maxLength: 13 }}
                        error={Boolean(formik.touched.phoneno && formik.errors.phoneno)}
                        margin="normal"
                        required
                        fullWidth
                        helperText={formik.touched.phoneno && formik.errors.phoneno}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        onKeyUp={handlephonenoChange}
                        name="phoneno"
                        autoComplete="number"
                        variant="outlined"
                        type="tel"
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
                        error={Boolean(formik.touched.location && formik.errors.location)}
                        margin="normal"
                        required
                        fullWidth
                        helperText={formik.touched.location && formik.errors.location}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        onKeyUp={handlelocationChange}
                        name="location"
                        autoComplete=""
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
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
                            width: "250Px",
                            padding: "13px",
                          }}
                        >
                          PURCHASE SUBSCRIPTION
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
