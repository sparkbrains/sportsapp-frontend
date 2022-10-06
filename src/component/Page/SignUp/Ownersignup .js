import { React, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import swal from "sweetalert";
import "./Signup.css";
import {
  PersonRounded,
  Email,
  Phone,
  VpnKeyOutlined,
  Wc,
} from "@material-ui/icons";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },

  paper: {
    margin: theme.spacing(2, 4),
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const phoneRegExp =
/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const countryNameRegex = /^[a-zA-Z]{1,40}( [a-zA-Z]{1,40})+$/;
const emailRegx = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;


const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, "Please enter your name")
    .required("Full name is required.")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
  // .matches(countryNameRegex, "Only alphabets are required."),
  email: yup
    .string()
    .email("Please enter a valid email address a@gmail.COM .").matches(emailRegx, "Invalid Email ID...")
    .required("Email is a required field."),
  contactno: yup
    .string()
    .min(10, "Please enter your 10 digit Mobile Number")
    .max(12, "Please enter your 10 digit Mobile Number")
    .required("Contact number is required.")
    .matches(phoneRegExp, "Only numbers are allowed."),
  // gendr: yup
  // .string()
  //   .required("Required") ,
  password: yup
    .string()
    .matches(PASSWORD_REGEX, " Passwords must have at least 8 characters and contain at least two of the following: uppercase letters, lowercase letters, numbers, and symbols.")
    .required("Password is a required field."),
  confirmPassword: yup
    .string()
    .required("Please confirm your password.")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Password does not match"),
    }),
});

export default function SignInSide() {
  useEffect(() => {
    document.title = "Sign Up User";
  }, []);
  const [role, setRole] = useState("owner");
  const classes = useStyles();
  const [age, setAge] = useState("MALE");
  const [gender, setgender] = useState("MALE");
  // const [age, setAge] = React.useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [mes, setMes] = useState(null);

  let history = useHistory();


  const handleChange = (event) => {
    setRole(event.target.value);
  };

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

  const handleGenderonChange = (e) => {
    setgender(e.target.value);
  };
  const [password, setPassword] = useState();
  const handlePasswordonChange = (e) => {
    setPassword(e.target.value);
  };
  //  const showAlert = () => {
  //     Swal.fire({
  //         title: "Success",
  //         text: "Alert successful",
  //         icon: "success",
  //         confirmButtonText: "OK",
  //       });
  // }
  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  const onSubmit = async (e) => {
    // e.preventDefault();
    const res = await axios
      .post(baseURL+"users/register/",
        {
          name: name,
          email: email,
          gender: gender,
          contact: contact,
          password: password,
          role: role,
        }
      )
       
      .then((res) => {
        setMessage(res.data.message);
        swal("Owner Account has Created Successfully!!", "", "success", {
          button: "ok",
        });
        history.push("/")
      })
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data.message);
          setMes(error.response.data.gender);
          // Request made and server responded
          console.log(error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        swal("User with this email already exists.", "", "error", {
          button: "ok",
        });
      });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      contactno: "",
      password: "",
      // gender:"",
      confirmPassword: "",
    },
    validateOnBlur: true,
    onSubmit,

    validationSchema: validationSchema,
  });

  // console.log("formik",formik);

  const onChange = (event, item) => {
    // console.log("item  in onchange",item?.props?.children?.props?.children)
    setgender(item.props.children);
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    // swal("Here's a titlel", "Here's some text", "success", {
    //   button: "I am new button",
    // }),
    <Grid container component="main">
      <CssBaseline />
      <Grid md={12}>
        <div className="main">
          <div className={classes.paper}>
            <div>
              <Stack
                direction="row"
                spacing={2}
                style={{ justifyContent: "center", marginTop: "34px" }}
              >
             
                <FormControl>
                  <RadioGroup
                  defaultValue="owner"
                  checked={role === "owner"}
                    row
                     //aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                    
                    defaultChecked={role === "owner"}
                      onChange={handleChange}
                      value="owner"
                      control={<Radio />}
                      label="Owner Signup"
                      inputProps={{ "aria-label": "owner" }}
                    />
                    <FormControlLabel
                      checked={role === "coach"}
                      onChange={handleChange}
                      value="coach"
                      control={<Radio />}
                      label="Coaches Signup"
                      inputProps={{ "aria-label": "coaches" }}
                    />
                    <FormControlLabel
                      checked={role === "user"}
                      onChange={handleChange}
                      value="user"
                      control={<Radio />}
                      label="User Signup"
                      inputProps={{ "aria-label": "user" }}
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </div>

            <Grid
              align="start"
              style={{
                marginTop: "8px",
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              <h2 className="signupheading"> Sign Up</h2>
              {/* {message && <div>{message}</div>} */}
              <Typography
                variant="caption"
                gutterBottom
                style={{ fontSize: "16px" }}
              >
                Fill Below Fields To Sign Up
              </Typography>
            </Grid>
            <form method="POST" noValidate onSubmit={formik.handleSubmit}>
              <InputLabel
                className="Input"
                style={{
                  color: "rgba(12,11,69,255)",
                  padding: "5px",
                  display: "flex",
                  fontSize: "15px",
                  fontWeight: "bold",
                  marginTop: "30px",
                }}
              >
                <PersonRounded className="icon" />
                NAME
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
                onChange={formik.handleChange}
                value={formik.values.name}
                onKeyUp={handlenameChange}
                autoComplete="name"
              />
              <InputLabel
                className="InputLabel"
                style={{
                  color: "rgba(12,11,69,255)",
                  padding: "5px",
                  display: "flex",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                <Email className="icon" />
                EMAIL
              </InputLabel>
              <TextField
                inputProps={{ maxLength: 50 }}
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                margin="normal"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                onKeyUp={handleEmailChange}
                type="email"
                value={formik.values.email}
              />
              <Grid container spacing={3}>
                <Grid item sm={12} md={6}>
                  <InputLabel
                    className="InputLabel"
                    style={{
                      color: "rgba(12,11,69,255)",
                      padding: "5px",
                      display: "flex",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    <Wc className="icon" />
                    GENDER
                  </InputLabel>
                  <Select
                    //  error={Boolean(formik.touched.gender && formik.errors.gender)}
                    fullWidth
                    required
                    //  helperText={formik.touched.gender && formik.errors.gender}
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    Value={age}
                    // onChange={(item)=>{console.log("Selected item",item.target.value)}}
                    onChange={onChange}
                    defaultValue="MALE"

                    // onBlur={formik.handleBlur}
                    // onKeyUp={handleGenderonChange}
                  >
                    {/* <MenuItem value="">
                      <em>Male</em>
                    </MenuItem> */}
                    <MenuItem value="MALE">Male</MenuItem>
                    <MenuItem value="FEMALE">Female</MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                  </Select>
                  {mes && <div style={{ color: "red" }}>{mes}</div>}
                </Grid>

                <Grid item sm={12} md={6}>
                  <InputLabel
                    className="InputLabel"
                    style={{
                      color: "rgba(12,11,69,255)",
                      padding: "5px",
                      display: "flex",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    <Phone className="icon" />
                    CONTACT NO.
                  </InputLabel>

                  <TextField
                    inputProps={{ maxLength: 13 }}
                    error={Boolean(
                      formik.touched.contactno && formik.errors.contactno
                    )}
                    required
                    fullWidth
                    helperText={
                      formik.touched.contactno && formik.errors.contactno
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="contactno"
                    // type="number"
                    onKeyUp={handleContactChange}
                    autoComplete="number"
                  />
                </Grid>
              </Grid>
              <InputLabel
                className="InputLabel"
                style={{
                  color: "rgba(12,11,69,255)",
                  padding: "5px",
                  display: "flex",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                <VpnKeyOutlined className="icon" />
                PASSWORD
              </InputLabel>
              <TextField
                inputProps={{ maxLength: 40 }}
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                onKeyUp={handlePasswordonChange}
                type="password"
                value={formik.values.password}
              />
              <InputLabel
                className="InputLabel"
                style={{
                  color: "rgba(12,11,69,255)",
                  padding: "5px",
                  display: "flex",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                <VpnKeyOutlined className="icon" />
                CONFIRM PASSWORD
              </InputLabel>

              <TextField
                inputProps={{ maxLength: 40 }}
                error={Boolean(
                  formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                )}
                fullWidth
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                margin="normal"
                name="confirmPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                onKeyUp={handlePasswordonChange}
                type="password"
                value={formik.values.confirmPassword}
              />

              <Grid container justify="center">
                <Button
                  style={{
                    backgroundColor: "rgba(12,11,69,255)",
                    color: "white",
                    borderRadius: " 22px 22px",
                    padding: "11px 65px",
                    fontSize: "16px",
                    marginTop: "90px",
                  }}
                  // disabled={isSubmitting}
                  type="submit"
                  variant="outlined"
                  size="medium"
                  // onClick={showAlert}
                  onClick={(e) =>onSubmit(e)}
                  color="primary"
                  className={classes.margin}
                >
                  Sign Up
                </Button>
              </Grid>

              <Grid container>
                <Grid item xs>
                  <Grid
                    item
                    container
                    justify="center"
                    style={{ display: "flex", marginTop: "30px" }}
                  >
                    <p style={{ marginRight: "6px", marginTop: "0px" }}>
                      Already have an account?
                    </p>
                    <a
                      href="/"
                      variant="body2"
                      style={{
                        textDecoration: "none",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {"Sign In here!"}
                    </a>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
