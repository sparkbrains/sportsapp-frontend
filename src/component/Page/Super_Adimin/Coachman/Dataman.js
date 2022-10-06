import React, { useEffect, useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import { Delete, Edit } from "@material-ui/icons";
import { Button, IconButton } from "@material-ui/core";
import axios from "axios";
import { TableBody } from "@material-ui/core";
import { makeStyles, alpha } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { AddCircleOutlineOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import "./dataman.css";
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
      marginLeft: theme.spacing(3),
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
  const [data, setData] = useState([]);
  const classes = useStyles();
  const [searchTerm, setsearchTerm] = useState("");
  const [message, setMessage] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [setid, SetsetId] = useState();
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
  const token = localStorage.getItem("token");
  const deleteUser = async () => {
    await axios
      .delete(baseURL + `sports/coach/?id=${setid}`)
      .then((res) => {
        setMessage(res.data.message);
        setOpen(false);
        swal("Coach Deleted Successfully.", "", "success", {
          button: "ok",
        });
      })
      // .catch((err) => { });
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data.message);

          // Request made and server responded

        } else if (error.request) {
          // The request was made but no response was received
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

  const loadUsers = async () => {
    const result = await axios.get(baseURL + "sports/coach/");
    setData(result.data.reverse());
  };
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={3} className="coachmg">
          <Grid
            item
            xs={6}
            style={{
              padding: "0px",
              marginTop: "30px",
              marginBottom: "20px",
              padding: "12px 0px",
            }}
          >
            <h3> Coach Management</h3>
          </Grid>
          <Grid
            className="buttons"
            item
            xs={6}
            style={{
              padding: "45px 0px",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <div
              className={classes.search}
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
                <SearchIcon/>
              </div>
            </div>

            <Link to="/superadmin/addcoach" style={{ textDecoration: "none" }}>
              <Button
                className="coachmgbtn"
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
                Add Coach
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
                  <TableCell align="left"> Name</TableCell>
                  <TableCell align="left"> Location</TableCell>
                  <TableCell align="left">Sport Center</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="center"> Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data
                  .filter((val) => {
                    if (searchTerm === "") {
                      return val;
                    } else if (
                      val.location
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) 
                    ) {
                      return val;
                    }
                  })
                  .map((admin, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell align="center">{i + 1}</TableCell>
                        <TableCell align="left">{admin?.user?.name}</TableCell>
                        <TableCell align="left">{admin.location}</TableCell>
                        <TableCell align="left">
                          {admin?.sports_center?.center_name}
                        </TableCell>
                        <TableCell align="left">{admin?.user?.email}</TableCell>
                        <TableCell align="center">
                          <Link to={`/superadmin/editcoach/${admin.id}`}>
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
                          <Button
                            onClick={() => handleClickOpen(admin.id)}
                            style={{
                              padding: "0",
                              boxShadow: "none",
                              border: "none",
                              background: "none",
                              minWidth: "0px",
                            }}
                          >
                            <Delete style={{ color: "red", margin: "7px" }} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete Coach.</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to delete this Coach?.
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
