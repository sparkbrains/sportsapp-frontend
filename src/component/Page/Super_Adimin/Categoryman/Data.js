import React, { useEffect, useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { Delete, Edit } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles, alpha } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { AddCircleOutlineOutlined } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import "./category.css";
import swal from "sweetalert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from '@mui/material/Paper';


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 670,
  },
  search: {
    position: "relative",
    variant: "outlined",
    borderRadius: "25px",
    color: "black",

    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(0),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 18),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    top: "0px",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(0)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "auto",
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  },
}));

export default function WidgetLg() {
  const classes = useStyles();
  const [searchTerm, setsearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(null);
  const [setid, SetsetId] = useState();
  const [open, setOpen] = useState(false);
  const baseURL = process.env.REACT_APP_API_ENDPOINT;

  const handleClickOpen = (id) => {
    setOpen(true);
    SetsetId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(baseURL + "sports/categories/");
    setData(result.data.reverse());
  };
  const deleteUser = async (id) => {
    await axios
      .delete(baseURL + `sports/categories/?id=${setid}`)
      .then((res) => {
        setMessage(res.data.message);
        setOpen(false);
        swal("Category Deleted Successfully.", "", "success", {
          button: "ok",
        });
      })
      // .catch((err) => { });
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data.message);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }

        swal("Something went wrong!", "Oops...", "error", {
          button: "ok",
        });
      });
    loadUsers();
  };
  return (
    <>
      <Container>
        <Grid container spacing={3} className="categorymg">
          <Grid
            item
            xs={12}
            sm={7}
            style={{
              padding: "0px",
              marginTop: "30px",
              marginBottom: "20px",
              padding: "12px 0px",
            }}
          >
            <h3> Categories</h3>
          </Grid>
          <Grid
            item
            xs={12}
            sm={5}
            className="butt category"
            style={{
              padding: "45px 0px",
              display: "flex",
            }}
          >
            <div
              className="search"
              style={{ "display": "flex",border: "1px solid black" }}
            >
             
              <InputBase
                onChange={(e) => {
                  setsearchTerm(e.target.value);
                }}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
               <div style={{"margin" : "10px"}}>
                <SearchIcon />
              </div>
            </div>
            <Link
              to="/superadmin/addcategory"
              style={{ textDecoration: "none" }}
            >
              <Button
                className="categorybtn"
                variant="contained"
                type="submit"
                style={{
                  float: "right",
                  textTransform: "capitalize",
                  backgroundColor: "#232b58",
                  color: "white",
                  height: "38px",
                  padding: "2px 6px",
                }}
              >
                <AddCircleOutlineOutlined style={{ marginRight: "6px" }} />
                Add Category
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
      <div className="WidgetLg" style={{ marginBottom: "85px" }}>
        <Paper elevation={3}>
          <TableContainer>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="center"> S.No</TableCell>
                  <TableCell align="left"> Category</TableCell>
                  <TableCell align="left"> Location</TableCell>
                  <TableCell align="left"> Sport Center</TableCell>
                  <TableCell align="left"> Sport</TableCell>
                  <TableCell align="center"> Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data
                  .filter((val) => {
                    if (searchTerm === "") {
                      return val;
                    } else if (
                      val.category
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      val.location
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      val.sport.toLowerCase().includes(searchTerm.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((admin, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell align="center">{i + 1}</TableCell>
                        <TableCell align="left">{admin.category}</TableCell>
                        <TableCell align="left">{admin.location}</TableCell>
                        <TableCell align="left">
                          {admin.sports_center.center_name}
                        </TableCell>
                        <TableCell align="left">{admin.sport}</TableCell>
                        <TableCell align="center">
                          <Link to={`/superadmin/editcategory/${admin.id}`}>
                            <IconButton
                              variant="contained"
                              type="submit"
                              style={{
                                padding: "0",
                                boxShadow: "none",
                                border: "none",
                                background: "none",
                                minWidth: "0px",
                              }}
                            >
                              {" "}
                              <Edit style={{ color: "#17a248" }} />
                            </IconButton>
                          </Link>
                          <IconButton
                            style={{
                              padding: "0",
                              boxShadow: "none",
                              border: "none",
                              background: "none",
                              minWidth: "0px",
                            }}
                          >
                            <Delete
                              //onClick={handleClickOpen}
                               onClick={() => handleClickOpen(admin.id)}
                              style={{ color: "red", margin: "7px" }}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete Category.</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to delete this Category?.
                  </DialogContentText>
                </DialogContent>
                <DialogActions className="Buttonss">
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={() => deleteUser()}>OK</Button>
                </DialogActions>
              </Dialog>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </>
  );
}
