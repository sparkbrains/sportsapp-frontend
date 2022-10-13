import React from "react";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { IconButton, Button } from "@material-ui/core";
import { makeStyles, alpha } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { AddCircleOutlineOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import { Delete, Edit, SaveAlt } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { TableBody } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import "./sportscenterowner.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import swal from "sweetalert2";
import zIndex from "@material-ui/core/styles/zIndex";
import AppLayout from "../../../../layout/appLayout";
import Pagination from "../../Pagination";


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 670,
  },
  search: {
    variant: "outlined",
    borderRadius: "25px",
    color: "black",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    padding: "10px",
    width: "100%",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "160px",
    },
  },

  search_bar: {
    textAlign: "left",
    padding: "20px",
    marginLeft: "20px",
    zIndex: "0",
  },

  icon: {
    // position:"absolute",
    // left:"10%",
    // top:"10%"
  },

  searchIcon: {
    padding: theme.spacing(0, 18),
    margin: "auto",
    // height: "50%",
    // marginLeft:theme.spacing(10),
    zIndex: "1",
    // marginRight:"50px",
    marginTop: theme.spacing(5),
    pointerEvents: "none",
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
      width: "15ch",
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

export default function Sportscenterowner() {
  const [data, setData] = useState([]);
  const classes = useStyles();
  const [searchTerm, setsearchTerm] = useState("");
  const [setid, SetsetId] = useState();
  const [message, setMessage] = useState(null);
  const [open, setOpen] = React.useState(false);
  const baseURL = process.env.REACT_APP_API_ENDPOINT;

  const handleClickOpen = (id) => {
    setOpen(true);
    SetsetId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    document.title = "SC Owner Management";
    loadUsers();
  }, []);

  const deleteUser = async () => {
    await axios
      .delete(baseURL + `sports/owner/?id=${setid}`)
      .then((res) => {
        setMessage(res.data.message);
        setOpen(false);
        
        swal.fire({
          // title: 'Error!',
          confirmButtonColor: '#232B58',
          text: 'Owner Deleted Successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        })
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

        swal.fire({
          // title: 'Error!',
          confirmButtonColor: '#232B58',
          text: 'Something went wrong!!',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      });
    loadUsers();
  };

  const loadUsers = async () => {
    const result = await axios.get(baseURL + "sports/owner/");
    setData(result.data.reverse());
  };

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([document.getElementById("input").value], {
      type: "text/plain;charset=utf-8}",
    });
    element.href = "./Files/one.csv";
    element.download = "one.csv";
    element.click();
  };

  return (
    <AppLayout>
      <Container maxWidth="lg">
        <Grid container spacing={3} className="owners">
          <Grid
            item
            xs={6}
            style={{ padding: "0px", marginTop: "30px", marginBottom: "20px" }}
          >
            <h3
              className="topheading
            "
            >
              {" "}
              Sports Center Owners
            </h3>
          </Grid>
          <Grid
            className="buttons"
            item
            xs={6}
            style={{
              padding: "45px 14px",
              display: "flex",
              justifyContent: "end",
            }}
          >
            {/* <div className="search" style={{ "display": "flex", border: "1px solid black " }}>
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
                className="search_bar"
              >
              </InputBase>

              <div style={{"margin" : "10px"}}>
                <SearchIcon />
              </div>
            </div> */}

            <Link to="/addnew" style={{ textDecoration: "none" }}>
              <Button
                className="add-btn"
                variant="contained"
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
                Add New SC Owner
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <div className="WidgetLg" style={{ marginBottom: "85px" }}>
          <TableContainer>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="center"> S.No.</TableCell>
                  <TableCell align="left"> Name </TableCell>
                  <TableCell align="left"> Location </TableCell>
                  <TableCell align="left"> Sports Center</TableCell>
                  <TableCell align="left"> Contact </TableCell>
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
                      //   ||
                      // val.name.toLowerCase().includes(searchTerm.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((admin, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell align="center">{i + 1}</TableCell>
                        <TableCell align="left">
                          {data[i]?.user?.name}
                        </TableCell>
                        <TableCell align="left">{admin.location}</TableCell>
                        <TableCell align="left">
                          {admin.sports_center.center_name}
                        </TableCell>
                        <TableCell align="left">
                          {data[i]?.profile?.phone_no}
                        </TableCell>
                        <TableCell align="center">
                          <Link to={`/editnew/${admin.id}`}>
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
                              <Edit
                                style={{ color: "#17a248", margin: "-5px" }}
                              />
                            </IconButton>
                          </Link>
                          <IconButton
                            onClick={() => handleClickOpen(admin.id)}
                            style={{
                              padding: "0",
                              boxShadow: "none",
                              border: "none",
                              background: "none",
                              minWidth: "0px",
                            }}
                          >
                            <Delete style={{ color: "red", margin: "8px" }} />
                          </IconButton>

                          {/* <IconButton
                            onClick={downloadTxtFile}
                            style={{
                              padding: "0",
                              boxShadow: "none",
                              border: "none",
                              background: "none",
                              minWidth: "0px",
                            }}
                          >
                            <SaveAlt />
                          </IconButton> */}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete Owner</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to delete this Owner?
                  </DialogContentText>
                </DialogContent>
                <DialogActions className="Buttonss">
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={() => deleteUser()}>OK</Button>
                </DialogActions>
              </Dialog>
            </Table>
          </TableContainer>
        </div>
        <Pagination data={data}/>
      </Container>
    </AppLayout>
  );
}


