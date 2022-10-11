import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { Settings } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import { makeStyles, alpha } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { Link } from "react-router-dom";
import { RemoveRedEye } from "@material-ui/icons";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import "./sportc.css";

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
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "16ch",
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
  const [data, setData] = useState([]);
  const [searchTerm, setsearchTerm] = useState([]);

  useEffect(() => {
    axios
      .get("https://f8b9-124-253-0-49.ngrok.io/superadmin_api/usermanagement/")
      .then((res) => {
        setData(res.data);
      });
  }, []);

  return (
    <div>
      <Container maxWidth="lg">
        <Grid container spacing={3} className="sportc">
          <Grid
            item
            xs={12}
            sm={6}
            style={{ padding: "0px 14px", marginTop: "30px", marginBottom: "20px" }}
          >
            <h3> Sports Center </h3>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            className="butt sportbtn"
            style={{
              padding: "45px 0px",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <div
              className={classes.search}
              style={{ border: "1px solid black", width: "180px" }}
            >
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
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
            </div>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Paper
          elevation={3}
          maxWidth="lg"
          style={{ padding: "30px", marginBottom: "50px" }}
        >
            <TableContainer >
            <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="right"> S.No.</TableCell>
                <TableCell align="right">User Name</TableCell>
                <TableCell align="right"> Sport</TableCell>
                <TableCell align="right">Sports Center</TableCell>
                <TableCell align="center">Timings</TableCell>
                <TableCell align="right"> Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .filter((val) => {
                  if (searchTerm === "") {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    val.email
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    val.location
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((admin, i) => {
                  return (
                    <TableRow key={admin._sno}>
                      <TableCell align="right">{admin._sno}</TableCell>
                      <TableCell align="right">{admin.name}</TableCell>
                      <TableCell align="right">{admin.location}</TableCell>
                      <TableCell align="right">{admin.email}</TableCell>
                      <TableCell align="right">{admin.contactno}</TableCell>
                      <TableCell align="right">
                        <Button
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
                          <Settings style={{ color: "#17a248" }} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
            <TableRow>
              <TableCell align="right">#123</TableCell>
              <TableCell align="right">Ankul</TableCell>
              <TableCell align="right">Cricket</TableCell>
              <TableCell align="right">Dummy Gym</TableCell>
              <TableCell align="center">5:00 AM to 6:00 PM</TableCell>
              <TableCell align="right">
                <Link
                  to="/user/sportscenterdetals"
                  style={{ textDecoration: "none" }}
                >
                  <Button
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
                    <RemoveRedEye style={{ color: "#17a248" }} />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">#123</TableCell>
              <TableCell align="right">Ankul</TableCell>
              <TableCell align="right">Cricket</TableCell>
              <TableCell align="right">Dummy Gym</TableCell>
              <TableCell align="center">5:00 AM to 6:00 PM</TableCell>
              <TableCell align="right">
                <Button
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
                  <RemoveRedEye style={{ color: "#17a248" }} />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">#123</TableCell>
              <TableCell align="right">Ankul</TableCell>
              <TableCell align="right">Cricket</TableCell>
              <TableCell align="right">Dummy Gym</TableCell>
              <TableCell align="center">5:00 AM to 6:00 PM</TableCell>
              <TableCell align="right">
                <Button
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
                  <RemoveRedEye style={{ color: "#17a248" }} />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">#123</TableCell>
              <TableCell align="right">Ankul</TableCell>
              <TableCell align="right">Cricket</TableCell>
              <TableCell align="right">Dummy Gym</TableCell>
              <TableCell align="center">5:00 AM to 6:00 PM</TableCell>
              <TableCell align="right">
                <Button
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
                  <RemoveRedEye style={{ color: "#17a248" }} />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">#123</TableCell>
              <TableCell align="right">Ankul</TableCell>
              <TableCell align="right">Cricket</TableCell>
              <TableCell align="right">Dummy Gym</TableCell>
              <TableCell align="center">5:00 AM to 6:00 PM</TableCell>
              <TableCell align="right">
                <Button
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
                  <RemoveRedEye style={{ color: "#17a248" }} />
                </Button>
              </TableCell>
            </TableRow>
          </Table>
          </TableContainer>
        </Paper>
      </Container>
    </div>
  );
}
