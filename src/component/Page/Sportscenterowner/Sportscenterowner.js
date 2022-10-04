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
  PersonOutlineOutlined,
  SyncAltOutlined,
  Style,
} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Header/Footer";
import Sportcenter from "./Sportcenter/Sportcenter";
import Categories from "./Categories/Categories";
import Subscriptionplans from "./Subscriptionplans/Subscriptionplans";
import Transactions from "./Transactions/Transactions";
import Schedule from "./Schedule/Schedule";
import Coaches from "./Coaches/Coaches";
import Addcoach from "./Coaches/Addcoach";
import Addcategories from "./Categories/Addcategories";
import Addsportscenter from "./Sportcenter/Addsportscenter";
import Editcategories from "./Categories/Editcategories"
import Editcoach from "./Coaches/Editcoach";
import Editsportscenter from "./Sportcenter/Editsportscenter"


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
  const classes = useStyles();

  return (
    <Router>
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
                  to={`${match.path}/`}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem button key={"sports-center"}>
                    <WidgetsOutlined style={{ color: "#3a2e2e" }} />
                    <ListItemText
                      primary={"Sport Center"}
                      style={{
                        color: "#3a2e2e",
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
                  to={`${match.path}/coaches`}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem button key={"coaches-ownetr"}>
                    <PersonOutlineOutlined style={{ color: "#3a2e2e" }} />
                    <ListItemText
                      primary={"Coaches"}
                      style={{
                        color: "#3a2e2e",
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
                  to={`${match.path}/schedule`}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem button key={"schedule"}>
                    <AccessTime style={{ color: "#3a2e2e" }} />
                    <ListItemText
                      primary={"Schedule"}
                      style={{
                        color: "#3a2e2e",
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
                  to={`${match.path}/transactions`}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem button key={"transactions"}>
                    <SyncAltOutlined style={{ color: "#3a2e2e" }} />
                    <ListItemText
                      primary={"Transactions"}
                      style={{ color: "#3a2e2e", marginLeft: "6px" }}
                    />
                  </ListItem>
                </Link>
              </Grid>
              <Grid item style={{ alignSelf: "center" }}>
                <Link
                  className="id"
                  to={`${match.path}/categories`}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem button key={"Activity"}>
                    <InsertDriveFile style={{ color: "#3a2e2e" }} />
                    <ListItemText
                      primary={"Categories"}
                      style={{ color: "#3a2e2e", marginLeft: "6px" }}
                    />
                  </ListItem>
                </Link>
              </Grid>
              <Grid item style={{ alignSelf: "center" }}>
                <Link
                  className="id"
                  to={`${match.path}/subscriptionplans`}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem button key={"sub-scription-plans"}>
                    <Style style={{ color: "#3a2e2e" }} />
                    <ListItemText
                      primary={"Subscription Plans"}
                      style={{ color: "#3a2e2e", marginLeft: "6px" }}
                    />
                  </ListItem>
                </Link>
              </Grid>
              <Grid item style={{ alignSelf: "center" }}>
                <Link
                  className="id"
                  to="/Chat1"
                  style={{ textDecoration: "none" }}
                >
                  <ListItem button key={"Chat1"}>
                    <Comment style={{ color: "#3a2e2e" }} />
                    <ListItemText
                      primary={"Chat"}
                      style={{ color: "#3a2e2e", marginLeft: "6px" }}
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
        <Route exact path={`${match.path}/`} component={Sportcenter} />
        <Route path={`${match.path}/categories`} component={Categories} />
        <Route
          path={`${match.path}/subscriptionplans`}
          component={Subscriptionplans}
        />
        <Route path={`${match.path}/transactions`} component={Transactions} />
        <Route path={`${match.path}/schedule`} component={Schedule} />
        <Route path={`${match.path}/coaches`} component={Coaches} />
        <Route path={`${match.path}/addcoach`} component={Addcoach} />
        <Route path={`${match.path}/editcoach/:id`} component={Editcoach} />
        <Route path={`${match.path}/addcategories`} component={Addcategories} />
        <Route path={`${match.path}/editcategories/:id`} component={Editcategories} />
        <Route path={`${match.path}/editsportscenter/:id`} component={Editsportscenter} />
        
        <Route
          path={`${match.path}/addsportscenter`}
          component={Addsportscenter}
        />
      </Switch>
    </Router>
  );
}
