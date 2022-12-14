import React, { useState } from 'react';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { Container, TableBody } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import { Delete, Edit } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react'
import {
    AddCircleOutlineOutlined,
} from '@material-ui/icons';
import Table from "@mui/material/Table";
import { Link } from 'react-router-dom';
import axios from 'axios';
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
        height: "37px",

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
    useEffect(() => {
        loadUsers();
        document.title = "Sport Center"
    }, [])
    const baseURL = process.env.REACT_APP_API_ENDPOINT;
    const classes = useStyles();
    const loadUsers = async () => {
        const result = await axios.get(baseURL+"sports/sports/");
        setData(result.data.reverse());
    };
    const deleteUser = async (id) => {
        await axios.delete(baseURL+`sports/sports/${id}/`);
        loadUsers();
      };
    return (
        <>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} style={{ paddingTop: "32px", display: "flex" }}>
                        <h3>Sport Center</h3>
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

                                placeholder="Search???"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />

                        </div>
                        <Link to="/sportscenterowner/addsportscenter">
                        <Button variant="contained"
                            type="submit"
                            style={{ float: "right", textTransform: "capitalize", backgroundColor: "#232b58", color: "white" }}>
                            <AddCircleOutlineOutlined style={{ marginRight: "6px" }} />
                            Add Sport Center
                        </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Container>
            <Container>
                <div className="WidgetLg" style={{marginBottom:"85px" }}>
                <Paper elevation={3}>
                <TableContainer >
                <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left"> S.No.</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Location</TableCell>
                                <TableCell align="left">Time From</TableCell>
                                <TableCell align="left">Time To</TableCell>
                                <TableCell align="left">Contact No.</TableCell>
                                <TableCell align="left"> Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.filter((val) => {
                            if (searchTerm ==="") {
                                return val;
                            } else if (
                                val.name.toLowerCase().includes(searchTerm.toLowerCase())
                            ){
                                return val
                            }

                        })   
                          .map((admin, i) => {
                                return <TableRow key={i}>
                                    <TableCell align="centre">{i + 1}</TableCell>
                                    <TableCell align="left">{admin.name}</TableCell>
                                    <TableCell align="left">{admin.location}</TableCell>
                                    <TableCell align="left">{admin.timefrom}</TableCell>
                                    <TableCell align="left">{admin.timeto}</TableCell>
                                    <TableCell align="left">{admin.contact}</TableCell>
                                    <TableCell align="left">
                                    <Link to={`/sportscenterowner/editsportscenter/${admin.id}`}>
                                        <Button
                                            variant="contained"
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
                                        <Button style={{
                                            padding: "0",
                                            boxShadow: "none",
                                            border: "none",
                                            background: "none",
                                            minWidth: "0px"
                                        }}>
                                            <Delete
                                            onClick={() => deleteUser(admin.id)}
                                             style={{ color: "red", marginLeft: "10px" }} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    </Paper>
                </div>
            </Container>
        </>
    );
}