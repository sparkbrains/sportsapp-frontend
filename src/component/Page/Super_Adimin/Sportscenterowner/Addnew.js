import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import { Button, FormHelperText } from "@material-ui/core";
import { useEffect } from "react";
import { MdFileUpload } from "react-icons/md";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router";
import swal from "sweetalert2";
import AppLayout from "../../../../layout/appLayout";
import CircularProgress from "@mui/material/CircularProgress";
import { AccountCircle } from "@mui/icons-material";
import CameraAlt from "@mui/icons-material/CameraAlt";
import AttachFileIcon from "@mui/icons-material/AttachFile";

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
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

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
  center_name: yup
    .string()
    .max(25, "Must be 25 characters or less.")
    .required("Sports center is required.")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
  password: yup
    .string()
    .matches(
      PASSWORD_REGEX,
      " Password must have at least 8 characters and the combination of the following: uppercase letter, lowercase letter, numbers, and symbols."
    )
    .required("Password is required."),
  opentimings: yup.string().required("Time is required."),
  closetimings: yup.string().required("Time is required."),
  // logo:  yup.string().required("Required."),
  // document: yup.string().required("Required."),

});

const Addnew = () => {
  let navigate = useNavigate();
  const [document, setdocument] = useState();
  const [error, seterror] = useState();
  const [closetimings, setclosetimings] = useState(null);
  const [opentimings, setopentimings] = useState(null);

  const [state, setState] = useState({
    name: "",
    email: "",
    phone_no: "",
    center_name: "",
    location: "",
    opentimings: "",
    closetimings: "",
    password: "",
    logo: [],
    document: [],
  });

      const formData = new FormData();


  const [name, setownername] = useState("");
  const handlenameChange = (e) => {
    setownername(e.target.value);
    setState({
      ...state,
      name : e.target.value
    })
  };
  const [password, setPassword] = useState("");
  const handlepasswordonChange = (e) => {
    setPassword(e.target.value);
    setState({
      ...state,
      password : e.target.value
    })
  };
  const [email, setemail] = useState("");
  const handleEmailChange = (e) => {
    setemail(e.target.value);
    setState({
      ...state,
      email : e.target.value
    })
  };

  const [phone_no, setphoneno] = useState("");
  const handleContactChange = (e) => {
    setphoneno(e.target.value);
    setState({
      ...state,
      phone_no : e.target.value
    })
  };

  const [center_name, setsportcenter] = useState("");
  const handlesportcenterChange = (e) => {
    setsportcenter(e.target.value);
    setState({
      ...state,
      center_name : e.target.value
    })
  };
  const [location, setlocation] = useState("");
  const handlelocationChange = (e) => {
    setlocation(e.target.value);
    setState({
      ...state,
      location : e.target.value
    })
  };

  const onimageListChange = (e) => {
    setState({
      ...state,
      logo: e.target.files[0],
    });
  };

  const onFileListChange = (e) => {
    setState({
      ...state,
      document: e.target.files[0],
    });
  };


  const handleopentimingsChange = (e) => {
    setopentimings(e.target.value);
    setState({
      ...state,
      opentimings : e.target.value
    })
  };

  const handlefirstnameChange = (e) => {
    // console.log(e.target.value, opentimings, "testttt");
    // closeDeci = timeStringToFloat(e.target.value);
    // if (closeDeci - minTime >= 0) {
    //   setclosetimings(e.target.value);
    // } else {
    //   setclosetimings("");
    //   swal.fire({
    //     confirmButtonColor: "#232B58",
    //     // title: 'Error!',
    //     text: "Wrong Time Selected!!",
    //     icon: "error",
    //     confirmButtonText: "OK",
    //   });

    setclosetimings(e.target.value);
    setState({
      ...state,
      closetimings : e.target.value
    })
    }
    //  const bool =  moment(e.target.value).isAfter(opentimings) ? setclosetimings(e.target.value) : "00:00";

    // (e.target.value) >= opentimings ? " " : setclosetimings(e.target.value);
  

  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  const onSubmit = async (e) => {
    if (formik.isValid) {
      console.log(state,"stateeee");
      setIsLoading(true);

      for (let param in state){
        formData.append(param, state[param]);
      }
      formData.append("role", "owner");
      await axios
        .post(
          baseURL + "sports/owner/", 
          formData,
          // { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          setIsLoading(false);

          swal
            .fire({
              confirmButtonColor: "#232B58",
              text: "Sports Owner Added Successfully.",
              icon: "success",
              confirmButtonText: "OK",
            })
            .then((d) => {
              navigate("/sportscenterowner/");
            });
        })

        .catch((error) => {
          setIsLoading(false);

          if (error.response) {
            seterror(error?.response?.data?.error);
            console.log(error.response.status);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }

          swal.fire({
            confirmButtonColor: "#232B58",
            text: "Something went wrong!!",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    }
  };

  const formik = useFormik({
    initialValues: state,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
    // removeValidValue: ["logo", "document"],
  });
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
            <form method="POST" noValidate onSubmit={formik.handleSubmit} autoComplete="off">
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
                    autoComplete="off"
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
                    inputProps={{ maxLength: 10 }}
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
                    autoComplete="off"
                    name="phone_no"
                    variant="outlined"
                    type="tel"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item sm={12} md={4}>
                  <InputLabel
                    id="center_name"
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
                      formik.touched.center_name &&
                        formik.errors.center_name
                    )}
                    margin="normal"
                    fullWidth
                    helperText={
                      formik.touched.center_name &&
                      formik.errors.center_name
                    }
                    name="center_name"
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
                    style={{cursor : "pointer"}}
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
                    onChange={(e) => {
                      formik.handleChange(e);
                      handleopentimingsChange(e);
                    }}
                    id="opentimings"
                    name="opentimings"
                    defaultValue="05:00"
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
                  style={{cursor : "pointer"}}
                    error={Boolean(
                      formik.touched.closetimings && formik.errors.closetimings
                    )}
                    helperText={
                      formik.touched.closetimings && formik.errors.closetimings
                    }
                    // InputProps={{ inputProps: { min: 0, max: 10 } }}
                    type="time"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    defaultValue="12:00"
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      formik.handleChange(e);
                      handlefirstnameChange(e);
                    }}
                    onKeyUp={handlefirstnameChange}
                    id="closetimings"
                    name="closetimings"
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
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    margin="normal"
                    required
                    fullWidth
                    location="password"
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
                      backgroundColor: "#E8F0FE",
                    }}
                  >
                    <div className="profile-image">
                      <label htmlFor="fileProfile">
                        {/* {imageViewUrl ? (
                          <img src={imageViewUrl ? imageViewUrl : ""} />
                        ) : (
                        )} */}
                        <AccountCircle className="profile-dummy-ico" />
                        <button type="button" className="chooseFileButton " style={{cursor : "pointer"}}>
                          <CameraAlt />
                          <input
                            type="file"
                            id="fileProfile"
                            name="fileProfile"
                            // multiple=""
                            accept="image/*"
                            onChange={onimageListChange}
                            onBlur={formik.handleBlur}
                          ></input>
                        </button>
                      </label>
                    </div>
                  </div>
                  <em>(Only *.jpeg and *.png images will be accepted)</em>
                  {/* {formik.touched.logo &&
                        formik.errors.logo && (
                        <FormHelperText className="Mui-error">
                          {formik.errors.logo}
                        </FormHelperText>
                      )} */}
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
                      backgroundColor: "#E8F0FE",
                    }}
                  >
                    <div className="profile-Documents"  >
                      <label htmlFor="fileDocs">
                        {/* {fileViewUrl ? (
                          <img src={fileViewUrl ? fileViewUrl : ""} />
                          ) : (
                            
                          )} */}
                        <AttachFileIcon className="profile-dummy-ico" />
                        <button type="button"  className="chooseFileButton2 " style={{cursor : "pointer"}}>
                          <CameraAlt />
                          <input
                            type="file"
                            id="fileDocs"
                            name="fileDocs"
                            // multiple=""
                            accept="file_extension/*"
                            onChange={onFileListChange}
                          ></input>
                        </button>
                      </label>
                    </div>
                  </div>

                  <em>(Only *.pdf and *.docx, *.ods files will be accepted)</em>
                  {/* {formik.touched.document &&
                        formik.errors.document && (
                        <FormHelperText className="Mui-error">
                          {formik.errors.document}
                        </FormHelperText>
                      )} */}
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
                      // onClick={(e) => onSubmit(e)}
                      className="btn-submit"
                    >
                      {isLoading === true ? <CircularProgress Shrink /> : ""}
                      Submit
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

{
  /* <p style={{ marginTop: "5px" }}>Upload Sports Logo</p> */
}
{
  /* <DropzoneArea
acceptedFiles={["image/*"]}
filesLimit={3}
maxFileSize={1048576} //1 MB
  showFileNames={true}
  onChange={(e) => handleImage(e)}
  dropzoneText={"Upload Sports Logo"}
  style={{
    color: "rgba(12,11,69,255)",
    display: "flex",
    fontSize: "15px",
    fontWeight: "bold",
    paddingBottom: "15px",
  }}
></DropzoneArea> */
}
{
  /* <MdFileUpload style={{ fontSize: "40px" }} /> */
}

{
  /* <Button
variant="contained"
component="label"
style={{
  backgroundColor: "#232b58",
  textTransform: "capitalize",
  color: "white",
  borderRadius: "25px",
  width: "156px",
  padding: "8px",
}}
>
Browse File
</Button> */
}

{
  /* </div> */
}

{
  /* <Button
                    variant="contained"
                    component="label"
                    style={{
                      backgroundColor: "#232b58",
                      textTransform: "capitalize",
                      color: "#fff",
                      borderRadius: "25px",
                      width: "156px",
                      padding: "8px",
                    }}
                  >
                    Browse File
                    <input type="file" hidden />
                  </Button> */
}
{
  /* </div> */
}
{
  /* <p style={{ marginTop: "5px" }}>
                      Supporting Documents
                    </p> */
}

{
  /* <MdFileUpload style={{ fontSize: "40px" }} /> */
}
{
  /* <DropzoneArea
                    acceptedFiles={["/*"]}
                    filesLimit={3}
                    maxFileSize={5048576} //5 MB
                    showFileNames={true}
                    onChange={(e) => handleDocuments(e)}
                    dropzoneText={"Upload Documents"}
                  ></DropzoneArea> */
}
