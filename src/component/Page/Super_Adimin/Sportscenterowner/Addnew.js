import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { MdFileUpload } from "react-icons/md";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import AppLayout from "../../../../layout/appLayout";
// import { Datepicker } from '@mobiscroll/react-lite';
// import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
// import Datepicker from "@mobiscroll/react-lite";

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

const baseURL = process.env.REACT_APP_API_ENDPOINT;

const phoneRegExp = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;

const emailRegx = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .max(25, "Must be 25 characters or less.")
    .required("Name is required.")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
  email: yup
    .string()
    .email("Email is invalid.")
    .required("Email is required.")
    // .test(
    //   "email check",
    //   "email déjà utiliser",
    //   async (value) =>
    //     await fetch(baseURL + `sports/coach/`, {
    //       method: "POST",
    //       headers: {
    //         "Content-type": "application/json",
    //       },
    //       body: JSON.stringify({ email: value }),
    //     }).then((res) => res.json())
    // )
    .matches(emailRegx, "Invalid Email ID..."),
  phone_no: yup
    .string()
    .matches(phoneRegExp, "Phone number must contains only digits.")
    .min(10, "Phone number should not be less than 10 digits.")
    .max(10, "Phone number should not be more than 10 digits.")
    .required("Phone number is required."),
  location: yup
    .string()
    .max(50, "Must be 50 characters or less.")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required.")
    .required("Location is required."),
  sports_center: yup
    .string()
    .max(25, "Must be 25 characters or less.")
    .required("Sports center is required.")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
  password: yup.string().required("Password is required."),
  opentimings: yup.string().required("Time is required."),
  closetimings: yup.string().required("Time is required."),
});

const Addnew = () => {
  let navigate = useNavigate();
  const [document, setdocument] = useState();
  const [error, seterror] = useState();
  const [closetimings, setclosetimings] = useState(null);
  const [opentimings, setopentimings] = useState(null);

  const [name, setownername] = useState('');
  const handlenameChange = (e) => {
    setownername(e.target.value);
  };
  const [password, setPassword] = useState('');
  const handlepasswordonChange = (e) => {
    setPassword(e.target.value);
  };
  const [email, setemail] = useState('');
  const handleEmailChange = (e) => {
    setemail(e.target.value);
  };

  const [phone_no, setphoneno] = useState('');
  const handleContactChange = (e) => {
    setphoneno(e.target.value);
  };

  const [sports_center, setsportcenter] = useState('');
  const handlesportcenterChange = (e) => {
    setsportcenter(e.target.value);
  };
  const [location, setlocation] = useState('');
  const handlelocationChange = (e) => {
    setlocation(e.target.value);
  };

  const handleopentimingsChange = (e) => {
    setopentimings(e.target.value);
  };

  const handlefirstnameChange = (e) => {
    setclosetimings(e.target.value);
    // (e.target.value) >= opentimings ? " " : setclosetimings(e.target.value);
  };

  const token = localStorage.getItem("token");
  const onSubmit = (e) => {
    console.log(formik,formik.isValid,opentimings,closetimings, "isValid---");
    if (formik.isValid) {
      axios
        .post(
          baseURL + "sports/owner/",
          {
            user: {
              email: email,
              name: name,
              password: password,
            },
            profile: {
              role: "owner",
              phone_no: phone_no,
            },
            opentimings: opentimings,
            closetimings: closetimings,
            location: location,
            // speciallsation: "strength"÷s,
            sports_center: { center_name: sports_center },
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          // setMessage(res.data.message);
          swal("Sports Owner Added Successfully.", "", "success", {
            button: "OK",
          }).then(d=>{
            navigate("/sportscenterowner/");
          });
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
          swal("Something went wrong!", "", "error", {
            button: "OK",
          });
        });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone_no: '',
      sports_center: '',
      location: '',
      opentimings: '',
      closetimings: '',
      password: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });
  console.log(formik,closetimings,opentimings,'opentimings-==');
  const classes = useStyles();
  return (
    <AppLayout style={{ marginBottom: "50px" }}>
      <Container>
        <h3 style={{ padding: "10px" }}>Add Sports Center Owner</h3>
        <Paper elevation={3}>
          <div
            className={classes.root}
            style={{ padding: "20px", marginBottom: "80px" }}
          >
            <form noValidate onSubmit={formik.handleSubmit}>
              {/* <form method="POST" noValidate onSubmit={} >  */}
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
                    Owner Name
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
                    onKeyUp={handlenameChange}
                    onChange={formik.handleChange}
                    autoComplete="name"
                    variant="outlined"
                    type="text"
                    // value={values.name}
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
                    onKeyUp={handleEmailChange}
                    onChange={formik.handleChange}
                    type="email"
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
                    Phone No
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
                    onKeyUp={handleContactChange}
                    onChange={formik.handleChange}
                    name="phone_no"
                    variant="outlined"
                    type="tel"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item sm={12} md={4}>
                  <InputLabel
                    id="sports_center"
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
                    id="sport_center"
                    inputProps={{ maxLength: 50 }}
                    error={Boolean(
                      formik.touched.sports_center &&
                        formik.errors.sports_center
                    )}
                    margin="normal"
                    fullWidth
                    helperText={
                      formik.touched.sports_center &&
                      formik.errors.sports_center
                    }
                    name="sports_center"
                    onBlur={formik.handleBlur}
                    onKeyUp={handlesportcenterChange}
                    onChange={formik.handleChange}
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
                    onKeyUp={handlelocationChange}
                    onChange={formik.handleChange}
                    name="location"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
                <Grid item sm={12} md={2}>
                  <InputLabel
                    className="Input"
                    style={{
                      color: "rgba(12,11,69,255)",
                      display: "flex",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    Opening Time
                  </InputLabel>
                  {/* <Datepicker
                    controls={["time"]}
                    select="range"
                    display="inline"
                    touchUi={true}
                  /> */}
                  
                  <TextField
                    error={Boolean(
                      formik.touched.opentimings && formik.errors.opentimings
                    )}
                    helperText={
                      formik.touched.opentimings && formik.errors.opentimings
                    }
                    margin="normal"
                    type="time"
                    variant="outlined"
                    fullWidth
                    onBlur={formik.handleBlur}
                    onKeyUp={handleopentimingsChange}
                    onChange={(e)=>{formik.handleChange(e);handleopentimingsChange(e)}}
                    id="opentimings"
                    name="opentimings"
                    defaultValue={closetimings}
                    min="00:00"
                    max="12:00"
                    required
                  ></TextField>
                </Grid>

                <Grid item sm={12} md={2}>
                  <InputLabel
                    className="Input"
                    style={{
                      color: "rgba(12,11,69,255)",
                      display: "flex",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    Closing Time
                  </InputLabel>
                  <TextField
                    error={Boolean(
                      formik.touched.closetimings && formik.errors.closetimings
                    )}
                    helperText={
                      formik.touched.closetimings && formik.errors.closetimings
                    }
                    type="time"
                    format="12-hour"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    onBlur={formik.handleBlur}
                    onChange={(e)=>{formik.handleChange(e);handlefirstnameChange(e)}}
                    onKeyUp={handlefirstnameChange}
                    id="closetimings"
                    name="closetimings"
                    min={opentimings}
                    defaultValue={closetimings}
                    max="23:59"
                    required
                  ></TextField>
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
                  />
                </Grid>
                {/* <Grid item sm={12} md={4}> */}
                {/* <InputLabel
                    className="Input"
                    style={{
                      color: "rgba(12,11,69,255)",
                      display: "flex",
                      fontSize: "15px",
                      fontWeight: "bold",
                      paddingBottom: "15px",
                    }}
                  >
                    Logo:
                  </InputLabel>
                  <div
                    style={{
                      height: "100px",
                      padding: "45px",
                      border: "1px solid ",
                      borderStyle: "dotted",
                      textAlign: "center",
                    }}
                  >
                    <MdFileUpload style={{ fontSize: "40px" }} />
                    <p style={{marginTop:"5px"}}>Upload Sports Logo</p>  */}

                {/* <Button
                                                    variant="contained"
                                                    component="label"
                                                    style={{
                                                        backgroundColor: "#232b58", textTransform: "capitalize", color: "white",
                                                        borderRadius: "25px", width: "156px",padding: "8px"
                                                    }}
                                                >
                                                    Browse File
                              
                                                   dropzoneText={"Upload Sports Logo"}
                                                </Button> */}

                {/* <DropzoneArea
                      acceptedFiles={["image/*"]}
                      filesLimit={3}
                      maxFileSize={1048576} //1 MB
                      showFileNames={true}
                      onChange={onDropzoneAreaChange}
                      dropzoneText={"Upload Sports Logo"}
                    /> */}
                {/* </div>
                </Grid>
                <Grid item sm={12} md={4}>
                  <InputLabel
                    className="Input"
                    style={{
                      color: "rgba(12,11,69,255)",
                      display: "flex",
                      fontSize: "15px",
                      fontWeight: "bold",
                      paddingBottom: "15px",
                    }}
                  >
                    Supporting Documents:
                  </InputLabel>
                  <div
                        style={{
                          height: "100px",
                          padding: "45px",
                          border: "1px solid ",
                          borderStyle: "dotted",
                          textAlign: "center",
                        }}
                      >
                        <MdFileUpload style={{ fontSize: "40px" }} />
                        <p style={{ marginTop: "5px" }}>
                          Upload Supporting Documents
                        </p> 
                        </div>
                    */}

                {/* <Button
                                                    variant="contained"
                                                    component="label"
                                                    style={{
                                                        backgroundColor: "#232b58", textTransform: "capitalize", color: "#fff",
                                                        borderRadius: "25px", width: "156px", padding: "8px"
                                                    }}
                                                >
                                                    Browse File
                                                    <input
                                                        type="file"
                                                        hidden
                                                    />
                                                </Button> */}
                {/* </div> */}
                {/* <DropzoneArea
                    acceptedFiles={["image/*"]}
                    filesLimit={3}
                    maxFileSize={1048576} //1 MB
                    showFileNames={true}
                    onChange={DropzoneAreaChange}
                    dropzoneText={"Upload Supporting Documents"}
                  /> */}

                {/* </Grid> */}
                <Grid item sm={12} md={12}>
                  <div style={{ textAlign: "center", marginTop: "100px" }}>
                    <Button
                      variant="contained"
                      // disabled={isSubmitting}
                      type="submit"
                      style={{
                        backgroundColor: "#232b58",
                        color: "#fff",
                        borderRadius: "25px",
                        width: "290Px",
                        padding: "13px",
                        fontSize: "17px",
                      }}
                      onClick={(e) => onSubmit(e)}
                    >
                      ADD SPORTS CENTER OWNER
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
export default Addnew;
