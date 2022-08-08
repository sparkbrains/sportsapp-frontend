import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { useEffect } from "react";
import axios from "axios";
import swal from 'sweetalert';
import "./setting.css";
const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 100,
    label: "100",
  },
];
function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSlider() {
  const [getOwner, setgetOwner] = useState();
  const [getCoach, setgetCoach] = useState();
  const [EndUser, setEndUser] = useState();
  const [message, setMessage] = useState(null);
  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  console.log(EndUser, "EndUseraa");
  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(getOwner, EndUser, getCoach);

    axios
      .post(baseURL+"sports/setting/",
        {
          sportcenterowner: getOwner,
          coach: getCoach,
          enduser: EndUser,
        }
      )
      .then((res) => {
        setMessage(res.data.message);
        swal("Settings Saved Successfully.", "", "success", {
          button: "ok",
        });
      })
      // .catch((err) => { });
      .catch(function (error) {
        setMessage(error.message);
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
      });
  };

  useEffect(() => {
    document.title = "Setting";
  }, []);

  return (
    <div>
      <Container>
        <h3 style={{ fontSize: "17px", color: "#111944", fontWeight: "500" }}>
          Settings
        </h3>
        <Paper elevation={3} style={{ marginBottom: "100px" }}>
          <form method="POST" noValidate>
            {/* {message && <div style={{ color: "red" }}>{message}</div>} */}
            <container maxWidth="sm">
              <h3
                style={{
                  paddingTop: "31px",
                  paddingLeft: "30px",
                  fontSize: "17px",
                  fontWeight: "500",
                  color: "#111944",
                }}
              >
                Payment Commission Management
              </h3>
              <div style={{ padding: "14px 30px", color: "#111944" }}>
                <div className={classes.root}>
                  <Typography id="discrete-slider-always" gutterBottom>
                    Sport Center Owner
                  </Typography>

                  <div className="sliderbox">
                    <Slider
                      defaultValue={50}
                      aria-label="Default"
                      valueLabelDisplay="on"
                      value={getOwner}
                      onChange={(e, d) => {
                        setgetOwner(d);
                      }}
                      marks={marks}
                    />
                  </div>
                </div>
                <div className={classes.root}>
                  <Typography id="discrete-slider-always" gutterBottom>
                    Coach
                  </Typography>
                  <div className="sliderbox">
                    <Slider
                      defaultValue={50}
                      aria-label="Default"
                      valueLabelDisplay="on"
                      value={getCoach}
                      onChange={(e, d) => {
                        setgetCoach(d);
                      }}
                      marks={marks}
                    />
                  </div>
                </div>
                <div className={classes.root}>
                  <Typography id="discrete-slider-always" gutterBottom>
                    End User
                  </Typography>
                  <div className="sliderbox">
                    <Slider
                      defaultValue={50}
                      aria-label="Default"
                      valueLabelDisplay="on"
                      value={EndUser}
                      onChange={(e, d) => {
                        setEndUser(d);
                      }}
                      marks={marks}
                    />
                  </div>
                </div>
              </div>
              <Grid item xs={12} sm={12}>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "50px",
                    padding: "20px",
                  }}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    // onSubmit={handleSubmit}
                    // onSubmit={handleSubmit}
                    component="label"
                    style={{
                      backgroundColor: "#232b58",
                      color: "#fff",
                      borderRadius: "25px",
                      width: "140Px",
                      height: "45px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      padding: "26px 95px",
                    }}
                    onClick={handleSubmit}
                  >
                    SAVE
                  </Button>
                </div>
              </Grid>
            </container>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
