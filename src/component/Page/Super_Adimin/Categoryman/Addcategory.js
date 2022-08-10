import React, { setState, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import { useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { useHistory} from "react-router-dom";
import swal from "sweetalert";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
const validationSchema = yup.object({
  category: yup
    .string()
    .max(25, "Must be 25 characters or less.")
    .required("Category is required.")
    .matches(/^[A-Za-z ]*$/, 'Only alphabets are required.'),
  // sportcenter: yup
  //   .string()
  //   .max(25, "Must be 25 characters or less.")
  //   .required("Sportcenter is required.")
  //   .matches(/^[A-Za-z ]*$/, 'Only alphabets are required.'),
  location: yup.string().required("Location is required."),
  
});


export default function SignInSide() {
  useEffect(() => {
    document.title = "Add Category";
  }, []);

  let history = useHistory();

  const [category, setcategory] = useState();
  const handlecategoryChange = (e) => {
    setcategory(e.target.value);
  };
  const [location, setlocation] = useState();
  const handlelocationChange = (e) => {
    setlocation(e.target.value);
  };
  const [sports_center, setsportcenter] = useState();
  const handlesportcenterChange = (e) => {
    setsportcenter(e.target.value);
  };
  const [sport, setsport] = useState("football");
  const handlesportonChange = (e) => {
    setsport(e.target.value);
  };
  const token = localStorage.getItem('token')
  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  const onSubmit = async (e) => {
   const res = await axios
      .post(baseURL+"sports/categories/",
        {
          category: (category),
          sport: (sport),
          sports_center: (sports_center),
          location: (location),
        },
        { "headers": {"Authorization" : `Bearer ${token}`} }
        
      )
      .then((res) => {
        console.log(res, "ssssssankul");
        swal("Category Created Successfully.", "", "success", {
          button: "ok",
        });
        history.push("/superadmin/categorymanagement")
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.gender, "hellp1234567890");
          console.log(error.response.status);
          console.log(error.response.gender, "hellp");
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
  
        swal("Something went wrong!", "Oops...", "error", {
          button: "ok",
        });
      });
     
     
  };
  const formik = useFormik({
    initialValues: {
        category: "",
        // sportcenter: "",
        location: "",
        
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });


  const classes = useStyles();
  const [age, setAge] = React.useState("football");
  const [open, setOpen] = React.useState(false);
  const onChange = (event, item) => {
    console.log(item.props.children);
    setsport(item.props.children);
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <Container>
        <h3 style={{ padding: "10px" }}>Add Category</h3>
        <Paper elevation={3}>
              <div className={classes.root} style={{ padding: "20px" }}>
                <form method="POST" noValidate onSubmit={formik.handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item sm={12} md={6}>
                      <InputLabel
                        className="Input"
                        style={{
                          color: "rgba(12,11,69,255)",
                          display: "flex",
                          fontSize: "15px",
                          fontWeight: "bold",
                        }}
                      >
                        Category:
                      </InputLabel>
                      <TextField
                      inputProps={{ maxLength: 50 }}
                        error={Boolean(formik.touched.category && formik.errors.category)}
                        fullWidth
                        helperText={formik.touched.category && formik.errors.category}
                        required
                        margin="normal"
                        category="category"
                        autoComplete="name"
                        name="category"
                        variant="outlined"
                        onBlur={formik.handleBlur}
                        onKeyUp={handlecategoryChange}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid item sm={12} md={6}>
                      <InputLabel
                        className="Input"
                        style={{
                          color: "rgba(12,11,69,255)",
                          display: "flex",
                          fontSize: "15px",
                          fontWeight: "bold",
                        }}
                      >
                        Sport Center:
                      </InputLabel>
                      <TextField
                      inputProps={{ maxLength: 30 }}
                        // error={Boolean(
                        //   formik.touched.sportcenter && formik.errors.sportcenter
                        // )}
                        margin="normal"
                        required
                        fullWidth
                        name="sports_center"
                        variant="outlined"
                        helperText={formik.touched.sportcenter && formik.errors.sportcenter}
                        sportcenter="sports_center "
                        onBlur={formik.handleBlur}
                        onKeyUp={handlesportcenterChange}
                        onChange={formik.handleChange}
                        autoComplete="sports_center "
                        type="text"
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item sm={12} md={6}>
                      <InputLabel
                        className="Input"
                        style={{
                          color: "rgba(12,11,69,255)",
                          display: "flex",
                          fontSize: "15px",
                          fontWeight: "bold",
                        }}
                      >
                        Location:
                      </InputLabel>
                      <TextField
                      inputProps={{ maxLength: 50 }}
                        error={Boolean(formik.touched.location &&formik.errors.location)}
                        margin="normal"
                        required
                        fullWidth
                        name="location"
                        variant="outlined"
                        helperText={formik.touched.location && formik.errors.location}
                        sportcenter="location "
                        onBlur={formik.handleBlur}
                        onKeyUp={handlelocationChange}
                        onChange={formik.handleChange}
                        autoComplete="location "
                      />
                    </Grid>
                    <Grid item sm={12} md={6}>
                      <InputLabel
                        className="Input"
                        style={{
                          color: "rgba(12,11,69,255)",
                          fontSize: "15px",
                          fontWeight: "bold",
                        }}
                      >
                        Sport:
                      </InputLabel>
                      <Select
                        error={Boolean(formik.touched.location && formik.errors.location)}
                        fullWidth
                        helperText={formik.touched.location && formik.errors.location}
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        variant="outlined"
                        name="Sport"
                        onClose={handleClose}
                        onKeyUp={handlesportonChange}
                        onOpen={handleOpen}
                        value={age}
                        onChange={onChange}
                        defaultValue="football"
                        style={{ marginTop: "13px" }}
                      >
                        {/* <MenuItem value="">
                          <em>None</em>
                        </MenuItem> */}
                        <MenuItem value="badminton">badminton</MenuItem>
                        <MenuItem value="football">football</MenuItem>
                        <MenuItem value="shooting">shooting</MenuItem>
                        <MenuItem value="wrestling">wrestling</MenuItem>
                        <MenuItem value="boxing">boxing</MenuItem>
                        <MenuItem value="tennis">tennis</MenuItem>
                        <MenuItem value="squash">squash</MenuItem>
                        <MenuItem value="weightlifting">weightlifting</MenuItem>
                        <MenuItem value="gymnastics">gymnastics</MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item sm={12} md={12}>
                      <div
                        style={{
                          textAlign: "center",
                          marginTop: "180px",
                          padding: "20px",
                        }}
                      >
                        <Button
                          variant="contained"
                        //   disabled={isSubmitting}
                          type="submit"
                          style={{
                            backgroundColor: "#232b58",
                            color: "#fff",
                            borderRadius: "25px",
                            width: "165Px",
                            padding: "11px",
                            fontSize:"17px"
                          }}
                        >
                          ADD CATEGORY
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </form>
              </div>
        </Paper>
      </Container>
    </div>
  );
}
