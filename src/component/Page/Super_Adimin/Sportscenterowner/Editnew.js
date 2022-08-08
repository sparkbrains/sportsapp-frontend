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
  ownername: yup
    .string()
    .max(25, "Must be 25 characters or less.")
    .required("Owner name is required.")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
  email: yup.string().email("Email is invalid.").required("Email is required."),
  phoneno: yup
    .string()
    .required("Phone number is required.")
    .min(10, "Please enter your 10 digit Mobile Number.")
    .max(12, "Please enter your 10 digit Mobile Number.")
    .matches(phoneRegExp, "Phone number is only number type."),
  location: yup.string().required("Location is required."),

  sportcenter: yup
    .string()
    .required("Sport Center  is required.")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
  //   opentimings: yup.string().required("Open timings  is required."),
  //   closetimings: yup.string().required("Close timings  is required."),
});

const Editnew = () => {
  const { id } = useParams();
  let history = useHistory();
  const [message, setMessage] = useState(null);
  const [closetimings, setclosetimings] = useState();
  const [opentimings, setopentimings] = useState();
  const [mes, setMes] = useState(null);

  const handleopentimingsChange = (e) => {
    setopentimings(e.target.value);
  };

  const handlefirstnameChange = (e) => {
    setclosetimings(e.target.value);
  };
  const baseURL = process.env.REACT_APP_API_ENDPOINT;

  const [editnew, setEditnew] = useState({
    ownername: "",
    email: "",
    opentimings: "",
    closetimings: "",
    phoneno: "",
    sportcenter: "",
    location: "",
  });
  console.log(editnew.opentimings, "editnew111112222");
  const onInputChange = (e) => {
    setEditnew({ ...editnew, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    document.title = "Edit New";
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    // e.preventDefault();
    await axios
      .put(baseURL+`sports/owner/${id}/`,
        editnew,
        closetimings,
        opentimings
      )
      .then((res) => {
        setMessage(res.data.message);
        console.log(res, "ssssssankul");
        swal("Owner Edit Successfully.", "", "success", {
          button: "ok",
        });
      })
      // .catch((err) => { });
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data.message);
          setMes(error.response.data.gender);
          // Request made and server responded
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
          button: "ok",
        });
      });
    history.push("/superadmin/");
  };

  const loadUser = async () => {
    const result = await axios.get(baseURL+`sports/owner/${id}/`
    );
    setEditnew(result.data);

    console.log(editnew, "helloeditnew");
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

  const formik = useFormik({
    initialValues: {
      ownername: "",
      email: "",
      phoneno: "",
      sportcenter: "",
      location: "",
      //   opentimings: "",
      //   closetimings: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  const classes = useStyles();
  return (
    <div style={{ marginBottom: "80px" }}>
      {/* <SportsCenterOwners /> */}
      <Container>
        <h3 style={{ padding: "10px" }}>Edit Sport Center Owners</h3>
        <Paper elevation={3}>
          <div className={classes.root} style={{ padding: "20px" }}>
            <form method="POST" noValidate onSubmit={formik.handleSubmit}>
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
                    Owner Name:
                  </InputLabel>
                  <TextField
                    error={Boolean(
                      formik.touched.ownername && formik.errors.ownername
                    )}
                    margin="normal"
                    required
                    fullWidth
                    helperText={
                      formik.touched.ownername && formik.errors.ownername
                    }
                    name="ownername"
                    onBlur={formik.handleBlur}
                    onChange={(e) => onInputChange(e)}
                    onClick={formik.handleChange}
                    autoComplete="ownername"
                    variant="outlined"
                    value={editnew.ownername}
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
                    Email:
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
                    // type="email"
                    value={editnew.email}
                    variant="outlined"
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
                    Phone No:
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
                    value={editnew.phoneno}
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
                    Sport Center:
                  </InputLabel>
                  <TextField
                    error={Boolean(
                      formik.touched.sportcenter && formik.errors.sportcenter
                    )}
                    margin="normal"
                    fullWidth
                    helperText={
                      formik.touched.sportcenter && formik.errors.sportcenter
                    }
                    name="sportcenter"
                    onBlur={formik.handleBlur}
                    onChange={(e) => onInputChange(e)}
                    onClick={formik.handleChange}
                    autoComplete="sportcenter"
                    variant="outlined"
                    value={editnew.sportcenter}
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
                    Location:
                  </InputLabel>
                  <TextField
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
                    onChange={(e) => onInputChange(e)}
                    onClick={formik.handleChange}
                    name="location"
                    autoComplete=""
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
                    Open Timings:
                  </InputLabel>
                  <TextField
                    margin="normal"
                    type="time"
                    variant="outlined"
                    fullWidth
                    onKeyUp={handleopentimingsChange}
                    id="opentimings"
                    name="opentimings"
                    min="09:00"
                    max="10:59"
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
                    Close Timings:
                  </InputLabel>
                  <TextField
                    type="time"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    onKeyUp={handlefirstnameChange}
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
                <Grid item xs={12} sm={4}>
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
                    <p style={{ marginTop: "5px" }}>Upload Sports Logo</p>

                    {/* <Button
                                                    variant="contained"
                                                    component="label"
                                                    style={{
                                                        backgroundColor: "#232b58", textTransform: "capitalize", color: "white",
                                                        borderRadius: "25px", width: "156px",padding: "8px"
                                                    }}
                                                >
                                                    Browse File
                                                    <input
                                                        type="file"
                                                        hidden
                                                    />
                                                </Button> */}
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
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
                  </div>
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
                    >
                      SAVE
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
export default Editnew;
