import React, { useState } from "react";
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
import swal from "sweetalert2";

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
  sportcenter: yup
    .string()
    .max(25, "Must be 25 characters or less.")
    .required("Sportcenter is required.")
    .matches(/^[A-Za-z ]*$/, "Only alphabets are required."),
  location: yup.string().required("Location is required."),
});

export default function SignInSide() {
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
  const [sportcenter, setsportcenter] = useState();
  const handlesportcenterChange = (e) => {
    setsportcenter(e.target.value);
  };
  const [sport, setsport] = useState("football");
  const handlesportonChange = (e) => {
    setsport(e.target.value);
  };

  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  const onSubmit = async (e) => {

    const res = await axios
      .post(baseURL + "sports/categories/", {
        category: category,
        sport: sport,
        sportcenter: sportcenter,
        location: location,
      })
      .then((res) => {
        swal("Coach Created Successfully.", "", "success", {
          button: "ok",
        });
        navigate("/categorymanagement");
      })
      // .catch((err) => { });
      .catch(function (error) {
        swal("Something went wrong!", "Oops...", "error", {
          button: "ok",
        });
      });
  };
  const formik = useFormik({
    initialValues: {
      category: "",
      sportcenter: "",
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
  const [age, setAge] = React.useState("football");
  const [open, setOpen] = React.useState(false);
  const onChange = (event, item) => {
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
                  <Select
                    inputProps={{ maxLength: 30 }}
                    error={Boolean(
                      formik.touched.sportcenter && formik.errors.sportcenter
                    )}
                    margin="normal"
                    required
                    fullWidth
                    name="sportcenter"
                    variant="outlined"
                    helperText={
                      formik.touched.sportcenter && formik.errors.sportcenter
                    }
                    sportcenter="sportcenter "
                    onBlur={formik.handleBlur}
                    // onKeyUp={handlesportcenterChange}
                    onChange={handlesportcenterChange}
                    autoComplete="sportcenter"
                    value={sportcenter}
                    // type="text"
                  >
                    <MenuItem disabled value="">
                      <em>Select Sport Center</em>
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
                    Location:
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
                  {/* <Select
                  placeholder="Year"
                  value={selectedYear}
                  onChange={selectedOption => {
                    handleYearChange(selectedOption);
                    // handleChange("year")(selectedOption.value);
                  }}
                  isSearchable={true}
                  options={yearOptions}
                  name="year"
                  isLoading={false}
                  loadingMessage={() => "Fetching year"}
                  noOptionsMessage={() => "Year appears here"}
                /> */}

                  <Select
                    fullWidth
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    variant="outlined"
                    onClose={handleClose}
                    name="Sport"
                    onOpen={handleOpen}
                    onKeyUp={handlesportonChange}
                    value={age}
                    onChange={onChange}
                    defaultValue="football"
                    style={{ marginTop: "13px" }}
                  >
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
                      onClick={(e) => {onSubmit(e)}}
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
    </div>
  );
}
