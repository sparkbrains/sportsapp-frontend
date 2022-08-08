import React from "react";
import { makeStyles, alpha } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { DetailsOutlined } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Table from "./Table";

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
      width: "20ch",
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

export default function BasicTable() {
  const classes = useStyles();
  return (
    <div>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} style={{ marginTop: "19px" }}>
            <h3> Sports Center</h3>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            className="butt"
            container
            justify="right"
            style={{ justifyContent:"end", marginTop: "25px", marginBottom: "17px" }}
          >
            <div
              className={classes.search}
              style={{ border: "1px solid black" }}
            >
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <Button
              variant="contained"
              className="size"
              style={{
                float: "right",
                marginRight: "10px",
                backgroundColor: "white",
                color: "black",
                textTransform: "capitalize",
                fontWeight: "100",
              }}
            >
              <DetailsOutlined />
              Filter
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Table />
      </Container>
    </div>
  );
}
