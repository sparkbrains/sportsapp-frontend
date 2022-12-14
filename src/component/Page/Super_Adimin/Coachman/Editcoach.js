import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import { Button,FormHelperText } from "@material-ui/core";
import { useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert2";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AppLayout from "../../../../layout/appLayout";
import CircularProgress from "@mui/material/CircularProgress";

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
    .min(10, "Phone number not less than 10 digits.")
    .max(10, "Phone number not more than 10 digits.")
    .matches(phoneRegExp, "Only numbers are allowed.")
    .required("Phone number is required."),
  location: yup.string().required("Location is required."),
  sports_center: yup
    .string()
    .required("Sports center is required."),
});

export default function Editcoach() {
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
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    // e.preventDefault();
  // console.log(editcoach,"user====");
  // console.log(formik,"user====");
    
    if (formik.isValid) {
    setIsLoading(true);

      axios
      .patch(baseURL + `sports/coach/?id=${id}`, {
        user: {
          email: editcoach.email,
          name: editcoach.name,
        },
        profile: {
          role: "coach",
          phone_no: editcoach.contact,
        },
        location: editcoach.location,
        speciallsation: editcoach.speciallsation,
        sports_center: editcoach.sports_center,
      })
      .then((res) => {
    setIsLoading(false);

        setMessage(res.firstname);
        
        swal.fire({
          // title: 'Error!',
          confirmButtonColor: '#232B58',
          text: 'Coach Edited Successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(d=>{
    navigate("/coachmanagement");
        });
      })
      .catch((error) => {
    setIsLoading(false);
        
        swal.fire({
          confirmButtonColor: '#232B58',
          // title: 'Error!',
          text: 'Something went wrong!!',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      });
  };
}

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
    initialValues: editcoach,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <AppLayout>
      <Container>
        <h3 style={{ padding: "10px" }}>Edit Coach</h3>
        <Paper>
          <div className={classes.root} style={{ padding: "20px" }}>
            <form
              method="POST"
              noValidate
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
                  <TextField
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
                    select
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
                  </TextField>
                  {formik.touched.sports_center &&
                        formik.errors.sports_center && (
                        <FormHelperText className="Mui-error">
                          {formik.errors.sports_center}
                        </FormHelperText>
                      )}
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
                    helperText={formik.touched.speciallsation && formik.errors.speciallsation}
                    onClick={formik.handleChange}
                    fullWidth
                    open={open}
                    variant="outlined"
                    onClose={handleClose}
                    onOpen={handleOpen}
                    onBlur={formik.handleBlur}
                    onKeyUp={handlespecialisationonChange}
                    name="speciallsation"
                    value={
                      (editcoach.speciallsation?.length > 1 &&
                        editcoach.speciallsation) ||
                      "none"
                    }
                    onChange={(e) => onInputChange(e)}
                    style={{ marginTop: "13px" }}
                  >
                    <MenuItem disabled value="none">
                      <em>--- Specialization ---</em>
                    </MenuItem>
                    <MenuItem value="cardio">Cardio</MenuItem>
                    <MenuItem value="strength">Strength</MenuItem>
                    <MenuItem value="shooting">Shooting</MenuItem>
                    <MenuItem value="wrestling">Wrestling</MenuItem>
                    <MenuItem value="boxing">Boxing</MenuItem>
                    <MenuItem value="tennis">Tennis</MenuItem>
                  </Select>
                  {formik.touched.speciallsation && formik.errors.speciallsation && (
                        <FormHelperText className="Mui-error">
                          {formik.errors.speciallsation}
                        </FormHelperText>
                      )}
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
                    disabled
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
                    Phone Number
                  </InputLabel>
                  <TextField
                    inputProps={{ maxLength: 13 }}
                    error={Boolean(
                      formik.touched.contact && formik.errors.contact
                    )}
                    helperText={
                      formik.touched.contact && formik.errors.contact
                    }
                    onBlur={formik.handleBlur}
                    onKeyUp={formik.handleChange}
                    margin="normal"
                    required
                    type="tel"
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
                      marginTop: "100px",
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
                  className="btn-submit"

                    >
                  {isLoading === true ? <CircularProgress Shrink /> : ""}

                      Save
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
}
