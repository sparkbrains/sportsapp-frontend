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
import swal from "sweetalert2";
import "./Signup.css";
import {
  PersonRounded,
  Email,
  Phone,
  VpnKeyOutlined,
  Wc,
} from "@material-ui/icons";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

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

const phoneRegExp = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const emailRegx = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, "Please enter your name")
    .required("Name is required.")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
  // .matches(countryNameRegex, "Only alphabets are required."),
  email: yup
    .string()
    .email("Please enter a valid email address .")
    .matches(emailRegx, "Invalid Email ID...")
    .required("Email is required."),
  contactno: yup
    .string()
    .matches(phoneRegExp, "Phone number must contains only digits.")
    .min(10, "Phone number should not be less than 10 digits.")
    .max(10, "Phone number should not be more than 10 digits.")
    .required("Phone number is required."),
  gender: yup.string().required("Gender is required"),
  password: yup
    .string()
    .matches(
      PASSWORD_REGEX,
      " Password must have at least 8 characters and the combination of the following: uppercase letter, lowercase letter, numbers, and symbols."
    )
    .required("Password is required."),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required.")
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
  // const [age, setAge] = useState("MALE");
  const [gender, setGender] = useState("");
  // const [age, setAge] = React.useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [mes, setMes] = useState();

  let navigate = useNavigate();

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
  const [isLoading, setIsLoading] = useState(false);

  const handleGenderonChange = (e) => {
    setGender(e.target.value);
  };

  const [err, setErr] = useState();

  const [password, setPassword] = useState();
  const handlePasswordonChange = (e) => {
    setPassword(e.target.value);
  };

  const [visible, setVisible] = useState(false);
  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  const onSubmit = async (e) => {
    // e.preventDefault();
    if (formik.isValid) {
      setIsLoading(true);
      await axios
        .post(baseURL + "users/register/", {
          name: name,
          email: email,
          gender: gender,
          contact: contact,
          password: password,
          role: role,
        })

        .then((res) => {
          setMessage(res.data.message);
          swal.fire({
            // title: 'Error!',
            confirmButtonColor: '#232B58',
            text: 'Account Created Successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((d) => {

            navigate("/");
            setIsLoading(false);
            setVisible(false);
          })
        })
        .catch((error) => {
          setIsLoading(false);

          setMessage(error.response);
          if (error.response) {
            setVisible(true);
            setMessage(error.response.data.message);
            setMes(error.response.data.gender);
            setErr(error?.response?.data?.error);
            // Request made and server responded
            console.log(error.response.status);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          swal.fire({
            confirmButtonColor: '#232B58',
            // title: 'Error!',
            text: 'Something is wrong!!',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      contactno: "",
      password: "",
      gender: "",
      confirmPassword: "",
    },
    validateOnBlur: true,
    onSubmit,

    validationSchema: validationSchema,
  });

  // console.log("formik",formik);

  const onChange = (event) => {
    // console.log("item  in onchange",item?.props?.children?.props?.children)
    setGender(event.target.value);
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
                  style={{ fontSize: "15px" }}
                >
                  Fill the details below to SignUp
                </Typography>
              </Grid>
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
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      onChange={handleChange}
                      checked={role === "owner"}
                      value="owner"
                      control={<Radio />}
                      label="Owner"
                      inputProps={{ "aria-label": "owner" }}
                    />
                    <FormControlLabel
                      checked={role === "coach"}
                      onChange={handleChange}
                      value="coach"
                      control={<Radio />}
                      label="Coach"
                      inputProps={{ "aria-label": "coach" }}
                    />
                    <FormControlLabel
                      checked={role === "user"}
                      onChange={handleChange}
                      value="user"
                      control={<Radio />}
                      label="User"
                      inputProps={{ "aria-label": "user" }}
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </div>

            <form method="POST" noValidate onSubmit={formik.handleSubmit}>
              <InputLabel
                className="Input"
                style={{
                  color: "rgba(12,11,69,255)",
                  padding: "5px",
                  display: "flex",
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginTop: "20px",
                }}
              >
                <PersonRounded
                  style={{ fontSize: "18px", marginRight: "4px" }}
                />
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
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                <Email style={{ fontSize: "18px", marginRight: "4px" }} />
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
              {/* {visible ? (<p style={{ color: "red", margin: "0px",fontSize: "12px" }}>{err}</p>) : ""} */}

              <Grid container spacing={3}>
                <Grid item sm={12} md={6}>
                  <InputLabel
                    id="gender"
                    className="InputLabel"
                    style={{
                      color: "rgba(12,11,69,255)",
                      padding: "5px",
                      display: "flex",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    <Wc style={{ fontSize: "18px", marginRight: "4px" }} />
                    GENDER
                  </InputLabel>
                  <Select
                    // id="gender"
                    // labelId="gender"
                    error={Boolean(
                      formik.touched.gender && formik.errors.gender
                    )}
                    fullWidth
                    required
                    helperText={formik.touched.gender && formik.errors.gender}
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    name="gender"
                    value={gender}
                    style={{ marginTop: "16px" }}
                    // onChange={(item)=>{console.log("Selected item",item.target.value)}}
                    onKeyUp={handleGenderonChange}
                    onChange={(e) => {
                      formik.handleChange(e);
                      handleGenderonChange(e);
                    }}
                    onBlur={formik.handleBlur}
                    // defaultValue="Gender"
                    displayEmpty
                  >
                    <MenuItem disabled value="">
                      <em>--Select--</em>
                    </MenuItem>
                    <MenuItem value="MALE">Male</MenuItem>
                    <MenuItem value="FEMALE">Female</MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                  </Select>
                  {/* {mes && <div style={{ color: "red" }}>{mes}</div>} */}
                  {mes && (
                    <div style={{ color: "red" }}>{"Gender is required."}</div>
                  )}
                </Grid>

                <Grid item sm={12} md={6}>
                  <InputLabel
                    className="InputLabel"
                    style={{
                      color: "rgba(12,11,69,255)",
                      padding: "5px",
                      display: "flex",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    <Phone style={{ fontSize: "18px", marginRight: "4px" }} />
                    CONTACT NUMBER
                  </InputLabel>

                  <TextField
                    inputProps={{ maxLength: 13 }}
                    error={Boolean(
                      formik.touched.contactno && formik.errors.contactno
                    )}
                    margin="normal"
                    required
                    fullWidth
                    helperText={
                      formik.touched.contactno && formik.errors.contactno
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="contactno"
                    type="tel"
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
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                <VpnKeyOutlined
                  style={{ fontSize: "18px", marginRight: "4px" }}
                />
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
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                <VpnKeyOutlined
                  style={{ fontSize: "18px", marginRight: "4px" }}
                />
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
                    fontSize: "18px",
                    marginTop: "90px",
                  }}
                  // disabled={isSubmitting}
                  type="submit"
                  variant="outlined"
                  size="medium"
                  // onClick={showAlert}
                  // onClick={(e) => onSubmit(e)}
                  color="primary"
                  className={classes.margin}
                >
                  {isLoading === true ? <CircularProgress Shrink /> : ""}
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
