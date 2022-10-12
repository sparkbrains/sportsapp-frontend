import Footer from "../component/Page/Header/Footer";
import Header from "../component/Page/Header/Header";
import { Grid, ListItem, Toolbar, AppBar, ListItemText, makeStyles } from "@material-ui/core";
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import SportsIcon from '@mui/icons-material/Sports';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CategoryIcon from '@mui/icons-material/Category';
import "./AppLayout.css";
import {
    SettingsOutlined,
} from "@material-ui/icons";
import LoadingBar from "react-top-loading-bar";
import {
    NavLink,
} from "react-router-dom";
import { useState } from "react";
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

export default function AppLayout({ children }) {
    const classes = useStyles();
    const [progress, setProgress] = useState(0);
    return <>
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
                            <NavLink
                                className="id button"
                                onClick={() => setProgress(100)}
                                to={`/sportscenterowner`}
                                style={{ textDecoration: "none" }}
                            >
                                <ListItem button key={"sports-center-owners"}>
                                    <DomainAddIcon style={{  }} />
                                    <ListItemText
                                        primary={"SC Owner Management"}
                                        style={{
                                            
                                            fontSize: "20px",
                                            marginLeft: "6px",
                                        }}
                                    />
                                </ListItem>
                            </NavLink>
                        </Grid>
                        <Grid item style={{ alignSelf: "center" }}>
                            <NavLink
                                className="id button"
                                onClick={() => setProgress(100)}
                                to={`/coachmanagement`}
                                style={{ textDecoration: "none" }}
                            >
                                <ListItem button key={"coach-anagement"}>
                                    <SportsIcon style={{  }} />
                                    <ListItemText
                                        primary={"Coach Management"}
                                        style={{
                                            
                                            textDecoration: "nome",
                                            marginLeft: "6px",
                                        }}
                                    />
                                </ListItem>
                            </NavLink>
                        </Grid>
                        <Grid item style={{ alignSelf: "center" }}>
                            <NavLink
                                className="id button"
                                onClick={() => setProgress(100)}
                                to={`/usermanagement`}
                                style={{ textDecoration: "none" }}
                            >
                                <ListItem button key={"user-management"}>
                                    <PersonAddAltIcon style={{  }} />
                                    <ListItemText
                                        primary={"User Management"}
                                        style={{  marginLeft: "6px" }}
                                    />
                                </ListItem>
                            </NavLink>
                        </Grid>
                        <Grid item style={{ alignSelf: "center" }}>
                            <NavLink
                                className="id button"
                                onClick={() => setProgress(100)}
                                to={`/categorymanagement`}
                                style={{ textDecoration: "none" }}
                            >
                                <ListItem button key={"category-management"}>
                                    <CategoryIcon style={{  }} />
                                    <ListItemText
                                        primary={"Category Management"}
                                        style={{  marginLeft: "6px" }}
                                    />
                                </ListItem>
                            </NavLink>
                        </Grid>
                        <Grid item style={{ alignSelf: "center" }}>
                            <NavLink
                                className="id button"
                                onClick={() => setProgress(100)}
                                to={`/settings`}
                                style={{ textDecoration: "none" }}
                            >
                                <ListItem button key={"Setting"}>
                                    <SettingsOutlined style={{  }} />
                                    <ListItemText
                                        primary={"Settings"}
                                        style={{  marginLeft: "6px" }}
                                    />
                                </ListItem>
                            </NavLink>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {children}
            <Footer />
        </div>
    </>
}