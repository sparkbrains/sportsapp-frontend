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
import swal from "sweetalert";

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
      width: "160px",
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
      width: "15ch",
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
  },
}));

export default function BasicTable() {
  const [data, setData] = useState([]);
  const classes = useStyles();
  const [searchTerm, setsearchTerm] = useState("");
  const [setid ,SetsetId] =useState()
  const [message, setMessage] = useState(null);
  const [open, setOpen] = React.useState(false);
  const baseURL = process.env.REACT_APP_API_ENDPOINT;

  const handleClickOpen = (id) => {
    setOpen(true);
    SetsetId(id)
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    document.title = "SC Owner Management";
    loadUsers();
  }, []);

  const deleteUser = async () => {
    console.log(setid, "id===");
    await axios
      .delete(baseURL + `sports/owner/?id=${setid}`)
      .then((res) => {
        setMessage(res.data.message);
        setOpen(false);
        console.log(res, "ssssssankul");
        swal("Owner Deleted Successfully.", "", "success", {
          button: "ok",
        });
      })
      // .catch((err) => { });
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data.message);

          // Request made and server responded
          console.log(error.response.data.gender, "hellp1234567890");
          console.log(error.response.status);
          console.log(error.response.gender, "hellp");
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
    const result = await axios.get(baseURL + "sports/owner/");
    setData(result.data.reverse());
    console.log(data, "ankul1234");
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
    <>
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
            <div
              className={classes.search}
              style={{ border: "1px solid black " }}
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
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
            </div>
         
            <Link to="/superadmin/addnew" style={{ textDecoration: "none" }}>
              <Button
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
                Add New
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
                  <TableCell align="center"> S.No</TableCell>
                  <TableCell align="left"> Name</TableCell>
                  <TableCell align="left"> Location</TableCell>
                  <TableCell align="left"> Sport Center</TableCell>
                  <TableCell align="left"> Contact No.</TableCell>
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
                        .includes(searchTerm.toLowerCase()) ||
                      val.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                          {admin.sports_center}
                        </TableCell>
                        <TableCell align="left">
                          {data[i]?.profile?.phone_no}
                        </TableCell>
                        <TableCell align="center">
                          <Link to={`/superadmin/editnew/${admin.id}`}>
                            <IconButton
                              variant="contained"
                              type="submit"
                              style={{
                                padding: "0",
                                boxShadow:"none",
                                border:"none",
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
//onClick={handleClickOpen}
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

                          <IconButton
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
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
              <Dialog
                style={{ opacity: "0.6" }}
                open={open}
                onClose={handleClose}
              >
                <DialogTitle>Delete Owner</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to delete this Owner?.
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
      </Container>
    </>
  );
}
