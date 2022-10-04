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
import { useHistory } from "react-router-dom";
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

const phoneRegExp = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

const emailRegx = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
const validationSchema = yup.object({
  name: Yup.string()
    .max(25, "Must be 25 characters or less")
    .required("Name is required.")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
  email: Yup.string()
    .email("Email is invalid.")
    .required("Email is required.")
    .matches(emailRegx, "Invalid Email ID..."),
  contact: Yup.string()
    .min(10, "Phone number not less than 10 character.")
    .max(12, "Phone no not more than 12 character.")
    .required("Phone number is required.")
    .matches(phoneRegExp, "Only numbers are allowed."),
  location: Yup.string().required("Location is required."),
  // sportcenter: Yup.string()
  // .required("Sport center  is required.")
  // .matches(phoneRegExp, 'Only numbers are allowed.'),
  password: yup.string().required("Password is required."),
});
const AddCoach = () => {
  let history = useHistory();
  const [specialization, setspecialisation] = useState("Specialization");
  const handlespecialisationonChange = (e) => {
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

  const [sportsCenter, setSportsCenter] = useState();
  const handlesportcenterChange = (e) => {
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

  const baseURL = process.env.REACT_APP_API_ENDPOINT;

  const token = localStorage.getItem("token");
  const onSubmit = async (e) => {
    const res = await axios
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
            contact: contact,
          },
          name: name,
          location: location,
          speciallsation: specialization,
          sports_center: sportsCenter,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((f) => {
        swal("Coach Created Successfully.", "", "success", {
          button: "ok",
        });
        history.push("/superadmin/coachmanagement");
      })
      .catch((error) => {
        swal("Something went wrong!", "Oops...", error, {
          button: "ok",
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
      contact: "",
      location: "",
      password: "",
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
    <div>
      <Container>
        <h3 style={{ padding: "10px" }}>Add Coach</h3>
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
                    Name:
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
                      formik.touched.contact && formik.errors.contact
                    )}
                    margin="normal"
                    required
                    fullWidth
                    helperText={formik.touched.contact && formik.errors.contact}
                    onBlur={formik.handleBlur}
                    onKeyUp={handleContactChange}
                    onChange={formik.handleChange}
                    name="contact"
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
                  <Select
                    style={{
                      marginTop: "16px",
                    }}
                    inputProps={{ maxLength: 50 }}
                    margin="normal"
                    required
                    fullWidth
                    onBlur={formik.handleBlur}
                    // onKeyUp={handlesportcenterChange}
                    onChange={handlesportcenterChange}
                    name="sports_center"
                    variant="outlined"
                    value={sportsCenter}
                  >
                    <MenuItem disabled value="">
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
                    id="demo-controlled-open-select-label"
                    className="Input"
                    style={{
                      color: "rgba(12,11,69,255)",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    Specialization:
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    variant="outlined"
                    onClose={handleClose}
                    onChange={handlespecialisationonChange}
                    onOpen={handleOpen}
                    value={specialization}
                    required
                    style={{ marginTop: "13px" }}
                    label="Specialization"
                  >
                    <MenuItem  Selected value="Specialisation">
                      Specialization
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
    </div>
  );
};
export default AddCoach;
