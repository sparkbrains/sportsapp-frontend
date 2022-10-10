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
import { useFormik } from "formik";
import { useParams } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

const validationSchema = yup.object({
  name: yup
    .string()
    .max(25, "Must be 25 characters or less")
    .required("Name is required.")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
  email: yup.string().email("Email is invalid.").required("Email is required."),
  phoneno: yup
    .string()
    .min(10, "phone number must be at least 12 number.")
    .required("Phone number is required.")
    .matches(phoneRegExp, "Only numbers are allowed."),
  location: yup.string().required("Location is required."),
  sportscenter: yup
    .string()
    .required("Sport center  is required.")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
  speciallsation: yup
    .string()
    .required("speciallsation  is required.")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
});

export default function CenteredGrid() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [editcoach, setEditcoach] = useState({
    name: "",
    sportscenter: "",
    phoneno: "",
    speciallsation: "",
    location: "",
    email: "",
  });
  const onInputChange = (e) => {
    setEditcoach({ ...editcoach, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    document.title = "Edit Coach Ownetr";
    loadUser();
  }, []);
  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  const onSubmit = async (e) => {
    // e.preventDefault();
    await axios.put(baseURL+`sports/coaches/${id}/`,
      editcoach
    );
    navigate("/sportscenterowner/coaches");
  };
  const loadUser = async (e) => {
    const result = await axios.get(baseURL+`sports/coaches/${id}/`
    );
    setEditcoach(result.data);
  };

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
        <h3 style={{ padding: "10px" }}>Edit Coach</h3>
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
                    error={Boolean(formik.touched.name && formik.errors.name)}
                    margin="normal"
                    required
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={(e) => onInputChange(e)}
                    onClick={formik.handleChange}
                    autoComplete="name"
                    variant="outlined"
                    value={editcoach.name}
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
                    error={Boolean(
                      formik.touched.sportscenter && formik.errors.sportscenter
                    )}
                    margin="normal"
                    required
                    fullWidth
                    helperText={
                      formik.touched.sportscenter && formik.errors.sportscenter
                    }
                    name="sportscenter"
                    onBlur={formik.handleBlur}
                    onChange={(e) => onInputChange(e)}
                    onClick={formik.handleChange}
                    autoComplete="sportscenter"
                    variant="outlined"
                    value={editcoach.sportscenter}
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
                    error={Boolean(
                      formik.touched.speciallsation &&
                        formik.errors.speciallsation
                    )}
                    margin="normal"
                    required
                    fullWidth
                    helperText={
                      formik.touched.speciallsation &&
                      formik.errors.speciallsation
                    }
                    name="speciallsation"
                    onBlur={formik.handleBlur}
                    onChange={(e) => onInputChange(e)}
                    onClick={formik.handleChange}
                    autoComplete="speciallsation"
                    variant="outlined"
                    value={editcoach.speciallsation}
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
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    margin="normal"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={(e) => onInputChange(e)}
                    onClick={formik.handleChange}
                    type="email"
                    // value={values.email}
                    value={editcoach.email}
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
                    error={Boolean(
                      formik.touched.phoneno && formik.errors.phoneno
                    )}
                    margin="normal"
                    required
                    fullWidth
                    helperText={formik.touched.phoneno && formik.errors.phoneno}
                    onBlur={formik.handleBlur}
                    onChange={(e) => onInputChange(e)}
                    onClick={formik.handleChange}
                    name="phoneno"
                    autoComplete="number"
                    variant="outlined"
                    value={editcoach.phoneno}
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
                    error={Boolean(
                      formik.touched.location && formik.errors.location
                    )}
                    fullWidth
                    helperText={
                      formik.touched.location && formik.errors.location
                    }
                    margin="normal"
                    name="location"
                    onBlur={formik.handleBlur}
                    onChange={(e) => onInputChange(e)}
                    onClick={formik.handleChange}
                    type="text"
                    value={editcoach.location}
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
                      // disabled={isSubmitting}
                      type="submit"
                      style={{
                        backgroundColor: "#232b58",
                        color: "#fff",
                        borderRadius: "25px",
                        width: "192Px",
                        padding: "11px",
                      }}
                    >
                      Save
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
