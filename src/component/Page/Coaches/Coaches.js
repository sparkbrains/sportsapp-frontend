import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Library from "./Library/Library"
import Header from "../Header/Header"
import {
  AccessTime,
  WidgetsOutlined,
  InsertDriveFile,
  Comment,
} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import { Route, Switch, BrowserRouter as Router, Link } from "react-router-dom";
import Footer from "../Header/Footer";
import Schedule from "../Coaches/Schedule/Schedule"
import Sportscenter from "../Coaches/Sportcentre/Sportcentre"
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

export default function ButtonAppBar({match}) {
  const classes = useStyles();

  return (
    <Router>
      <Header/>
      <div className={classes.root}>
        <AppBar
          position="static"
          style={{ backgroundColor: "#F9FBFD", color: "black" }}
        >
          <Toolbar>
            <Grid container spacing={2} justify="center">
              <Grid item style={{ alignSelf: "center" }}>
                <Link
                  className="id"
                  to={`${match.path}/`}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem
                    button
                    key={"Home"}
                    style={{ color: "#122A4D", marginLeft: "6px" }}
                  >
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
                  to={`${match.path}/schedule`}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem
                    button
                    key={"Memberships"}
                    style={{ color: "#122A4D", marginLeft: "6px" }}
                  >
                    <AccessTime />
                    <ListItemText
                      primary={"Schedule"}
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
                  to={`${match.path}/library`}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem
                    button
                    key={"Activity"}
                    style={{ color: "#122A4D", marginLeft: "6px" }}
                  >
                    <InsertDriveFile />
                    <ListItemText
                      primary={"Library"}
                      style={{ color: "#122A4D", marginLeft: "6px" }}
                    />
                  </ListItem>
                </Link>
              </Grid>
              <Grid item style={{ alignSelf: "center" }}>
                <Link className="id" to="/" style={{ textDecoration: "none" }}>
                  <ListItem
                    button
                    key={" Engage"}
                    style={{ color: "#122A4D", marginLeft: "6px" }}
                  >
                    <Comment />
                    <ListItemText
                      primary={"Chat"}
                      style={{ color: "#122A4D", marginLeft: "6px" }}
                    />
                  </ListItem>
                </Link>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Footer/>
      </div>
      <Switch>
      <Route  path={`${match.path}/library`} component={Library} />
      <Route path={`${match.path}/schedule`} component={Schedule} />
      <Route exact path={`${match.path}/`} component={Sportscenter} />
      </Switch>
    </Router>
  );
}
