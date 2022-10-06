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
import { useHistory } from "react-router-dom";
import "./Login.css";
import swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";

const emailRegx = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

// const validationSchema = yup.object({
//   email: yup
//     .string()
//     .email("Please enter a valid email address a@gmail.COM .").matches(emailRegx, "Invalid Email ID...")
//     .required("Email is a required field."),
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
    .matches(
      PASSWORD_REGEX,
      " Passwords must have at least 8 characters and contain at least two of the following: uppercase letters, lowercase letters, numbers, and symbols."
    )
    .required("Password is required."),
});

export default function SignInSide() {
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    document.title = "Sign In";
  }, []);

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
  //const { REACT_APP_API_ENDPOINT } = process.env;
  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  const onSubmit = async (e) => {
    setIsLoading(true);
    const res = await axios
      .post(baseURL + "users/login/", {
        email: email,
        password: password,
      })

      .then((res) => {
        setIsLoading(false);
        setMessage(res.data.message);

        if (res.status === 200) {
          const { token } = res.data.token.access;
          localStorage.setItem("token", res.data.token.access);
          localStorage.getItem("token");

          if (res.data.role === "admin") {
            setSuccess(res.data.message);
            history.push("/superadmin");
          } else if (res.data.role === "coach") {
            setSuccess(res.data.message);
            history.push("/coaches");
          } else if (res.data.role === "user") {
            setSuccess(res.data.message);
            history.push("/user");
          } else if (res.data.role === "") {
            setSuccess(res.data.message);
            history.push("/sportscenterowner");
          } else {
            history.push("/");
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response) {
          setMessage(error.response.data.message, "hello");
          // Request made and server responded
          console.log(error.error, "hello error");
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        swal("please enter valid email and password!", "Oops...", "error", {
          button: "ok",
        });
      });
  };

  //   const parseJwt = (token)=> {
  //     var base64Url = token.split('.')[1];
  //     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //     var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
  //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //     }).join(''));

  //     return JSON.parse(jsonPayload);
  // };

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
                    <h4 style={{ color: "white" }}>
                      {" "}
                      Lorem lpsum ddummycontent
                    </h4>
                    <p className="pp" style={{ color: "white" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      <br />
                      Mauris ac ornare enim{" "}
                    </p>
                  </div>
                </Grid>
                <Grid item md={6} lg={6}>
                  {/* <Paper elevation={0}> */}
                  <div className={classes.paper}>
                    <Typography component="h1" variant="h4" className="Sign">
                      Sign In
                    </Typography>
                    <p className="p">Sign In With Your Email And Password</p>
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
                          fontSize: "15px",
                          letterSpacing: "2px",
                          fontWeight: "bold",
                          marginTop: "80px",
                        }}
                      >
                        <Email className="icon" />
                        EMAIL:
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
                      <InputLabel
                        className="InputLabel"
                        style={{
                          color: "rgba(12,11,69,255)",
                          padding: "5px",
                          display: "flex",
                          fontSize: "15px",
                          letterSpacing: "2px",
                          fontWeight: "bold",
                        }}
                      >
                        <VpnKeyOutlined className="icon" />
                        PASSWORD:
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
                        type="password"
                        value={formik.values.password}
                      />
                      <Grid container spacing={2}>
                        {message && (
                          <div style={{ color: "red" }}>{message}</div>
                        )}
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          style={{ textAlign: "right", fontSize: "16px" }}
                        >
                          <Link
                            style={{ textDecoration: "none" }}
                            to="/forgetpassword"
                            variant="body2"
                          >
                            Forgot Password?
                          </Link>
                        </Grid>
                      </Grid>
                      {isLoading === true ? (
                        <CircularProgress disableShrink />
                      ) : (
                        ""
                      )}

                      {/* <h3>{detail.message}</h3> */}
                      <Grid container justify="center">
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
                          //   history.push("/sports-center-owners")
                          // }}
                          size="medium"
                          color="primary"
                          className={classes.margin}
                        >
                          SIGN IN
                        </Button>
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
