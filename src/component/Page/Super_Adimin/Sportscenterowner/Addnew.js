import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useEffect } from "react";
import { MdFileUpload } from "react-icons/md";
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
/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

const emailRegx = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

const validationSchema = yup.object({
  name: yup
    .string()
    .max(25, "Must be 25 characters or less.")
    .required("Owner name is required.")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
  email: yup.string().email("Email is invalid.").required("Email is required.").matches(emailRegx, "Invalid Email ID..."),
  phone_no: yup
    .string()
    .required("Phone number is required.")
    .min(10, "Please enter your 10 digit Mobile Number.")
    .max(15, "Please enter your 10 digit Mobile Number.")
    .matches(phoneRegExp, "Phone number is only number type."),
  location: yup.string().required("Location is required."),
  password: yup.string().required("Password is required."),
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

  const token = localStorage.getItem("token");
  const onSubmit = async (e) => {
    console.log(sports_center,"sports");
    const res = await axios
      .post(
        baseURL + "sports/owner/",
        {
          profile: {
            role: "owner",
            phone_no: phone_no,
          },
          opentimings: opentimings,
          closetimings: closetimings,
          location: location,
          speciallsation: "strength",
          sport_center: {
            center_name : sports_center
          },
          user: {
            email: email,
            name: name,
            password: password,
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        // setMessage(res.data.message);
        swal("Owner Created Successfully.", "", "success", {
          button: "OK",
        });
        history.push("/superadmin/");
      })

      .catch((error) => {
        swal("Something went wrong!", "Oops...", "error", {
          button: "OK",
        });
      });
  };

  const [sports, setSports] = useState([]);
  const handleSports = async (e) => {
    const resp = await axios.get(
      baseURL + "sports/sports-center/sports-center-owner/"
    );
    // setSportsCenter(resp.data);
    setSports(resp.data);
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
    handleSports();
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
                    helperText={formik.touched.name && formik.errors.name}
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={handlenameChange}
                    autoComplete="name"
                    variant="outlined"
                    label="Owner Name"
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
                    onChange={handleEmailChange}
                    type="email"
                    variant="outlined"
                    label="Email"
                  />
                  <p style={{ color: "red", margin: "0px" }}>{error}</p>
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
                    helperText={
                      formik.touched.phone_no && formik.errors.phone_no
                    }
                    onBlur={formik.handleBlur}
                    onKeyUp={handleContactChange}
                    onChange={formik.handleChange}
                    name="phone_no"
                    autoComplete="number"
                    variant="outlined"
                    label="Phone No."
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
                    style={{
                      marginTop:"16px"
                    }}
                    inputProps={{ maxLength: 50 }}
                    margin="normal"
                    fullWidth
                    required
                    // name="sports_center"
                    onChange={handlesportcenterChange}
                    variant="outlined"
                    value={sports_center}
                    label="Sport Center"
                  />
                    {/* <MenuItem disabled value="">
                      <em>Select Sport Center</em>
                    </MenuItem>
                    {sports?.map((val) => {
                      const { id, center_name } = val;
                      return (
                        <MenuItem
                          value={id}
                          key={id}
                        >
                          {center_name}
                        </MenuItem>
                      );
                    })}
                  </Select> */}
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
                    label="Location"
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
                    label="Opening-Time"
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
                    label="Closing-Time"
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
                    autoComplete=""
                    variant="outlined"
                    label="Password"
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
                    <p style={{ marginTop: "5px" }}>Upload Sports Logo</p>
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
                </Grid>
                <Grid item sm={12} md={12}>
                  <div style={{ textAlign: "center", marginTop: "100px" }}>
                    <Button
                      variant="contained"
                      // disabled={isSubmitting}
                      type="submit"
                      onClick={(e) => onSubmit(e)}
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
