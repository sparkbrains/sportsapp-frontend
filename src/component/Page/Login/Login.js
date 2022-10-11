import { React } from "react";
import { Button } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import { Email, VpnKeyOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";
import { useAuth } from "../../useAuth/useAuth";
import { useLocation } from "react-router-dom";

const emailRegx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

// const validationSchema = yup.object({
//   email: yup
//     .string()
//     .email("Please enter a valid email address a@gmail.COM .").matches(emailRegx, "Invalid Email ID...")
//     .required("Email is required."),
//   password: yup
//     .string()
//     .matches(
//       PASSWORD_REGEX,
//       " Passwords must have at least 8 characters and contain at least two of the following: uppercase letters, lowercase letters, numbers, and symbols."
//     )
//     .required("Password is a required field."),
// });

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0px",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "0px",
    },
    [theme.breakpoints.up("lg")]: {},
  },

  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    marginTop: "100px",
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      marginTop: "80px",
    },
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
  "@media (min-width: 360px)": {
    buttonContainer: {
      marginTop: "800px",
    },
  },
  "@media (min-width: 768px)": {
    buttonContainer: {
      marginTop: "800px",
    },
  },
}));

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .matches(emailRegx, "Invalid Email ID...")
    .required("Email is required."),
  password: yup
    .string()
    .matches(PASSWORD_REGEX, "Invalid password...")
    .required("Password is required."),
});

export default function SignInSide(props) {
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);
  // const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { state } = useLocation();

  const { login } = useAuth();


  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    document.title = "Sign In";
  }, []);



  useEffect(() => {
    if (props?.match?.path === "/login-admin") {
    }
  }, [props?.match?.path]);

  const classes = useStyles();



  const [email, setEmail] = useState();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // setState({email: e.target.value});
  };
  const [password, setPassword] = useState();
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // setPassword({ e.target.value});
  };


  const [err, setErr] = useState();
  // var token = localStorage.getItem("token");

  //const { REACT_APP_API_ENDPOINT } = process.env;
  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  const onSubmit = async (e) => {
    setIsLoading(true);
    if (formik.isValid) {
      axios
      .post(
        baseURL + "users/login/",
        {
          email: email,
          password: password,
        }
        // { headers: { Authorization: `Bearer ${token}` } }
      )

      .then((res) => {
        setIsLoading(false);
        setMessage(res.data.message);

        if (res.status === 200) {
          // const { token } = res.data.token.access;
          // localStorage.setItem("token", res.data.token.access);
          // localStorage.getItem("token");
          // if (res.data.role === "admin") {
          //   setSuccess(res.data.message);
          //   // navigate("/superadmin");
          // } else if (res.data.role === "coach") {
          //   setSuccess(res.data.message);
          //   // navigate("/coaches");
          // } else if (res.data.role === "user") {
          //   setSuccess(res.data.message);
          //   // navigate("/user");
          // } else if (res.data.role === "") {
          //   setSuccess(res.data.message);
          //   // navigate("/sportscenterowner");
          
          // else {
          //   navigate("/sportscenterowner");
          // }
          // // props?.context.authLogin(res?.data?.user?.role);
          const token = res.data.token.access;
          localStorage.refresh_token = res.data.token.refresh;
          localStorage.setItem("token", token);
          navigate(state?.path || "/sportscenterowner");
          // localStorage.getItem("token");
          // const user = JSON.stringify(res?.data?.user);
          // localStorage.user = user;
          // props?.context.getProfile();
          // navigate("/sportscenterowner");
          
        }
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response) {
          // setErr(error?.response?.data?.error);
          setMessage(error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          setMessage(error.response.data.message);

          console.log(error.request);
        } else {
          setMessage(error?.response?.data?.message);

          console.log("Error", error.message);
        }
        swal.fire({
          // title: 'Success!',
          text: "Please enter valid email or password or both!",
          icon: 'error',
          confirmButtonText: 'OK'
        })
      });
  };
}

  const parseJwt = (token) => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid md={12}>
        <div className="bgimg">
          <Container maxWidth="false">
            <div className="main">
              <Grid
                container
                spacing={2}
                className="firstsignin"
                style={{ margin: "0" }}
              >
                <Grid item md={6} lg={6}>
                  <div className="sports-app">
                    <p style={{ fontSize: "20px" }}>WELCOME TO</p>
                    <Typography component="h1" variant="h5" className="Sig">
                      Sports App
                      <hr
                        style={{
                          width: "36%",
                          textAlign: "left",
                          marginLeft: "0",
                        }}
                      />
                    </Typography>
                    {/* <h4 style={{ color: "white" }}>
                      {" "}
                      Lorem lpsum ddummycontent
                    </h4>
                    <p className="pp" style={{ color: "white" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      <br />
                      Mauris ac ornare enim{" "}
                    </p> */}
                  </div>
                </Grid>
                <Grid item md={6} lg={6}>
                  {/* <Paper elevation={0}> */}
                  <div className={classes.paper}>
                    <Typography component="h1" variant="h4" className="Sign">
                      Sign in
                    </Typography>
                    <p className="p">Sign in with your email & password</p>
                    {/* <FromSuccess> {success ?success:""} </FromSuccess> */}

                    <form
                      className={classes.form}
                      method="POST"
                      noValidate
                      onSubmit={formik.handleSubmit}
                      // onChange={Submit}
                    >
                      <InputLabel
                        className="InputLabel"
                        style={{
                          color: "rgba(12,11,69,255)",
                          padding: "5px",
                          display: "flex",
                          fontSize: "20px",
                          letterSpacing: "2px",
                          fontWeight: "bold",
                          marginTop: "80px",
                        }}
                      >
                        <Email className="icon" style={{fontSize: "18px"}} />
                        EMAIL
                      </InputLabel>
                      <TextField
                        inputProps={{ maxLength: 30 }}
                        error={Boolean(
                          formik.touched.email && formik.errors.email
                        )}
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
                      <p
                        style={{
                          color: "red",
                          margin: "0px",
                          fontSize: "12px",
                        }}
                      >
                        {err}
                      </p>

                      <InputLabel
                        className="InputLabel"
                        style={{
                          color: "rgba(12,11,69,255)",
                          padding: "5px",
                          display: "flex",
                          fontSize: "20px",
                          letterSpacing: "2px",
                          fontWeight: "bold",
                        }}
                      >
                        <VpnKeyOutlined className="icon" />
                        PASSWORD
                      </InputLabel>
                      <TextField
                        inputProps={{ maxLength: 30 }}
                        error={Boolean(
                          formik.touched.password && formik.errors.password
                        )}
                        fullWidth
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                        margin="normal"
                        name="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        onKeyUp={handlePasswordChange}
                        type={showPassword ? "text" : "password"}
                        style={{ color: "#fff" }}
                        value={formik.values.password}
                        InputProps={{
                          // <-- This is where the toggle button is added.
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Grid container spacing={2}>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          style={{ textAlign: "right", fontSize: "16px" }}
                        >
                          <Link
                            style={{
                              textDecoration: "none",
                              color: "rgb(85,26,139)",
                            }}
                            to="/forgetpassword"
                            // variant="body2"
                          >
                            Forget Password?
                          </Link>
                        </Grid>
                      </Grid>

                      {/* <h3>{detail.message}</h3> */}
                      <Grid container justifyContent="center">
                        <Button
                          style={{
                            backgroundColor: "rgba(12,11,69,255)",
                            color: "white",
                            borderRadius: " 28px 28px",
                            padding: "10px 81px",
                            fontSize: "21px",
                            marginTop: "60px",
                          }}
                          // disabled={isSubmitting}
                          variant="outlined"
                          type="submit"
                          // onClick={() => {
                          //   navigate("/sports-center-owners")
                          // }}
                          size="medium"
                          color="primary"
                          className={classes.margin}
                          onClick={(e) => {
                            onSubmit(e);
                          }}
                        >
                          {isLoading === true ? (
                            <CircularProgress Shrink />
                          ) : (
                            ""
                          )}
                          SIGN IN
                        </Button>

                        {/* {isLoading === true ? (
                            <Button
                            style={{
                              backgroundColor: "rgba(12,11,69,255)",
                              color: "white",
                              borderRadius: " 28px 28px",
                              padding: "10px 81px",
                              fontSize: "21px",
                              marginTop: "60px",
                            }}
                            // disabled={isSubmitting}
                            variant="outlined"
                            type="submit"
                            // onClick={() => {
                            //   navigate("/sports-center-owners")
                            // }}
                            size="medium"
                            color="primary"
                            className={classes.margin}
                          >
                            {message && (
                          <div style={{ color: "red" }}>{message}</div>
                        )}
                        </Button>
                          ) : (
                            ""
                          )}
                           */}
                      </Grid>
                      <Grid container className="link">
                        <Grid
                          item
                          container
                          justify="center"
                          style={{ display: "flex" }}
                        >
                          <p style={{ marginRight: "6px", marginTop: "0px" }}>
                            Don't have an account?
                          </p>
                          <Link
                            style={{
                              textDecoration: "none",
                              fontWeight: "bold",
                            }}
                            to="/signup"
                            variant="body2"
                          >
                            {" Sign Up Here!"}
                          </Link>
                        </Grid>
                      </Grid>
                    </form>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </Grid>
    </Grid>
  );
}
