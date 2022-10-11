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
    Link,
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
                            <Link
                                className="id button"
                                onClick={() => setProgress(100)}
                                to={`/sportscenterowner`}
                                style={{ textDecoration: "none" }}
                            >
                                <ListItem button key={"sports-center-owners"}>
                                    <DomainAddIcon style={{ color: "#3a2e2e" }} />
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
                                className="id button"
                                onClick={() => setProgress(100)}
                                to={`/coachmanagement`}
                                style={{ textDecoration: "none" }}
                            >
                                <ListItem button key={"coach-anagement"}>
                                    <SportsIcon style={{ color: "#3a2e2e" }} />
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
                                className="id button"
                                onClick={() => setProgress(100)}
                                to={`/usermanagement`}
                                style={{ textDecoration: "none" }}
                            >
                                <ListItem button key={"user-management"}>
                                    <PersonAddAltIcon style={{ color: "#3a2e2e" }} />
                                    <ListItemText
                                        primary={"User Management"}
                                        style={{ color: "#3a2e2e", marginLeft: "6px" }}
                                    />
                                </ListItem>
                            </Link>
                        </Grid>
                        <Grid item style={{ alignSelf: "center" }}>
                            <Link
                                className="id button"
                                onClick={() => setProgress(100)}
                                to={`/categorymanagement`}
                                style={{ textDecoration: "none" }}
                            >
                                <ListItem button key={"category-management"}>
                                    <CategoryIcon style={{ color: "#3a2e2e" }} />
                                    <ListItemText
                                        primary={"Category Management"}
                                        style={{ color: "#3a2e2e", marginLeft: "6px" }}
                                    />
                                </ListItem>
                            </Link>
                        </Grid>
                        <Grid item style={{ alignSelf: "center" }}>
                            <Link
                                className="id button"
                                onClick={() => setProgress(100)}
                                to={`/setting`}
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
            {children}
            <Footer />
        </div>
    </>
}