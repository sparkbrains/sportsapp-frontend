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
import axios from "axios";
import { useHistory } from "react-router-dom";

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
  name: yup.string()
    .max(25, "Must be 25 characters or less")
    .required("Name is required.")
    .matches(/^[A-Za-z ]*$/, 'Only alphabets are required.'),
  email: yup.string().email("Email is invalid.").required("Email is required."),
  contact: yup.string()
    .min(10, "phone number must be at least 12 number.")
    .required("Phone number is required.")
    .matches(phoneRegExp, "Only numbers are allowed."),
  location: yup.string().required("Location is required."),
  timefrom: yup.string()
  .required("Time from is required."),

  timeto: yup.string()
  .required("Time to is required."),
  // .matches(/^[A-Za-z ]*$/, 'Only alphabets are required.'),
  
});

const Addsportscenter = () => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  let history = useHistory();
  const baseURL = process.env.REACT_APP_API_ENDPOINT;


  const [user, setUser] = useState({
    name: "",
    email: "",
    timeto: "",
    contact: "",
    timefrom: "",
    location: "",
  });
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    // e.preventDefault();
    await axios.post(baseURL+"sports/sports/",
      user
    );
     history.push("/sportscenterowner/");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
              email: "",
              contact: "",
              timefrom: "",
              timeto:"",
              location: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  useEffect(() => {
    document.title = "Addsportcenter";
  }, []);

  const classes = useStyles();

  return (
    <div>
      <Container>
        <h3 style={{ padding: "10px" }}>Add Sport Center</h3>
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
                        error={Boolean(formik.touched.name && formik.errors.name)}
                        margin="normal"
                        required
                        fullWidth
                        helperText={formik.touched.name && formik.errors.name}
                        name="name"
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
                      Time From:
                      </InputLabel>
                      <TextField
                        error={Boolean(formik.touched.timefrom && formik.errors.timefrom)}
                        margin="normal"
                        required
                        fullWidth
                        timefrom="timefrom"
                        helperText={formik.touched.timefrom && formik.errors.timefrom}
                        onBlur={formik.handleBlur}
                        onKeyUp={(e) => onInputChange(e)}
                        onChange={formik.handleChange}
                        name="timefrom"
                        autoComplete="timefrom"
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
                        Time To:
                      </InputLabel>
                      <TextField
                        error={Boolean(formik.touched.timeto && formik.errors.timeto)}
                        margin="normal"
                        required
                        fullWidth
                        // timeto="timeto"
                        helperText={formik.touched.timeto && formik.errors.timeto}
                        onBlur={formik.handleBlur}
                        onKeyUp={(e) => onInputChange(e)}
                        onChange={formik.handleChange}
                        name="timeto"
                        autoComplete="timeto"
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
                        Email:
                      </InputLabel>
                      <TextField
                        error={Boolean(formik.touched.email && formik.errors.email)}
                        fullWidth
                        helperText={formik.touched.email && formik.errors.email}
                        margin="normal"
                        name="email"
                        onBlur={formik.handleBlur}
                        onKeyUp={(e) => onInputChange(e)}
                        onChange={formik.handleChange}
                        type="email"
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
                        error={Boolean(formik.touched.contact && formik.errors.contact)}
                        margin="normal"
                        required
                        fullWidth
                        helperText={formik.touched.contact && formik.errors.contact}
                        onBlur={formik.handleBlur}
                        onKeyUp={(e) => onInputChange(e)}
                        onChange={formik.handleChange}
                        name="contact"
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
                        Location:
                      </InputLabel>
                      <TextField
                        error={Boolean(formik.touched.location && formik.errors.location)}
                        margin="normal"
                        required
                        fullWidth
                        location="location"
                        helperText={formik.touched.location && formik.errors.location}
                        onBlur={formik.handleBlur}
                        onKeyUp={(e) => onInputChange(e)}
                        onChange={formik.handleChange}
                        name="location"
                        autoComplete="location"
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
                            width: "230Px",
                            padding: "13px",
                            fontSize:"17px"
                          }}
                        >
                          ADD SPORT CENTER
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
export default Addsportscenter;
