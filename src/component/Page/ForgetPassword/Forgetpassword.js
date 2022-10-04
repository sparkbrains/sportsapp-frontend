import { React, setState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import { Email } from "@material-ui/icons";
import Container from "@material-ui/core/Container";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Forgetpassword.css";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },

  paper: {
    margin: theme.spacing(0, 5),
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
const validationSchema = yup.object({
  email: yup.string().email("Please enter a valid email address.").required(),
});

export default function SignInSide() {
  useEffect(() => {
    document.title = "Forget Password";
  }, []);
  const classes = useStyles();
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // setState({email: e.target.value});
  };
  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  const onSubmit = (e) => {
    console.log(email);
    // e.preventDefault();
    axios
      .post(baseURL+"users/forget-password/step1/",
        {
          email: email,
        }
      )
      .then((res) => {
        setMessage(res.data.status);
        swal("Email sent successfully.", "", "success", {
          button: "ok",
        });
        console.log(res.data.status, "lekkoo");
        //  setState({
        //   email: "",
        // });
      })
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data.status);
          // setMes(error.response.data.gender)
          // Request made and server responded
          console.log(error.response.status);
          console.log(error.response.gender, "hellp");
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        swal("This Email is not found!", "Oops...", "error", {
          button: "ok",
        });
      });
  };

  const formik = useFormik({
    initialValues: { email: "" },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid md={12}>
        <div className="bgimgforgot">
          <Container maxWidth="false">
            <div className="main">
              <Grid
                container
                spacing={3}
                className="secondforgot"
                style={{ margin: "0" }}
              >
                <Grid item xs={12} md={6}>
                  <div className="display" style={{ color: "white" }}>
                    <p1 style={{ fontSize: "20px" }}>WELCOME TO</p1>
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
                    <h4 style={{ color: "white", fontSize: "20px" }}>
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

                <Grid item xs={12} md={6}>
                  <div className={classes.paper} style={{ marginTop: "90px" }}>
                    {/* {message && <div style={{fontSize:"30px"}}>{message}</div>} */}
                    <Typography component="h1" variant="h4" className="Sign">
                      Forgot Password
                    </Typography>
                    <p1 className="p">Fill your registerd Email to get link</p1>

                    <form
                      className={classes.form}
                      method="POST"
                      noValidate
                      onSubmit={formik.handleSubmit}
                    >
                      <InputLabel
                        className="InputLabel"
                        style={{
                          color: "rgba(12,11,69,255)",
                          padding: "5px",
                          display: "flex",
                          fontSize: "15px",
                          fontWeight: "bold",
                          marginTop: "80px",
                          letterSpacing: "2px",
                        }}
                      >
                        <Email className="icon" />
                        EMAIL
                      </InputLabel>
                      <TextField
                        inputProps={{ maxLength: 50 }}
                        error={Boolean(
                          formik.touched.email && formik.errors.email
                        )}
                        fullWidth
                        helperText={formik.touched.email && formik.errors.email}
                        margin="normal"
                        value={formik.values.email}
                        name="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        onKeyUp={handleEmailChange}
                        type="email"
                      />

                      <Grid container justify="center">
                        <Button
                          style={{
                            backgroundColor: "rgba(12,11,69,255)",
                            color: "white",
                            borderRadius: " 28px 28px",
                            padding: "10px 45px",
                            fontSize: "21px",
                            marginTop: "134px",
                          }}
                          // disabled={isSubmitting}
                          type="submit"
                          // href="/Header"
                          variant="outlined"
                          size="medium"
                          color="primary"
                          className={classes.margin}
                        >
                          SEND RESET LINK
                        </Button>
                      </Grid>
                      <Grid container className="link">
                        <Grid item container justify="center">
                          <Link
                            style={{
                              textDecoration: "none",
                              fontWeight: "bold",
                            }}
                            to="/"
                            variant="body2"
                          >
                            {"Sign In here!"}
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
