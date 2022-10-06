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
  const handlesportnoChange = (e) => {
    setsport(e.target.value);
  };
  const [user, setUser] = useState({
    category: "",
    item: "",
    sportcenter: "",
    location: "",
  });
  const { category, item, sportcenter, location } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    document.title = "Edit Category";
    loadUser();
  }, []);
  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  const onSubmit = async (e) => {
    //   e.preventDefault();
    await axios.put(baseURL + `sports/categories/${id}/`, user);
    history.push("/sportscenterowner/categories");
  };

  const loadUser = async () => {
    const result = await axios.get(baseURL + `sports/categories/${id}/`);
    setUser(result.data);
  };

  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const onChange = (event, item) => {
    // console.log(item.props.children)
    // setsport(item.props.children)
    // setAge(event.target.value);
    setUser((prev) => {
      return { ...prev, sport: event.target.value };
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
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
  return (
    <div>
      <Container>
        <h3 style={{ padding: "10px" }}>Edit Category</h3>
        <Paper>
          <div className={classes.root} style={{ padding: "20px" }}>
            <form method="POST" noValidate onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
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
                    onClick={formik.handleChange}
                    // onKeyUp={e => onInputChange(e)}
                    onChange={(e) => onInputChange(e)}
                    value={user.category}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                    onClick={formik.handleChange}
                    // onKeyUp={e => onInputChange(e)}
                    onChange={(e) => onInputChange(e)}
                    autoComplete="sportcenter "
                    type="text"
                    value={user.sportcenter}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
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
                    onClick={formik.handleChange}
                    // onKeyUp={e => onInputChange(e)}
                    onChange={(e) => onInputChange(e)}
                    autoComplete="location "
                    value={user.location}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                    //error={Boolean(touched.location && errors.location)}
                    fullWidth
                    //helperText={touched.location && errors.location}
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    variant="outlined"
                    name="Sport"
                    onClose={handleClose}
                    onKeyUp={handlesportnoChange}
                    onOpen={handleOpen}
                    value={user.sport?.length > 1 && user.sport || 'none'}
                    onChange={onChange}
                    style={{ marginTop: "13px" }}
                  >
                    <MenuItem value="">
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
                      // disabled={isSubmitting}
                      type="submit"
                      style={{
                        backgroundColor: "#232b58",
                        color: "#fff",
                        borderRadius: "25px",
                        width: "165Px",
                        padding: "11px",
                      }}
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
