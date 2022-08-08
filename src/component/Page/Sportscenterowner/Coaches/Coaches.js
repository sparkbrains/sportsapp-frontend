import React, { useState } from 'react';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { Container, TableBody } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import {
    AddCircleOutlineOutlined,
} from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import { Delete, Edit } from '@material-ui/icons';
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 670,
    },
    search: {
        position: 'relative',
        variant: "outlined",
        borderRadius: "25px",
        color: "black",

        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
    },
}));

export default function BasicTable() {
    const [data, setData] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");
    const baseURL = process.env.REACT_APP_API_ENDPOINT;
    useEffect(() => {
        loadUsers();
        document.title = "Coaches"
    }, [])
    const classes = useStyles();
    const deleteUser = async id => {
        await axios.delete(baseURL+`sports/coaches/${id}/`);
        loadUsers();
    };

    const loadUsers = async () => {
        const result = await axios.get(baseURL+"sports/coaches/");
        setData(result.data.reverse());
    };
    return (
        <div>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} style={{ paddingTop: "32px", display: "flex"}}>
                        <h3> Coaches</h3>
                    </Grid>
                    <Grid item xs={12} sm={6} className="butt" style={{ padding: "45px 14px", display: "flex", justifyContent: "end" }}>
                        <div className={classes.search} style={{ border: "1px solid black", width: "180px" }}>
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
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <Link to="/sportscenterowner/addcoach">
                            <Button variant="contained"
                                type="submit"
                                style={{ float: "right", textTransform: "capitalize", backgroundColor: "#232b58", color: "white" }}>
                                <AddCircleOutlineOutlined style={{ marginRight: "6px" }} />
                                Add Coach
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Container>
            <Container>
                <div className="WidgetLg">
                <paper elevation={3}>
                <TableContainer >
                <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right"> S.No</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Location</TableCell>
                                <TableCell align="left">Sport Center</TableCell>
                                <TableCell align="left">Contact No.</TableCell>
                                <TableCell align="left"> Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.filter((val) => {
                                if (searchTerm === "") {
                                    return val;
                                } else if (
                                    val.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    val.location.toLowerCase().includes(searchTerm.toLowerCase())
                                ) {
                                    return val
                                }
                            })
                                .map((admin, i) => {
                                    return <TableRow key={i}>
                                        <TableCell align="right">{i + 1}</TableCell>
                                        <TableCell align="left">{admin.name}</TableCell>
                                        <TableCell align="left">{admin.location}</TableCell>
                                        <TableCell align="left">{admin.sportscenter}</TableCell>
                                        <TableCell align="left">{admin.phoneno}</TableCell>
                                        <TableCell align="left">
                                        <Link to={`/sportscenterowner/editcoach/${admin.id}`}>
                                            <Button
                                                variant="contained"
                                                // {`/edit-user/${admin.id}`}
                                                type="submit"
                                                style={{
                                                    padding: "0",
                                                    boxShadow: "none",
                                                    border: "none",
                                                    background: "none",
                                                    minWidth: "0px"
                                                }}
                                            ><Edit style={{ color: "#17a248" }} />
                                            </Button>
                                            </Link>
                                            <Button
                                                onClick={() => deleteUser(admin.id)}
                                                style={{
                                                    padding: "0",
                                                    boxShadow: "none",
                                                    border: "none",
                                                    background: "none",
                                                    minWidth: "0px"
                                                }}>
                                                <Delete style={{ color: "red", marginLeft: "10px" }} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                })}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    </paper>
                </div>
            </Container>
        </div>
    );
}