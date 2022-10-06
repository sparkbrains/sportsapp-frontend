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
import axios from "axios";
import "./Signup.css";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import {
  PersonRounded,
  Email,
  Phone,
  VpnKeyOutlined,
  Wc,
} from "@material-ui/icons";
import { useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

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
    .matches(countryNameRegex, "Only alphabets are required."),
  email: yup.string().email("Please enter a valid email address.").matches(emailRegx, "Invalid Email ID...").required(),
  contactno: yup
    .string()
    .max(12, "Contact number must be at least 12 number.")
    .required("Contact number is required.")
    .matches(phoneRegExp, "Only numbers are allowed."),
  password: yup
    .string()
    .matches(PASSWORD_REGEX, "Please enter a strong password.")
    .required(),
  confirmPassword: yup
    .string()
    .required("Please confirm your password.")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Password does not match."),
    }),
});




export default function SignInSide() {
  
  useEffect(() => {
    document.title = "Sign Up User";
  }, []);

  const [name, setname] = useState();
  const handlenameChange = (e) => {
    setname(e.target.value);
  };
  const [email, setemail] = useState();
  const handleEmailChange = (e) => {
    setemail(e.target.value);
  };
  const [contactno, setcontactno] = useState();
  const handleContactnoChange = (e) => {
    setcontactno(e.target.value);
  };
  const [gender, setgender] = useState();
  const handleGenderonChange = (e) => {
    setgender(e.target.value);
  };
  const [password, setPassword] = useState();
  const handlePasswordonChange = (e) => {
    setPassword(e.target.value);
  };

  const [message, setMessage] = useState(null);
  let history = useHistory();

  const onSubmit = async (e) => {
    // e.preventDefault();
    
    const res = await axios
      .post("http://1806-103-205-134-82.ngrok.io/signup/", {
        name: (name),
        email: (email),
        gender: (gender),
        contact: (contactno),
        password: (password),
      })
      .then((res) => {
        formik.resetForm();        
        setMessage(res.data.message);
        swal("Owner Account has Created Successfully!!", "", "success", {
          button: "ok",
        });
        history.push("/")
      })
      // .catch((err) => { });
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
        swal("User with this email already exists.", "", "error", {
          button: "ok",
        });
      });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      contactno:"",
      password: "",
      confirmPassword: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  const classes = useStyles();
  const [age, setAge] = useState("");
  // const [age, setAge] = React.useState('');
  const [open, setOpen] = useState(false);

  const onChange = (event, item) => {
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
    <Grid container component="main" >
      <CssBaseline />
      <Grid md={12}>
      
        <div className="main">
          <div className={classes.paper}>
            <Grid
              align="start"
              style={{
                marginTop: "8px",
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              <h2 className="signupheading">User Sign Up</h2>
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
                    // error={Boolean(touched.gender && errors.gender)}
                    fullWidth
                    // helperText={touched.gender && errors.gender}
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={age}
                    onChange={onChange}
                    // onBlur={formik.handleBlur}
                    // onKeyUp={handleGenderonChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Male</MenuItem>
                    <MenuItem value={20}>Female</MenuItem>
                    <MenuItem value={30}>Other</MenuItem>
                  </Select>
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
                    type="number"
                    onKeyUp={handleContactnoChange}
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
                  onClick={(e) => onSubmit(e)}
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
                      {"Sign in here!"}
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
