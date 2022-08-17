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
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


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
  // name: yup
  //   .string()
  //   .max(25, "Must be 25 characters or less")
  //   .required("Name is required.")
  //   .matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
  // email: yup.string().email("Email is invalid.").required("Email is required."),
  // contact: yup
  //   .string()
  //   .min(10, "Phone number not less than 10 character.")
  //   .max(15, "Phone number not more than 15 character.")
  //   .required("Phone number is required.")
  //   .matches(phoneRegExp, "Only numbers are allowed."),
  // location: yup.string().required("Location is required."),
  // sport_center: yup
  //   .string()
  //   .required("Sport center  is required.")
  //   .matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
});

export default function CenteredGrid() {
  const { id } = useParams();
  let history = useHistory();
  const [message, setMessage] = useState(null);
  const [mes, setMes] = useState(null);
  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  const [editcoach, setEditcoach] = useState({
    name: "",
    sport_center: "",
    contact: "",
    speciallsation: "",
    location: "",
    // email: "",
  });
  console.log(editcoach, "editcoach");
  const onInputChange = (e) => {
    setEditcoach({ ...editcoach, [e.target.name]: e.target.value });
    //console.log("on1111");
  };

  useEffect(() => {
    document.title = "Edit Coach Ownetr";
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    // e.preventDefault();
    await axios
      .patch(baseURL + `sports/coach/?id=${id}`, editcoach, specialisation)
      .then((res) => {
        setMessage(res.firstname);
        console.log(res, "ssssssankul");
        swal("Coach Edit Successfully.", "", "success", {
          button: "ok",
        });
      })
      // .catch((err) => { });
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data.firstname);
          setMes(error.response.data.firstname);
          // Request made and server responded
          console.log(error.response.data.firstname, "hellp1234567890");
          console.log(error.response.status);
          console.log(error.firstname, "hellp");
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
    history.push("/superadmin/coachmanagement");
  };

  const loadUser = async (e) => {
    const result = await axios.get(baseURL + `sports/coach/?id=${id}`);
    setEditcoach({
    name:result.data?.user?.name,
    sport_center:result.data?.sports_center?.center_name,
    contact:result.data?.sports_center?.contact,
    speciallsation:result.data?.speciallsation,
    location:result.data?.location,
    email:result.data?.user?.email,
    });

    //console.log(editcoach,"editcoach");
  };

  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [specialisation, setspecialisation] = useState();
  const handlespecialisationonChange = (e) => {
    setspecialisation(e.target.value);
  };

  const [open, setOpen] = React.useState(false);

  const onChange = (event, item) => {
    //setspecialisation(item.props.children);
    //setAge(event.target.value);
    setEditcoach((prev) => {
      return { ...prev, specialisation: event.target.value };
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const formik = useFormik({
    initialValues: {
      // name: "",
      email: "",
      // contact: "",
      // sport_center: "",
      // location: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <div>
      <Container>
        <h3 style={{ padding: "10px" }}>Edit Coach</h3>
        <Paper>
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
                    // error={Boolean(formik.touched.name && formik.errors.name)}
                    margin="normal"
                    required
                    fullWidth
                    // helperText={formik.touched.name && formik.errors.name}
                    name="name"
                    // onBlur={formik.handleBlur}
                    onChange={(e) => onInputChange(e)}
                    // onClick={formik.handleChange}
                    variant="outlined"
                    value={editcoach?.name}
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
                    Sports Center
                  </InputLabel>
                  <TextField
                    // error={Boolean(
                    //   formik.touched.sport_center && formik.errors.sport_center
                    // )}
                    margin="normal"
                    required
                    fullWidth
                    // helperText={
                    //   formik.touched.sport_center && formik.errors.sport_center
                    // }
                    name="sport_center"
                    // onBlur={formik.handleBlur}
                    onChange={(e) => onInputChange(e)}
                    // onClick={formik.handleChange}
                    autoComplete="sport_center"
                    variant="outlined"
                    value={editcoach?.sport_center}
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
                    Specialization:
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    variant="outlined"
                    onClose={handleClose}
                    onKeyUp={handlespecialisationonChange}
                    onOpen={handleOpen}
                    value={
                      (editcoach.speciallsation?.length > 1 &&
                        editcoach.speciallsation) ||
                      "none"
                    }
                    onChange={onChange}
                    style={{ marginTop: "13px" }}
                  >
                    <MenuItem value="none">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"cardio"}>cardio</MenuItem>
                    <MenuItem value={"strength"}>strength</MenuItem>
                  
                  </Select>
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
                    Email
                  </InputLabel>
                  <TextField
                    // error={Boolean(formik.touched.email && formik.errors.email)}
                    fullWidth
                    // helperText={formik.touched.email && formik.errors.email}
                    margin="normal"
                    name="email"
                    // onBlur={formik.handleBlur}
                    onChange={(e) => onInputChange(e)}
                    // type="email"
                    // onClick={formik.handleChange}
                    value={editcoach?.email}
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
                    // error={Boolean(
                    //   formik.touched.contact && formik.errors.contact
                    // )}
                    margin="normal"
                    required
                    fullWidth
                    // helperText={formik.touched.contact && formik.errors.contact}
                    // onBlur={formik.handleBlur}
                    onChange={(e) => onInputChange(e)}
                    // onClick={formik.handleChange}
                    name="contact"
                    autoComplete="number"
                    variant="outlined"
                    value={editcoach?.contact}
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
                    // error={Boolean(
                    //   formik.touched.location && formik.errors.location
                    // )}
                    fullWidth
                    // helperText={
                    //   formik.touched.location && formik.errors.location
                    // }
                    margin="normal"
                    name="location"
                    // onBlur={formik.handleBlur}
                    onChange={(e) => onInputChange(e)}
                    // onClick={formik.handleChange}
                    // type="text"
                    value={editcoach.location}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
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
                        width: "192Px",
                        padding: "11px",
                      }}
                    >
                      Save
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
