import { React } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "./Signup.css";
import { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Ownersignup  from './Ownersignup ';

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
 function SignInSide({ match }) {
  console.log(match, "login match");

  useEffect(() => {
    document.title = "Sign Up User";
  }, []);
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid md={12}>
        <div className="bgimg1">
            <Container maxWidth="false">
              <div className="main">
                <Grid container spacing={2} style={{ margin: "0" }}>
                  <Grid item md={6} lg={6}>
                    <div
                      className="display"
                      style={{ color: "white", marginTop: "280px" }}
                    >
                      <p style={{ fontSize: "20px" }}>WELCOME TO</p>
                      <Typography
                        component="h1"
                        variant="h5"
                        className="Sig"
                        style={{ fontSize: "60px" }}
                      >
                        Sports App
                        <hr
                          style={{
                            width: "50%",
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
                        Lorem ipsun dolor sit, consectetur adipiscing elit.
                        <br />
                        Mauris ac ornare enim{" "}
                      </p>
                    </div>
                  </Grid>

                  <Grid item md={6} lg={6}>
                
                    <Container>
                      
                      <Ownersignup />
                    </Container>
                  </Grid>
                </Grid>
              </div>
            </Container>
        </div>
      </Grid>
    </Grid>
  );
}
export default SignInSide;

// : http://192.168.18.123:8000/api/token/
