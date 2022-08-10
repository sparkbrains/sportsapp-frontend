import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { MdFileUpload } from 'react-icons/md';
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
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
    .max(25, "Must be 25 characters or less.")
    .required("Owner name is required.")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
  email: yup.string().email("Email is invalid.").required("Email is required."),
  phone_no: yup
    .string()
    .required("Phone number is required.")
    .min(10, "Please enter your 10 digit Mobile Number.")
    .max(15, "Please enter your 10 digit Mobile Number.")
    .matches(phoneRegExp, "Phone number is only number type."),
  location: yup.string().required("Location is required."),

 
});

 const Addnew = () => {

let history = useHistory();
  const [document, setdocument] = useState();
  const [error, seterror] = useState();
  const [closetimings, setclosetimings] = useState();
  const [opentimings, setopentimings] = useState();

  const [name, setownername] = useState();
  const handlenameChange = (e) => {
    setownername(e.target.value);
  };
  const [password, setPassword] = useState();
  const handlepasswordonChange = (e) => {
    setPassword(e.target.value);
  };
  const [email, setemail] = useState();
  const handleEmailChange = (e) => {
    setemail(e.target.value);
  };

  const [phone_no, setphoneno] = useState();
  const handleContactChange = (e) => {
    setphoneno(e.target.value);
  };

  const [sports_center, setsportcenter] = useState();
  const handlesportcenterChange = (e) => {
    setsportcenter(e.target.value);
  };
  const [location, setlocation] = useState();
  const handlelocationChange = (e) => {
    setlocation(e.target.value);
  };

  const handleopentimingsChange = (e) => {
    setopentimings(e.target.value);
  };
 
  const handlefirstnameChange = (e) => {
    setclosetimings(e.target.value);
  };

  const baseURL = process.env.REACT_APP_API_ENDPOINT;


  const token = localStorage.getItem('token');
  const onSubmit = async (e) => {
    const res = await axios.post(baseURL+"sports/owner/",
    { 
      "user":{
        email:email,
        name:name,
        password:password
      },
      "profile":{
        "role":"owner",
        phone_no:phone_no,
      },
      opentimings:opentimings,
      closetimings:closetimings,
      location:location,
      "speciallsation": "strength",
      sports_center:sports_center
      },
      { "headers": {"Authorization" : `Bearer ${token}`} }
      
      )
      .then((res) => {
        // setMessage(res.data.message);
        console.log(res, "ssssssankul");
        swal("Owner Created Successfully.", "", "success", {
          button: "OK",
        });
        history.push("/superadmin/");
      })
    
      .catch((error) => {
        if (error.response) {
         
          // Request made and server responded
          seterror(error?.response?.data?.error)
          console.log(error.response.data.error, "hellp1234567890");
          console.log(error.response.status);
          console.log(error.response.gender, "hellp");
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
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
      sportcenter: "",
      location: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });
  useEffect(() => {
    //
  }, []);
  const classes = useStyles();

  useEffect(() => {
    //document.title = "Add New";
  });
  return (
    <div style={{ marginBottom: "50px" }}>
      <Container>
        <h3 style={{ padding: "10px" }}>Add Sport Center Owners</h3>
        <Paper elevation={3}>
          <div
            className={classes.root}
            style={{ padding: "20px", marginBottom: "80px" }}
          >
            <form method="POST" noValidate onSubmit={formik.handleSubmit}>
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
                    Owner Name:
                  </InputLabel>
                  <TextField
                    inputProps={{ maxLength: 50 }}
                    error={Boolean(
                      formik.touched.name && formik.errors.ownername
                    )}
                    margin="normal"
                    required
                    fullWidth
                    helperText={
                      formik.touched.name && formik.errors.name
                    }
                    name="name"
                    onBlur={formik.handleBlur}
                    onKeyUp={handlenameChange}
                    onChange={formik.handleChange}
                    autoComplete="name"
                    variant="outlined"
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
                    onKeyUp={handleEmailChange}
                    onChange={formik.handleChange}
                    type="email"
                    variant="outlined"
                  />
                  <p style={{color:"red",margin:"0px"}}>{error}</p> 
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
                    helperText={formik.touched.phone_no && formik.errors.phone_no}
                    onBlur={formik.handleBlur}
                    onKeyUp={handleContactChange}
                    onChange={formik.handleChange}
                    name="phone_no"
                    autoComplete="number"
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
                    Sport Center:
                  </InputLabel>
                  <TextField
                    inputProps={{ maxLength: 50 }}
                    // error={Boolean(
                    //   formik.touched.sports_center && formik.errors.sports_center
                    // )}
                    margin="normal"
                    fullWidth
                    // helperText={
                    //   formik.touched.sports_center && formik.errors.sports_center
                    // }
                    name="sports_center"
                    // onBlur={formik.handleBlur}
                    onKeyUp={handlesportcenterChange}
                    onChange={formik.handleChange}
                    autoComplete="sports_center"
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
                    onKeyUp={handlelocationChange}
                    onChange={formik.handleChange}
                    name="location"
                    autoComplete=""
                    variant="outlined"
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
                    Open Timings:
                  </InputLabel>
                  <TextField
                  margin="normal"
                    type="time"
                    variant="outlined"
                    fullWidth
                    onChange={handleopentimingsChange}
                    id="closetimings"
                    name="closetimings"
                    min="09:00"
                    max="18:00"
                    defaultValue="09:00"
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
                    Close Timings:
                  </InputLabel>
                  <TextField
                    type="time"
                    time="12-hour"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    onChange={handlefirstnameChange}
                    id="closetimings"
                    name="closetimings"
                    min="00:00"
                    defaultValue="10:00"
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
                    <p style={{marginTop:"5px"}}>Upload Sports Logo</p> 

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
                  </div>
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
                 
                </Grid>
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
                    >
                      ADD SPORT CENTER OWNER
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
export default Addnew;
