import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import { useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import * as Yup from "yup";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import AppLayout from "../../../../layout/appLayout";

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


const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const emailRegx = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

const validationSchema = yup.object({
  name: Yup.string()
    .max(25, "Must be 25 characters or less")
    .required("Name is required.")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
  email: Yup.string()
    .email("Email is invalid.")
    .required("Email is required.")
    //   'email check',
    //   'email déjà utiliser',
    //   async (value) =>
    //     await fetch(baseURL + `sports/coach/`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-type': 'application/json'
    //       },
    //       body: JSON.stringify({ email: value })
    //     }).then((res) => res.json())
    // )
    .matches(emailRegx, "Invalid Email ID..."),
  phone_no: Yup.string()
    .min(10, "Phone number not less than 10 character.")
    .max(10, "Phone no not more than 10 character.")
    .required("Phone number is required.")
    .matches(phoneRegExp, "Only numbers are allowed."),
  location: Yup.string().required("Location is required."),
  sports_center: Yup.string().required("Sport center is required."),
  password: yup.string().required("Password is required."),
  speciallsation: yup.string().required("Specialization is required."),
  specialization: yup.string().required("Specialization is required."),
});
const AddCoach = () => {
  let navigate = useNavigate();
  const [speciallsation, setspecialisation] = useState("");
  const handlespecialisationonChange = (e) => {
    setspecialisation(e.target.value);
  };

  const onChangeSpecialization = (e) => {
    setspecialisation(e.target.value);
  };

  const [error, setError] = useState("");
  const [name, setname] = useState();
  const handlenameChange = (e) => {
    setname(e.target.value);
  };

  const [email, setemail] = useState();
  const handleEmailChange = (e) => {
    setemail(e.target.value);
  };
  const [contact, setcontact] = useState();
  const handleContactChange = (e) => {
    setcontact(e.target.value);
  };

  const [sportsCenter, setSportsCenter] = useState("");
  const handlesportcenterChange = (e) => {
    setSportsCenter(e.target.value);
  };

  const onChange = (e) => {
    setSportsCenter(e.target.value);
  };

  const [password, setPassword] = useState();
  const handlepasswordonChange = (e) => {
    setPassword(e.target.value);
  };
  const [location, setlocation] = useState();
  const handlelocationChange = (e) => {
    setlocation(e.target.value);
  };


  const token = localStorage.getItem("token");
  const onSubmit = async (e) => {
    if (formik.isValid) {
      axios
      .post(
        baseURL + "sports/coach/",
        {
          user: {
            email: email,
            name: name,
            password: password,
          },
          profile: {
            role: "coach",
            phone_no: contact,
          },
          name: name,
          location: location,
          speciallsation: speciallsation,
          sports_center: sportsCenter,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((f) => {
        swal("Coach Added Successfully.", "", "success", {
          button: "OK",
        });
        navigate("/coachmanagement");
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          setError(error?.response?.data?.error);
          console.log(error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        swal("Something went wrong!", "", error, {
          button: "OK",
        });
      });
  };
}

  const [sports, setSports] = useState([]);

  const handleSports = async (e) => {
    const resp = await axios.get(
      baseURL + "sports/sports-center/sports-center-owner/"
    );
    setSports(resp.data);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone_no: "",
      location: "",
      password: "",
      speciallsation: "",
      sports_center: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  useEffect(() => {
    document.title = "Add Coach";
    handleSports();
  }, []);

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <AppLayout>
      <Container>
        <h3 style={{ padding: "10px" }}>Add New Coach</h3>
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
                    onBlur={formik.handleBlur}
                    onKeyUp={handlenameChange}
                    onChange={formik.handleChange}
                    autoComplete="name"
                    variant="outlined"
                    label="Coach Name"
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
                    Phone Number
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
                    type="tel"
                    autoComplete="number"
                    variant="outlined"
                    label="Phone Number"
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
                    Sport Center
                  </InputLabel>
                  <Select
                    id="sports_center"
                    style={{
                      marginTop: "16px",
                    }}
                    error={Boolean(
                      formik.touched.sports_center &&
                        formik.errors.sports_center
                    )}
                    helperText={
                      formik.touched.sports_center &&
                      formik.errors.sports_center
                    }
                    inputProps={{ maxLength: 50 }}
                    margin="normal"
                    required
                    fullWidth
                    onBlur={formik.handleBlur}
                    onKeyUp={handlesportcenterChange}
                    onChange={onChange}
                    name="sports_center"
                    variant="outlined"
                    value={sportsCenter}
                    displayEmpty
                  >
                    <MenuItem disabled value="">
                      <em>--- Select Sport Center ---</em>
                    </MenuItem>
                    {sports?.map((val) => {
                      const { id, center_name } = val;
                      return (
                        <MenuItem value={id} key={id}>
                          {center_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
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
                    margin="normal"
                    required
                    fullWidth
                    location="location"
                    helperText={
                      formik.touched.location && formik.errors.location
                    }
                    onBlur={formik.handleBlur}
                    onKeyUp={handlelocationChange}
                    onChange={formik.handleChange}
                    name="location"
                    autoComplete="location"
                    variant="outlined"
                    label="Location"
                  />
                </Grid>
                <Grid item sm={12} md={4}>
                  <InputLabel
                    id="speciallsation"
                    className="Input"
                    style={{
                      color: "rgba(12,11,69,255)",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    Specialization
                  </InputLabel>
                  <Select
                    onBlur={formik.handleBlur}
                    fullWidth
                    variant="outlined"
                    onChange={onChangeSpecialization}
                    onKeyUp={handlespecialisationonChange}
                    onOpen={handleOpen}
                    value={speciallsation}
                    required
                    style={{ marginTop: "13px" }}
                    name="speciallsation"
                    helperText={
                      formik.touched.speciallsation &&
                      formik.errors.speciallsation
                    }
                    error={Boolean(
                      formik.touched.speciallsation &&
                        formik.errors.speciallsation
                    )}
                    displayEmpty
                  >
                    <MenuItem disabled value="">
                      <em>
                      --- Select Specialization ---
                      </em>
                    </MenuItem>
                    <MenuItem value="cardio">cardio</MenuItem>
                    <MenuItem value="strength">strength</MenuItem>
                    <MenuItem value="shooting">shooting</MenuItem>
                    <MenuItem value="wrestling">wrestling</MenuItem>
                    <MenuItem value="boxing">boxing</MenuItem>
                    <MenuItem value="tennis">tennis</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item sm={12} md={6}>
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
                      onClick={(e) => {
                        onSubmit(e);
                      }}
                      style={{
                        backgroundColor: "#232b58",
                        color: "#fff",
                        borderRadius: "25px",
                        width: "170Px",
                        padding: "13px",
                        fontSize: "17px",
                      }}
                    >
                      ADD COACH
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
export default AddCoach;
