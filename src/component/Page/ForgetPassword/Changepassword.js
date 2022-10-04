import { React, setState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Forgetpassword.css";
import swal from "sweetalert";
import { VpnKeyOutlined } from "@material-ui/icons";
import { useParams } from "react-router-dom";

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

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
// gendr: yup
// .string()
//   .required("Required") ,
const validationSchema = yup.object({
  password: yup
    .string()
    .matches(PASSWORD_REGEX, "Please enter a strong password")
    .required(),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Password does not match"),
    }),
});

export default function SignInSide() {
  useEffect(() => {
    document.title = "Change Password";
  }, []);
  const classes = useStyles();
  // const data ={
  //   token: this.props.match.params.id,
  //   password: this.password,
  //   password_confirm: this.password_confirm

  // }
  // console.log(data,"token");
  // const params = useParams();
  const { id } = useParams();
  const parts = id.split("&");
  let query_string = parts[0];
  let email = parts[1];

  // console.log(path,"hello boss");

  const [data, setData] = useState([]);
  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  useEffect(() => {
    axios
      .post(baseURL+"users/forget-password/step2/",
        {
          query_string,
          email,
        }
      )
      .then((res) => {
        setData(res.data);
      });
  }, [id]);

  const [message, setMessage] = useState(null);
  const [password, setPassword] = useState();
  const handlePasswordonChange = (e) => {
    setPassword(e.target.value);
  };
  const onSubmit = async (e) => {
    // e.preventDefault();
    const res = await axios
      .post(baseURL+"users/forget-password/step3/",
        {
          email,
          password: password,
        }
      )
      .then((res) => {
        setMessage(res.data.success);
        swal("Password Changed Successfully", "", "success", {
          button: "ok",
        });
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit,
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
                    {message && (
                      <div style={{ fontSize: "25px" }}>{message}</div>
                    )}
                    <Typography component="h1" variant="h4" className="Sign">
                      Change Password
                    </Typography>
                    <p1 className="p">Fill your new password.</p1>
                    <form
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
                        }}
                      >
                        <VpnKeyOutlined className="icon" />
                        NEW PASSWORD
                      </InputLabel>
                      <TextField
                        inputProps={{ maxLength: 40 }}
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
                        CONFIRM NEW PASSWORD
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
                          Change Password
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
