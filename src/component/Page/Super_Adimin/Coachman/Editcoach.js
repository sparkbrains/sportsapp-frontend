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
import { useNavigate } from "react-router-dom";
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

const phoneRegExp = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

const emailRegx = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

const validationSchema = yup.object({
  name: yup
    .string()
    .max(25, "Must be 25 characters or less")
    .required("Name is required.")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
  email: yup
    .string()
    .email("Email is invalid.")
    .required("Email is required.")
    .matches(emailRegx, "Invalid Email ID..."),
  contact: yup
    .string()
    .min(10, "Phone number not less than 10 character.")
    .max(15, "Phone number not more than 15 character.")
    .required("Phone number is required.")
    .matches(phoneRegExp, "Only numbers are allowed."),
  location: yup.string().required("Location is required."),
  sports_center: yup
    .string()
    .required("Sport center  is required.")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
});

export default function CenteredGrid() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [mes, setMes] = useState(null);
  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  const [editcoach, setEditcoach] = useState({
    name: "",
    sports_center: "",
    contact: "",
    speciallsation: "",
    location: "",
    email: "",
  });
  const onInputChange = (e) => {
    setEditcoach({ ...editcoach, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    document.title = "Edit Coach Owner";
    loadUser();
    handleSports();
  }, []);

  const onSubmit = async (e) => {
    // e.preventDefault();
    await axios
      .patch(baseURL + `sports/coach/?id=${id}`, {
        user: {
          email: editcoach.email,
          name: editcoach.name,
          password: editcoach.password,
        },
        profile: {
          role: "coach",
          phone_no: editcoach.contact,
        },
        name: editcoach.name,
        location: editcoach.location,
        speciallsation: editcoach.speciallsation,
        sports_center: editcoach.sports_center,
      })
      .then((res) => {
        setMessage(res.firstname);
        swal("Coach Edit Successfully.", "", "success", {
          button: "OK",
        });
      })
      .catch((error) => {
        swal("Something went wrong!", "", "error", {
          button: "OK",
        });
      });
    navigate("/superadmin/coachmanagement");
  };

  const loadUser = async (e) => {
    const result = await axios.get(baseURL + `sports/coach/?id=${id}`);
    setEditcoach({
      name: result.data?.user?.name,
      sports_center: result.data?.sports_center.id,
      contact: result.data?.profile?.phone_no,
      speciallsation: result.data?.speciallsation,
      location: result.data?.location,
      email: result.data?.user?.email,
    });
  };

  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [specialisation, setspecialisation] = useState();
  const handlespecialisationonChange = (e) => {
    setspecialisation(e.target.value);
  };

  const [open, setOpen] = React.useState(false);

  const onChange = (event, item) => {
    setEditcoach((prev) => {
      return { ...prev, speciallsation: event.target.value };
    });
  };

  const [sports, setSports] = useState([]);

  const handleSports = async (e) => {
    const resp = await axios.get(
      baseURL + "sports/sports-center/sports-center-owner/"
    );
    setSports(resp.data);

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
      // email: "",
      // contact: "",
      // sports_center: "",
      // location: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  console.log(editcoach,"user====");
  return (
    <div>
      <Container>
        <h3 style={{ padding: "10px" }}>Edit Coach</h3>
        <Paper>
          <div className={classes.root} style={{ padding: "20px" }}>
            <form
              method="POST"
              Validate
              autoComplete="off"
              onSubmit={formik.handleSubmit}
            >
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
                    error={Boolean(formik.touched.name && formik.errors.name)}
                    margin="normal"
                    required
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={(e) => onInputChange(e)}
                    onClick={formik.handleChange}
                    variant="outlined"
                    value={editcoach?.name}
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
                    Sport Center
                  </InputLabel>
                  <Select
                  style={{
                    marginTop: "16px",
                  }}
                    error={Boolean(
                      formik.touched.sports_center &&
                        formik.errors.sports_center
                    )}
                    helperText={formik.touched.name && formik.errors.name}
                    onBlur={formik.handleBlur}
                    // onClick={formik.handleChange}
                    margin="normal"
                    required
                    fullWidth
                    name="sports_center"
                    onChange={(e) => onInputChange(e)}
                    variant="outlined"
                    value={editcoach?.sports_center}
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
                    Specialization:
                  </InputLabel>
                  <Select
                    error={Boolean(
                      formik.touched.speciallsation &&
                        formik.errors.speciallsation
                    )}
                    helperText={formik.touched.name && formik.errors.name}
                    onClick={formik.handleChange}
                    fullWidth
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    variant="outlined"
                    onClose={handleClose}
                    onOpen={handleOpen}
                    onBlur={formik.handleBlur}
                    onKeyUp={(e) => handlespecialisationonChange(e)}
                    name="speciallsation"
                    value={
                      (editcoach.speciallsation?.length > 1 &&
                        editcoach.speciallsation) ||
                      "none"
                    }
                    onChange={(e) => onChange(e)}
                    style={{ marginTop: "13px" }}
                  >
                    <MenuItem disabled value="none">
                      <em>--- Specialization ---</em>
                    </MenuItem>
                    <MenuItem value={"cardio"}>cardio</MenuItem>
                    <MenuItem value={"strength"}>strength</MenuItem>
                    <MenuItem value="shooting">shooting</MenuItem>
                    <MenuItem value="wrestling">wrestling</MenuItem>
                    <MenuItem value="boxing">boxing</MenuItem>
                    <MenuItem value="tennis">tennis</MenuItem>
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
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    helperText={formik.touched.name && formik.errors.name}
                    onBlur={formik.handleBlur}
                    onClick={formik.handleChange}
                    fullWidth
                    margin="normal"
                    name="email"
                    onChange={(e) => onInputChange(e)}
                    value={editcoach?.email}
                    variant="outlined"
                    type="email"
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
                    inputProps={{ maxLength: 13 }}
                    error={Boolean(
                      formik.touched.phone_no && formik.errors.phone_no
                    )}
                    helperText={
                      formik.touched.phone_no && formik.errors.phone_no
                    }
                    onBlur={formik.handleBlur}
                    onClick={formik.handleChange}
                    margin="normal"
                    required
                    type="number"
                    fullWidth
                    onChange={(e) => onInputChange(e)}
                    name="contact"
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
                    error={Boolean(
                      formik.touched.location && formik.errors.location
                    )}
                    fullWidth
                    helperText={
                      formik.touched.location && formik.errors.location
                    }
                    margin="normal"
                    name="location"
                    onBlur={formik.handleBlur}
                    onChange={(e) => onInputChange(e)}
                    onClick={formik.handleChange}
                    type="text"
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
                      marginTop: "80px",
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
                      onClick={(e) => onSubmit(e)}
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
