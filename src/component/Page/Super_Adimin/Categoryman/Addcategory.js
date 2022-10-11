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
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import AppLayout from "../../../../layout/appLayout";

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
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
  sports_center: yup.string().required("Sport Center is required."),
  location: yup.string().required("Location is required.").matches(/^[a-zA-Z0-9\s,'-]*$/, "Alpha-Numeric Characters Required."),
  sport: yup
    .string()
    .max(25, "Must be 25 characters or less.")
    .required("Sport is required.").matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
});

export default function Addcategory() {
  useEffect(() => {
    document.title = "Add Category";
    handleSports();
  }, []);

  let navigate = useNavigate();

  const [category, setcategory] = useState();
  const handlecategoryChange = (e) => {
    setcategory(e.target.value);
  };
  const [location, setlocation] = useState();
  const handlelocationChange = (e) => {
    setlocation(e.target.value);
  };
  const [sportsCenter, setsportCenter] = useState("");
  const handlesportcenterChange = (e) => {
    setsportCenter(e.target.value);
  };
  const [sport, setsport] = useState("");
  const handlesportonChange = (e) => {
    setsport(e.target.value);
  };
  const token = localStorage.getItem("token");
  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  const onSubmit = async (e) => {
    const res = await axios
      .post(
        baseURL + "sports/categories/",
        {
          category: category,
          sport: sport,
          location: location,
          sports_center: sportsCenter,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        swal("Category Created Successfully.", "", "success", {
          button: "OK",
        }).then(d=>{
        navigate("/categorymanagement");
        });
      })
      .catch((error) => {
        swal("Something went wrong!", "", "error", {
          button: "OK",
        });
      });
  };
  const formik = useFormik({
    initialValues: {
      category: "",
      sport: "",
      sports_center: "",
      location: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  const [sports, setSports] = useState([]);
  const handleSports = async (e) => {
    const resp = await axios.get(
      baseURL + "sports/sports-center/sports-center-owner/"
    );
    // setSportsCenter(resp.data);
    setSports(resp.data);
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const onChange = (event, item) => {
    setsport(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <AppLayout>
      <Container>
        <h3 style={{ padding: "10px" }}>Add New Category</h3>
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
                    Category
                  </InputLabel>
                  <TextField
                    inputProps={{ maxLength: 50 }}
                    error={Boolean(
                      formik.touched.category && formik.errors.category
                    )}
                    fullWidth
                    helperText={
                      formik.touched.category && formik.errors.category
                    }
                    required
                    margin="normal"
                    category="category"
                    autoComplete="name"
                    name="category"
                    variant="outlined"
                    onBlur={formik.handleBlur}
                    onChange={(e)=>{handlecategoryChange(e);formik.handleChange(e)}}
                  />
                </Grid>
                <Grid item sm={12} md={6}>
                  <InputLabel
                    id="sports_center"
                    name="sports_center"
                    className="Input"
                    style={{
                      color: "rgba(12,11,69,255)",
                      display: "flex",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    Sport Center
                  </InputLabel>
                  <Select
                    inputProps={{ maxLength: 30 }}
                    error={Boolean(
                      formik.touched.sports_center &&
                        formik.errors.sports_center
                    )}
                    style={{
                      marginTop: "16px",
                    }}
                    margin="normal"
                    required
                    fullWidth
                    name="sports_center"
                    variant="outlined"
                    displayEmpty
                    helperText={
                      formik.touched.sports_center &&
                      formik.errors.sports_center
                    }
                    onKeyUp={formik.dirty}
                    onBlur={formik.handleBlur}
                    onChange={(e)=>{handlesportcenterChange(e);formik.handleChange(e)}}
                    value={sportsCenter}
                  >
                    <MenuItem disabled value="">
                      <em>---Select Sport Center---</em>
                    </MenuItem>
                    {sports?.map((val) => {
                      const { id, center_name } = val;
                      return (
                        <MenuItem value={id} key={id}>
                          {center_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
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
                    Location
                  </InputLabel>
                  <TextField
                    inputProps={{ maxLength: 50 }}
                    error={Boolean(
                      formik.touched.location && formik.errors.location
                    )}
                    margin="normal"
                    required
                    fullWidth
                    name="location"
                    variant="outlined"
                    helperText={
                      formik.touched.location && formik.errors.location
                    }
                    onBlur={formik.handleBlur}
                    onKeyUp={handlelocationChange}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item sm={12} md={6}>
                  <InputLabel
                    id="sport"
                    className="Input"
                    style={{
                      color: "rgba(12,11,69,255)",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    Sport
                  </InputLabel>
                  <Select
                    error={Boolean(formik.touched.sport && formik.errors.sport)}
                    fullWidth
                    helperText={formik.touched.sport && formik.errors.sport}
                    inputProps={{ maxLength: 50 }}
                    open={open}
                    variant="outlined"
                    name="sport"
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={sport}
                    onChange={(e)=>{onChange(e);formik.handleChange(e)}}
                    defaultValue="Select"
                    displayEmpty
                    style={{ marginTop: "13px" }}
                  >
                    <MenuItem disabled value="">
                      <em>---Select Sport---</em>
                    </MenuItem>
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
                        fontSize: "17px",
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
    </AppLayout>
  );
}
