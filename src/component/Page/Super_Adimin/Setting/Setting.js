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
import { useFormik } from "formik";
import "./setting.css";
import { useParams } from "react-router-dom";

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
    value: 50,
    label: "50",
  },

  {
    value: 100,
    label: "100",
  },
];
function valueText(value) {
  return `value%`;
}


export default function DiscreteSlider() {
  const [getOwner, setGetOwner] = useState();
  const [getCoach, setGetCoach] = useState();
  const [EndUser, setEndUser] = useState();
  const [message, setMessage] = useState(null);
  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  const classes = useStyles();
  const handleSubmit = (e) => {
    // e.preventDefault();
    axios
      .patch(baseURL+`sports/setting/1/`,
      edit
      )
      .then((res) => {
        setMessage(res.data.message);
        swal("Settings Saved Successfully.", "", "message", {
          button: "ok",
        });
      })
      .catch((error) => {
        setMessage(error.message);
        swal("Something went wrong!", "Oops...", "error", {
          button: "ok",
        });
      });
  };

  const [edit, setEdit] = useState({
    sportcenterowner: 0,
    enduser : 0,
    coach:0
  });

  const { id } = useParams();


  const loadUser = async () => {
    const result = await axios.get(baseURL+"sports/setting/1/"
    );
    const data = result?.data
    setEdit({
      sportcenterowner: data?.sportcenterowner,
      enduser: data?.enduser,
      coach: data?.coach
    })
  }

  const formik = useFormik({
    initialValues: {
      id:"",
      sportcenterowner: "",
      coach: "",
      enduser: "",
    },
    validateOnBlur: true,
    handleSubmit
  });

  // const handleOwnerChange = (e, newVal) => {
  //   setGetOwner(newVal);
  // }

  // const handleCoachChange = (e, newVal) => {
  //   setGetCoach(newVal);
  // }

  // const handleEndChange = (e, newVal) => {
  //   setEndUser(newVal);
  // }

  useEffect(() => {
    document.title = "Setting";
    loadUser()
  }, []);
  const onChange=(name,val)=>{
    setEdit({
      ...edit,
      [name]:val
    })
  }
  return (
    <div>
      <Container>
        <h3 style={{ fontSize: "17px", color: "#111944", fontWeight: "500" }}>
          Settings
        </h3>
        <Paper elevation={3} style={{ marginBottom: "100px" }}>
          <form method="POST" noValidate>
            {/* {message && <div style={{ color: "red" }}>{message}</div>} */}
            <Container maxwidth="sm">
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
                      name="sportcenterowner"
                      // defaultValue={50}
                      aria-label="Default"
                      valueLabelDisplay="auto"
                      value={edit.sportcenterowner}
                      onChange={(e, newVal) => {
                        onChange('sportcenterowner',newVal);
                      }}
                      // getAriaValueText={valueText}
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
                    sx={{
                      '& input[type="range"]': {
                        WebkitAppearance: 'slider-horizontal',
                      },
                    }}
                      // defaultValue={50}
                      aria-label="Default"
                      valueLabelDisplay="auto"
                      value={edit.coach}
                      onChange={(e,newVal) => {
                        onChange('coach',newVal);
                      }}
                      step={1}
                      marks={marks}

                      // getAriaValueText={(val) =>valueText(v/al)}
                    />
                  </div>
                </div>
                <div className={classes.root}>
                  <Typography id="discrete-slider-always" gutterBottom>
                    End User
                  </Typography>
                  <div className="sliderbox">
                    <Slider
                    sx={{
                      '& input[type="range"]': {
                        WebkitAppearance: 'slider-horizontal',
                      },
                    }}
                      // defaultValue={50}
                      aria-label="Default"
                      valueLabelDisplay="auto"
                      value={edit.enduser}
                      onChange={(e, newVal) => {
                        onChange('enduser',newVal);
                      }}
                      step={1}
                      marks={marks}

                      // getAriaValueText={(val) =>{valueText(val)}}
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
                    onClick={(e) => handleSubmit(e)}
                  >
                    SAVE
                  </Button>
                </div>
              </Grid>
            </Container>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
