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
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import swal from "sweetalert";
import { useHistory, useParams } from "react-router-dom";

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

const Editcategory = () => {
  let history = useHistory();
  const { id } = useParams();
  const [sport, setsport] = useState();
  const [message, setMessage] = useState(null);
  const [mes, setMes] = useState(null);
  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  const handlesportnoChange = (e) => {
    setsport(e.target.value);
  };
  const [user, setUser] = useState({
    category: "",
    sport: "",
    sports_center: {
      center_name: "",
    },
    location: "",
  });

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [center, setCenter] = useState();

  const onCenterChange = (e) => {
    setCenter(e.target.value);
  };
  
  useEffect(() => {
    document.title = "Edit Category";
    loadUser();
    handleSports();
  }, []);
  
  const onSubmit = async (e) => {
    // e.preventDefault();
    console.log(center, "eeeee");

    await axios
      .patch(baseURL + `sports/categories/?id=${id}`, {
        category: user.category,
        sport: user.sport,
        // sports_center: center,
        location: user.location,
      })
      .then((res) => {
        setMessage(res.data.message);
        swal("Category Edit Successfully.", "", "success", {
          button: "OK",
        });
      })
      // .catch((err) => { });
      .catch((error) => {
        swal("Something went wrong!", "", "error", {
          button: "OK",
        });
      });
    history.push("/superadmin/categorymanagement");
  };

  const loadUser = async () => {
    const result = await axios.get(baseURL + `sports/categories/?id=${id}`);
    setUser({
      category: result.data.category,
      sports_center: result.data.sports_center.id,
      location: result.data.location,
      sport: result.data.sport,
    });
    console.log(result.data, "userrrr");
  };

  const formik = useFormik({
    initialValues: {
      // category: "",
      // sportcenter: "",
      // location: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const onChange = (event, item) => {
    setUser((prev) => {
      return { ...prev, sport: event.target.value };
    });
  };

  const [sports, setSports] = useState([]);
  const handleSports = async (e) => {
    const resp = await axios.get(
      baseURL + "sports/sports-center/sports-center-owner/"
    );
    // setSportsCenter(resp.data);
    setSports(resp.data);
    console.log(resp.data, "check");
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  console.log(user,'user==');
  return (
    <div>
      <Container>
        <h3 style={{ padding: "10px" }}>Edit Category</h3>
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
                    // error={Boolean(
                    //   formik.touched.category && formik.errors.category
                    // )}
                    fullWidth
                    // helperText={
                    //   formik.touched.category && formik.errors.category
                    // }
                    required
                    margin="normal"
                    category="category"
                    autoComplete="name"
                    name="category"
                    variant="outlined"
                    // onBlur={formik.handleBlur}
                    onChange={(e) => onInputChange(e)}
                    // onClick={formik.handleChange}
                    value={user.category}
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
                     
                    style={{
                      marginTop: "16px",
                    }}
                    error={Boolean(
                      formik.touched.sports_center &&
                        formik.errors.sports_center
                    )}
                    margin="normal"
                    required
                    fullWidth
                    name="sports_center"
                    variant="outlined"
                    helperText={
                      formik.touched.sports_center &&
                      formik.errors.sports_center
                    }
                    onBlur={formik.handleBlur}
                    onClick={formik.handleChange}
                    onChange={(e) => onCenterChange(e)}
                    type="text"
                    disabled
                    value={user?.sports_center}
                  >
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
                    // error={Boolean(
                    //   formik.touched.location && formik.errors.location
                    // )}
                    margin="normal"
                    required
                    fullWidth
                    name="location"
                    variant="outlined"
                    // helperText={
                    //   formik.touched.location && formik.errors.location
                    // }
                    sportcenter="location"
                    // onBlur={formik.handleBlur}
                    onChange={(e) => onInputChange(e)}
                    // onClick={formik.handleChange}
                    autoComplete="location "
                    value={user.location}
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
                    fullWidth
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    variant="outlined"
                    name="Sport"
                    onClose={handleClose}
                    onKeyUp={handlesportnoChange}
                    onOpen={handleOpen}
                    value={(user.sport?.length > 1 && user.sport) || "none"}
                    onChange={onChange}
                    style={{ marginTop: "13px" }}
                  >
                    <MenuItem value="none">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"badminton"}>badminton</MenuItem>
                    <MenuItem value={"football"}>football</MenuItem>
                    <MenuItem value={"shooting"}>shooting</MenuItem>
                    <MenuItem value={"wrestling"}>wrestling</MenuItem>
                    <MenuItem value={"boxing"}>boxing</MenuItem>
                    <MenuItem value={"tennis"}>tennis</MenuItem>
                    <MenuItem value={"squash"}>squash</MenuItem>
                    <MenuItem value={"weightlifting"}>weightlifting</MenuItem>
                    <MenuItem value={"gymnastics"}>gymnastics</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "180px",
                      padding: "20px",
                    }}
                  >
                    <Button
                      variant="contained"
                      //  disabled={isSubmitting}
                      type="submit"
                      style={{
                        backgroundColor: "#232b58",
                        color: "#fff",
                        borderRadius: "25px",
                        width: "165Px",
                        padding: "11px",
                      }}
                      onClick={(e) => onSubmit(e)}
                    >
                      SAVE
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
};
export default Editcategory;
