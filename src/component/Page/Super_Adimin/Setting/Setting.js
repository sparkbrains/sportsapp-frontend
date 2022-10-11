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
import swal from 'sweetalert2'
import { useFormik } from "formik";
import "./setting.css";
import { useParams } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import AppLayout from "../../../../layout/appLayout";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    flexGrow:1
  },
  margin: {
    // height: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
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
  return `${value}°C`;
}


export default function Setting() {
  const [getOwner, setGetOwner] = useState();
  const [getCoach, setGetCoach] = useState();
  const [EndUser, setEndUser] = useState();
  const [message, setMessage] = useState(null);
  const [error, seterror] = useState(null);

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
        swal.fire({
          // title: 'Success!',
          text: 'Settings Saved Successfully!!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          seterror(error?.response?.data?.error);
          console.log(error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        swal.fire({
          // title: 'Error!',
          text: 'Something went wrong!!',
          icon: 'error',
          confirmButtonText: 'OK'
        })
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

  function ValueLabelComponent(props) {
    const { children, value } = props;
  
    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }
  
  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    value: PropTypes.number.isRequired,
  };
  

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
    <AppLayout>
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
                  <Typography id="discrete-slider-always" gutterBottom style={{marginBottom:"35px"}}>
                    Sports Center Owner
                  </Typography>

                  <div className="sliderbox">
                    <Slider
                      name="sportcenterowner"
                      valueLabelDisplay="on"
                      value={edit.sportcenterowner}
                      onChange={(e, newVal) => {
                        onChange('sportcenterowner',newVal);
                      }}
                      getAriaValueText={valueText}
                      marks={marks}
                      aria-label="Always visible"
                      components={{
                        ValueLabel: ValueLabelComponent,
                      }}
                    />
                  </div>
                </div>
                <div className={classes.root}>
                  <Typography id="discrete-slider-always" gutterBottom style={{marginBottom:"35px"}}>
                    Coach
                  </Typography>
                  <div className="sliderbox">
                    <Slider
                      aria-label="Always visible"
                      valueLabelDisplay="on"
                      value={edit.coach}
                      onChange={(e,newVal) => {
                        onChange('coach',newVal);
                      }}
                      step={1}
                      marks={marks}
                      name="coach"
                      getAriaValueText={valueText}
                    />
                  </div>
                </div>
                <div className={classes.root}>
                  <Typography id="discrete-slider-always" gutterBottom style={{marginBottom:"35px"}}>
                    User
                  </Typography>
                  <div className="sliderbox">
                    <Slider
                      aria-label="Always visible"
                      valueLabelDisplay="on"
                      value={edit.enduser}
                      onChange={(e, newVal) => {
                        onChange('enduser',newVal);
                      }}
                      step={1}
                      marks={marks}
                      getAriaValueText={valueText}
                      name="enduser"
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
    </AppLayout>
  );
}
