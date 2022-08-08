import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import { useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";

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
  name: yup.string()
    .max(25, "Must be 25 characters or less")
    .required("Name is required.")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
  email: yup.string().email("Email is invalid.").required("Email is required."),
  phoneno: yup.string()
    .min(10, "phone number must be at least 12 number.")
    .required("Phone number is required.")
    .matches(phoneRegExp, "Only numbers are allowed."),
  location: yup.string().required("Location is required."),
  sportscenter: yup.string()
    .required("Sport center  is required.")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
  speciallsation: yup.string()
    .required("speciallsation  is required.")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
});

export default function CenteredGrid() {
  useEffect(() => {
    document.title = "Add Coach";
  }, []);
  let history = useHistory();
  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  const [user, setUser] = useState({
    name: "",
    sportscenter: "",
    phoneno: "",
    speciallsation: "",
    location: "",
    email: "",
  });
  console.log(user, "hello mam");
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    // e.preventDefault();
   const res = await axios.post(baseURL+"sports/coaches/", user);
   history.push("/sportscenterowner/coaches");
  };
  // 

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      name: "",
      sportscenter: "",
      phoneno: "",
      speciallsation: "",
      location: "",
      email: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <div>
      <Container>
        <h3 style={{ padding: "10px" }}>Add Coach</h3>
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
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    onKeyUp={(e) => onInputChange(e)}
                    onChange={formik.handleChange}
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
                    Sports Center
                  </InputLabel>
                  <TextField
                  inputProps={{ maxLength: 50 }}
                    error={Boolean(formik.touched.sportscenter && formik.errors.sportscenter)}
                    margin="normal"
                    required
                    fullWidth
                    helperText={formik.touched.sportscenter && formik.errors.sportscenter}
                    name="sportscenter"
                    onBlur={formik.handleBlur}
                    onKeyUp={(e) => onInputChange(e)}
                    onChange={formik.handleChange}
                    autoComplete="sportscenter"
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
                    Speciallsation
                  </InputLabel>
                  <TextField
                  inputProps={{ maxLength: 50 }}
                    error={Boolean(
                      formik.touched.speciallsation && formik.errors.speciallsation
                    )}
                    margin="normal"
                    required
                    fullWidth
                    helperText={formik.touched.speciallsation && formik.errors.speciallsation}
                    name="speciallsation"
                    onBlur={formik.handleBlur}
                    onKeyUp={(e) => onInputChange(e)}
                    onChange={formik.handleChange}
                    autoComplete="speciallsation"
                    variant="outlined"
                  />
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
                    onKeyUp={e => onInputChange(e)}
                    onChange={formik.handleChange}
                    type="email"
                    // value={values.email}
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
                    Phone No.
                  </InputLabel>
                  <TextField
                  inputProps={{ maxLength: 13 }}
                    error={Boolean(formik.touched.phoneno && formik.errors.phoneno)}
                    margin="normal"
                    required
                    fullWidth
                    helperText={formik.touched.phoneno && formik.errors.phoneno}
                    onBlur={formik.handleBlur}
                    onKeyUp={(e) => onInputChange(e)}
                    onChange={formik.handleChange}
                    name="phoneno"
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
                    Location
                  </InputLabel>
                  <TextField
                  inputProps={{ maxLength: 50 }}
                    error={Boolean(formik.touched.location && formik.errors.location)}
                    fullWidth
                    helperText={formik.touched.location && formik.errors.location}
                    margin="normal"
                    name="location"
                    onBlur={formik.handleBlur}
                    onKeyUp={(e) => onInputChange(e)}
                    onChange={formik.handleChange}
                    type="text"
                    // value={values.location}
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
                        width: "192Px",
                        padding: "11px",
                        fontSize: "17px",
                      }}
                    >
                      Add Coach
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
