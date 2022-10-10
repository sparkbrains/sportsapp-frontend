import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import "date-fns";
import {
  MuiPickersUtilsProvider,

} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useNavigate,useParams } from "react-router";


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

export default function CenteredGrid() {
  const { id } = useParams();
  const [editsport, setEditsport] = useState({
    name: "",
    email: "",
    timeto: "",
    contact: "",
    timefrom: "",
    location: "",
  });
  const onInputChange = (e) => {
    setEditsport({ ...editsport, [e.target.name]: e.target.value });
  };
  let navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_ENDPOINT;


  useEffect(() => {
    loadUser();
    document.title = "Edit Sports Center";
  }, []);

  const onSubmit = async (e) => {
    // e.preventDefault();
    await axios.put(baseURL+`sports/sports/${id}/`,
      editsport
    );
    navigate("/sportscenterowner");
  };

  const loadUser = async () => {
    const result = await axios.get(baseURL+`sports/sports/${id}/`
    );
    setEditsport(result.data);
  };

  // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  // const handleDateChange = (date) => {
  //     setSelectedDate(date);
  // };

  // const [selectedDateTo, setSelectedDateTo] = React.useState(new Date('2014-08-18T21:11:54'));
  // const handleDateChangeTo = (date) => {
  //     setSelectedDateTo(date);
  // };
  const classes = useStyles();

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

  return (
    <div>
      <Container>
        <h3 style={{ padding: "10px" }}>Edit Sports Center</h3>
        <Paper>
          <div className={classes.root} style={{ padding: "20px" }}>
            <form method="POST" noValidate onSubmit={formik.handleSubmit}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                      Center Name
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
                      value={editsport.name}
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
                      Time From
                    </InputLabel>
                    <TextField
                      error={Boolean(
                        formik.touched.timefrom && formik.errors.timefrom
                      )}
                      margin="normal"
                      required
                      fullWidth
                      timefrom="timefrom"
                      helperText={
                        formik.touched.timefrom && formik.errors.timefrom
                      }
                      onBlur={formik.handleBlur}
                      onChange={(e) => onInputChange(e)}
                      onClick={formik.handleChange}
                      name="timefrom"
                      autoComplete="timefrom"
                      variant="outlined"
                      value={editsport.timefrom}
                    />
                    {/* <KeyboardTimePicker
                                                    margin="normal"
                                                    id="time-from"
                                                    inputVariant="outlined"
                                                    fullWidth
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change time',
                                                    }}
                                                    name="timeFrom"
                                                /> */}
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
                      Time To
                    </InputLabel>
                    <TextField
                      error={Boolean(
                        formik.touched.timeto && formik.errors.timeto
                      )}
                      margin="normal"
                      required
                      fullWidth
                      // timeto="timeto"
                      helperText={formik.touched.timeto && formik.errors.timeto}
                      onBlur={formik.handleBlur}
                      onChange={(e) => onInputChange(e)}
                      onClick={formik.handleChange}
                      name="timeto"
                      autoComplete="timeto"
                      variant="outlined"
                      value={editsport.timeto}
                    />
                    {/* <KeyboardTimePicker
                                                    margin="normal"
                                                    id="time-from"
                                                    inputVariant="outlined"
                                                    fullWidth
                                                    value={selectedDateTo}
                                                    onChange={handleDateChangeTo}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change time',
                                                    }}
                                                    name="timeFrom"
                                                /> */}
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider>
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
                     value={editsport.email}
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
                    error={Boolean(formik.touched.contact && formik.errors.contact)}
                    margin="normal"
                    required
                    fullWidth
                    helperText={formik.touched.contact && formik.errors.contact}
                    onBlur={formik.handleBlur}
                    onChange={(e) => onInputChange(e)}
                    onClick={formik.handleChange}
                    name="contact"
                    autoComplete="number"
                    variant="outlined"
                    value={editsport.contact}
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
                    error={Boolean(formik.touched.location && formik.errors.location)}
                    fullWidth
                    helperText={formik.touched.location && formik.errors.location}
                    margin="normal"
                    name="location"
                    onBlur={formik.handleBlur}
                    onChange={(e) => onInputChange(e)}
                    onClick={formik.handleChange}
                    type="text"
                     value={editsport.location}
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
                        width: "190Px",
                        padding: "11px",
                      }}
                    >
                      save
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
