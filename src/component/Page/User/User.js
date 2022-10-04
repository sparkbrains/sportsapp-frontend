import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  AccessTime,
  WidgetsOutlined,
  InsertDriveFile,
  Comment,
} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import Header from "../Header/Header";
import library from "./Library/Library";
import Dietplan from "./Dietplan/Dietplan"
import Sportecenter from "./Sportecenter/Sportecenter";
import { Route, Switch, BrowserRouter as BrowserRouter, Link } from "react-router-dom";
import Footer from "../Header/Footer";
import Subscription from "./Subscription/Subscription"
import Sportscenterdetals from "./Sportecenter/Sportscenterdetals"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar({ match }) {
  console.log(match,'mam');
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Header />
      <div className={classes.root}>
        <AppBar
          position="static"
          style={{ backgroundColor: "#F9FBFD", color: "black" }}
        >
          <Toolbar>
            <Grid container spacing={2} justifyContent="center">
              <Grid item style={{ alignSelf: "center" }}>
                <Link
                  className="id"
                  to="/user"
                  style={{ textDecoration: "none", color: "#122A4D" }}
                >
                  <ListItem button key={"Home"}>
                    <WidgetsOutlined />
                    <ListItemText
                      primary={"Sport Center"}
                      style={{
                        color: "#122A4D",
                        fontSize: "20px",
                        marginLeft: "6px",
                      }}
                    />
                  </ListItem>
                </Link>
              </Grid>
              <Grid item style={{ alignSelf: "center" }}>
                <Link
                  className="id"
                  to={`${match.path}/library`}
                  style={{ textDecoration: "none", color: "#122A4D" }}
                >
                  <ListItem button key={"Memberships"}>
                    <AccessTime />
                    <ListItemText
                      primary={"Libray"}
                      style={{
                        color: "#122A4D",
                        textDecoration: "nome",
                        marginLeft: "6px",
                      }}
                    />
                  </ListItem>
                </Link>
              </Grid>
              <Grid item style={{ alignSelf: "center" }}>
                <Link
                  className="id"
                  to={`${match.path}/dietplan`}
                  style={{ textDecoration: "none", color: "#122A4D" }}
                >
                  <ListItem button key={"Activity"}>
                    <InsertDriveFile />
                    <ListItemText
                      primary={"Diet Plan"}
                      style={{ color: "#122A4D", marginLeft: "6px" }}
                    />
                  </ListItem>
                </Link>
              </Grid>
              <Grid item style={{ alignSelf: "center" }}>
                <Link
                  className="id"
                  to={`${match.path}/subscription`}
                  style={{ textDecoration: "none", color: "#122A4D" }}
                >
                  <ListItem button key={" Engage"}>
                    <Comment />
                    <ListItemText
                      primary={"Subscription"}
                      style={{ color: "#122A4D", marginLeft: "6px" }}
                    />
                  </ListItem>
                </Link>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Footer />
      </div>
      <Switch>
      <Route exact path={`${match.path}/`} component={Sportecenter} />
        <Route path={`${match.path}/library`} component={library} />
        <Route path={`${match.path}/subscription`} component={Subscription} />
        <Route path={`${match.path}/dietplan`} component={Dietplan} />
        <Route path={`${match.path}/sportscenterdetals`} component={Sportscenterdetals} />
      </Switch>
    </BrowserRouter>
  );
}
