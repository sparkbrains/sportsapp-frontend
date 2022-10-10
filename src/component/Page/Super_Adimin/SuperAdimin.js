import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  PermIdentity,
  SettingsOutlined,
  WidgetsOutlined,
  ScreenLockPortraitOutlined,
  Navigation,
} from "@material-ui/icons";
import LoadingBar from "react-top-loading-bar";
import Grid from "@material-ui/core/Grid";
import {
  BrowserRouter as Router,Routes,
  Link,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Header/Footer";
import Sportscenterowner from "./Sportscenterowner/Sportscenterowner";
import Coachmanagement from './Coachman/Coachmanagement';
import Usermanagement from './Userman/Usermanagement'
import Categorymanagement from './Categoryman/Categorymanagement'
import Setting from './Setting/Setting'
import Addcategory from './Categoryman/Addcategory'
import Addcoach from "./Coachman/Addcoach";
import Addnew from "./Sportscenterowner/Addnew";
import Adduser from "./Userman/Adduser";
import Editcoach from "./Coachman/Editcoach"
import Editcategory from "./Categoryman/Editcategories"
import Editnew from "./Sportscenterowner/Editnew";
import EditUser from "./Userman/Edituser";



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

function ButtonAppBar() {
  const match = useLocation().pathname
  console.log(match,'history==');
  const classes = useStyles();
  const [progress, setProgress] = useState(0);
  return (
    <Router>
      <Header />
      <LoadingBar
        color="#f11946"
        timeout={10000}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className={classes.root}>
        <AppBar
          position="static"
          style={{
            backgroundColor: "#F9FBFD",
            color: "black",
          }}
        >
          <Toolbar>
            <Grid container spacing={2} justifyContent="center">
              <Grid item style={{ alignSelf: "center" }}>
                <Link
                  className="id"
                  onClick={() => setProgress(100)}
                  to={`${match.path}/sportscenterowner`}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem button key={"sports-center-owners"}>
                    <WidgetsOutlined style={{ color: "#3a2e2e" }} />
                    <ListItemText
                      primary={"SC Owner Management"}
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
                  onClick={() => setProgress(100)}
                  to={`${match.path}/coachmanagement`}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem button key={"coach-anagement"}>
                    <PermIdentity style={{ color: "#3a2e2e" }} />
                    <ListItemText
                      primary={"Coach Management"}
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
                  onClick={() => setProgress(100)}
                  to={`${match.path}/usermanagement`}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem button key={"user-management"}>
                    <ScreenLockPortraitOutlined style={{ color: "#3a2e2e" }} />
                    <ListItemText
                      primary={"User Management"}
                      style={{ color: "#3a2e2e", marginLeft: "6px" }}
                    />
                  </ListItem>
                </Link>
              </Grid>
              <Grid item style={{ alignSelf: "center" }}>
                <Link
                  className="id"
                  onClick={() => setProgress(100)}
                  to={`${match.path}/categorymanagement`}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem button key={"category-management"}>
                    <Navigation style={{ color: "#3a2e2e" }} />
                    <ListItemText
                      primary={"Category Management"}
                      style={{ color: "#3a2e2e", marginLeft: "6px" }}
                    />
                  </ListItem>
                </Link>
              </Grid>
              <Grid item style={{ alignSelf: "center" }}>
                <Link
                  className="id"
                  onClick={() => setProgress(100)}
                  to={`${match.path}/setting`}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem button key={"Setting"}>
                    <SettingsOutlined style={{ color: "#3a2e2e" }} />
                    <ListItemText
                      primary={"Settings"}
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
        <Route  path={`${match.path}/sportscenterowner`} component={Sportscenterowner}/>
        <Route path={`${match.path}/coachmanagement`} component={Coachmanagement}/>
        <Route path={`${match.path}/usermanagement`} component={Usermanagement}/>
        <Route path={`${match.path}/categorymanagement`} component={Categorymanagement}/>
        <Route path={`${match.path}/setting`} component={Setting}/>
        <Route path={`${match.path}/addcategory`} component={Addcategory} />
        <Route path={`${match.path}/addcoach`} component={Addcoach} />
        <Route path={`${match.path}/addnew`} component={Addnew} />
        <Route path={`${match.path}/adduser`} component={Adduser} />
        <Route path={`${match.path}/editcoach/:id`} component={Editcoach} />
        <Route path={`${match.path}/editcategory/:id`} component={Editcategory} />
        <Route path={`${match.path}/edituser/:id`} component={EditUser} />
        <Route path={`${match.path}/editnew/:id`} component={Editnew} />
    </Router>
  );
}
export default ButtonAppBar;
