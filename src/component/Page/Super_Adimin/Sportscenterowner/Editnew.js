import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import { MdFileUpload } from "react-icons/md";
import { useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import swal from "sweetalert2";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
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

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const emailRegx = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

const validationSchema = yup.object({
  name: yup
    .string()
    .max(25, "Must be 25 characters or less.")
    .required("Owner name is required.")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
  email: yup
    .string()
    .email("Email is invalid.")
    .required("Email is required.")
    .matches(emailRegx, "Invalid Email ID..."),
  phone_no: yup
    .string()
    .required("Phone number is required.")
    .min(10, "Phone number should not be less than 10 digits.")
    .max(10, "Phone number should not be more than 10 digits.")
    .matches(phoneRegExp, "Phone number must contains only number."),
  location: yup
    .string()
    .max(50, "Must be 50 characters or less.")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required.")
    .required("Location is required."),
  center_name: yup
    .string()
    .required("Sport Center  is required.")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
  opentimings: yup.string().required("Open timings  is required."),
  closetimings: yup.string().required("Close timings  is required."),
});

const Editnew = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [closetimings, setclosetimings] = useState();
  const [opentimings, setopentimings] = useState();
  const [mes, setMes] = useState(null);
  const formData = new FormData();


  const handleopentimingsChange = (e) => {
    setopentimings(e.target.value);
    setEditnew({
      ...editnew,
      opentimings : e.target.value
    })
  };

  const handleCloseChange = (e) => {
    setclosetimings(e.target.value);
    setEditnew({
      ...editnew,
      closetimings : e.target.value
    })
  };
  const baseURL = process.env.REACT_APP_API_ENDPOINT;

  const [editnew, setEditnew] = useState({
    name: "",
    email: "",
    opentimings: "",
    closetimings: "",
    phone_no: "",
    center_name: "",
    location: "",
    password : "",
    logo : [],
    document : []
  });
  const onInputChange = (e) => {
    setEditnew({ ...editnew, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    document.title = "Edit New";
    loadUser();
    handleSports();
  }, []);
  const [isLoading, setIsLoading] = useState(false);

  const onimageListChange = (e) => {
    //   var image = e.target.files[0];
    //   console.log(e, "filesssss");
    //   var readImg = new FileReader();
    //   readImg.onload = function (event) {
    //     setimageViewUrl(e.target.files[0]);
    //     // setUploadSate({
    //     //   ...uploadState,
    //     //   logo: event.target.result,
    //     // });
    //   };
    // formData.append("document", uploadState?.document);

    //   readImg.readAsDataURL(image);
    // setFileViewUrl(e.target.files[0]);
    // formData.append('logo', e.target.files[0])
    setEditnew({
      ...editnew,
      logo: e.target.files[0],
    });
  };

  const onFileListChange = (e) => {
    // var file = e.target.files[0];
    // var readFile = new FileReader();

    // readFile.onload = function (event) {
    // setUploadSate({
    //   ...uploadState,

    // });

    // formData.append("file", e.target.files[0]);
    // };
    // readFile.readAsDataURL(file);
    // setFileViewUrl(e.target.files[0]);
    // formData.append('documents', e.target.files[0])
    setEditnew({
      ...editnew,
      document: e.target.files[0],
    });
  };

  const onSubmit = async (e) => {
    // e.preventDefault();
    console.log(editnew,"formmmm");
    if (formik.isValid) {
      setIsLoading(true);

      for (let param in editnew){
        formData.append(param, editnew[param]);
      }
      // formData.append("id",editnew.sports_id);
      await axios
        .patch(baseURL + `sports/owner/?id=${id}`,

          formData,
          // profile: {
          //   role: "owner",
          //   phone_no: editnew.phone_no,
          // },
          // opentimings: editnew.opentimings,
          // closetimings: editnew.closetimings,
          // location: editnew.location,
          // sports_center: {
          //   center_name: editnew.sports_center,
          // },
          // user: {
          //   email: editnew.email,
          //   name: editnew.name,
          //   password: editnew.password,
          // },
        )
        .then((res) => {
          setIsLoading(false);

          setMessage(res.data.message);
          swal
            .fire({
              // title: 'Error!',
              confirmButtonColor: "#232B58",
              text: "Sports Owner Edited Successfully.",
              icon: "success",
              confirmButtonText: "OK",
            })
            .then((d) => {
              navigate("/sportscenterowner/");
            });
        })
        .catch((error) => {
          setIsLoading(false);

          swal.fire({
            confirmButtonColor: "#232B58",
            // title: 'Error!',
            text: "Something went wrong!!",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    }
  };

  const loadUser = async (e) => {
    const result = await axios.get(baseURL + `sports/owner/?id=${id}`);
    // console.log(result.data, "aaaaaa");
    setEditnew({
      name: result.data?.user?.name,
      email: result.data?.user?.email,
      opentimings: result.data?.opentimings,
      closetimings: result.data?.closetimings,
      phone_no: result.data?.profile?.phone_no,
      center_name: result.data?.sports_center.center_name,
      sports_id : result.data?.sports_center.id,
      location: result.data?.location,
    });
  };

  const onChange = (event, item) => {
    setEditnew((prev) => {
      return { ...prev, opentimings: event.target.value };
    });
  };

  const Change = (event, item) => {
    setEditnew((prev) => {
      return { ...prev, closetimings: event.target.value };
    });
  };

  const [sports, setSports] = useState([]);
  const handleSports = async (e) => {
    const resp = await axios.get(
      baseURL + "sports/sports-center/sports-center-owner/"
    );
    // setSportsCenter(resp.data);
    setSports(resp.data);
    // console.log(resp.data, "sports====");
  };

  const formik = useFormik({
    initialValues: editnew,
    validateOnBlur: true,
    enableReinitialize: true,
    validateOnChange: true,
    onSubmit,
    validationSchema: validationSchema,
  });
  // console.log(formik, editnew, "testtt");
  const classes = useStyles();
  return (
    <AppLayout style={{ marginBottom: "80px" }}>
      {/* <SportsCenterOwners /> */}
      <Container>
        <h3 style={{ padding: "10px" }}>Edit Sports Center Owner</h3>
        <Paper elevation={3}>
          <div className={classes.root} style={{ padding: "20px" }}>
              
            <form method="POST" noValidate onSubmit={formik.handleSubmit}  autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
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
                    error={Boolean(formik.touched.name && formik.errors.name)}
                    margin="normal"
                    required
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={(e) => onInputChange(e)}
                    onClick={formik.handleChange}
                    autoComplete=""
                    variant="outlined"
                    value={editnew.name}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
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
                    onKeyUp={formik.handleChange}
                    value={editnew?.email}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
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
                    error={Boolean(
                      formik.touched.phone_no && formik.errors.phone_no
                    )}
                    helperText={
                      formik.touched.phone_no && formik.errors.phone_no
                    }
                    margin="normal"
                    type="tel"
                    required
                    fullWidth
                    onBlur={formik.handleBlur}
                    onChange={(e) => onInputChange(e)}
                    onKeyUp={formik.handleChange}
                    name="phone_no"
                    variant="outlined"
                    value={editnew?.phone_no}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <InputLabel
                    className="Input"
                    style={{
                      color: "rgba(12,11,69,255)",
                      display: "flex",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    Sport Center
                  </InputLabel>
                  <TextField
                    disabled
                    error={Boolean(
                      formik.touched.center_name &&
                        formik.errors.center_name
                    )}
                    helperText={
                      formik.touched.center_name &&
                      formik.errors.center_name
                    }
                    margin="normal"
                    fullWidth
                    style={{
                      marginTop: "16px",
                    }}
                    onBlur={formik.handleBlur}
                    onKeyUp={formik.handleChange}
                    type="text"
                    name="center_name"
                    onChange={(e) => onInputChange(e)}
                    variant="outlined"
                    value={editnew.center_name}
                  />
                  {/* <MenuItem disabled value="">
                      <em>Select Sport Center</em>
                    </MenuItem>
                  {sports?.map((val) => {
                      const { id, center_name } = val;
                      return (
                        <MenuItem value={id} key={id}>
                          {center_name}
                        </MenuItem>
                      );
                    })}
                    </Select> */}
                </Grid>
                <Grid item xs={12} sm={4}>
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
                    type="text"
                    margin="normal"
                    required
                    fullWidth
                    helperText={
                      formik.touched.location && formik.errors.location
                    }
                    onBlur={formik.handleBlur}
                    onChange={(e) => onInputChange(e)}
                    onClick={formik.handleChange}
                    name="location"
                    variant="outlined"
                    value={editnew.location}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
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
                    onKeyUp={handleopentimingsChange}
                    id="opentimings"
                    name="opentimings"
                    min="00:00"
                    max="11:59"
                    value={editnew.opentimings}
                    onChange={onChange}
                    required
                  ></TextField>
                </Grid>

                <Grid item xs={12} sm={2}>
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
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    onKeyUp={handleCloseChange}
                    id="closetimings"
                    name="closetimings"
                    min="10:50"
                    value={editnew.closetimings}
                    max="23:59"
                    required
                    onChange={Change}
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
                        <button type="button" className="chooseFileButton ">
                          <CameraAlt />
                          <input
                            type="file"
                            id="fileProfile"
                            name="fileProfile"
                            // multiple=""
                            accept="image/*"
                            onChange={onimageListChange}
                          ></input>
                        </button>
                      </label>
                    </div>
                  </div>
                  <em>(Only *.jpeg and *.png images will be accepted)</em>
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
                    <div className="profile-Documents">
                      <label htmlFor="fileDocs">
                        {/* {fileViewUrl ? (
                          <img src={fileViewUrl ? fileViewUrl : ""} />
                          ) : (
                            
                          )} */}
                        <AttachFileIcon className="profile-dummy-ico" />
                        <button type="button" className="chooseFileButton2 ">
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
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div style={{ textAlign: "center", marginTop: "100px" }}>
                    <Button
                      variant="contained"
                      // disabled={isSubmitting}
                      type="submit"
                      style={{
                        backgroundColor: "#232b58",
                        color: "#fff",
                        borderRadius: "25px",
                        width: "200Px",
                        padding: "13px",
                      }}
                      // onClick={(e) => {
                      //   onSubmit(e);
                      // }}
                  className="btn-submit"

                    >
                      {isLoading === true ? <CircularProgress Shrink /> : ""}
                      SAVE
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
export default Editnew;
