import React from 'react';
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
import { useEffect, useState } from 'react'
import axios from 'axios';

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
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");
    useEffect(() => {
        loadUsers();
        document.title = "Subscription Plans"
    }, [])
    const baseURL = process.env.REACT_APP_API_ENDPOINT;
    const loadUsers = async () => {
        const result = await axios.get(baseURL+"apis/subscriptionplan/");
        setData(result.data.reverse());
    };

    return (
        <>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} style={{  paddingTop: "32px", display: "flex"  }}>
                        <h3>Subscription Plans</h3>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{  padding: "45px 14px", display: "flex", justifyContent: "end" }}>
                        <div className={classes.search} style={{ border: "1px solid black" }}>
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
                    </Grid>
                </Grid>
            </Container>
            <Container>
                <div className="WidgetLg">
                    <table className="WidgetLgTable">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right"> S.No</TableCell>
                                <TableCell align="right">Sport Center</TableCell>
                                <TableCell align="right">Category</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="right">Duration</TableCell>
                                <TableCell align="right"> Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.filter((val) => {
                                if (searchTerm === "") {
                                    return val;
                                } else if (
                                    val.catergory.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    val.amount.toLowerCase().includes(searchTerm.toLowerCase())
                                ) {
                                    return val
                                }
                            })
                                .map((admin, i) => {
                                    return <TableRow key={i}>
                                        <TableCell align="right">{i + 1}</TableCell>
                                        <TableCell align="right">{admin.sports_center}</TableCell>
                                        <TableCell align="right">{admin.catergory}</TableCell>
                                        <TableCell align="right">{admin.amount}</TableCell>
                                        <TableCell align="right">{admin.duration}</TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="contained"
                                                href="/edit-sub-scription-plans"
                                                type="submit"
                                                style={{
                                                    padding: "0",
                                                    boxShadow: "none",
                                                    border: "none",
                                                    background: "none",
                                                    minWidth: "0px"
                                                }}
                                            >
                                                <Edit style={{ color: "#17a248" }} />
                                            </Button>
                                            <Button style={{
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
                    </table>
                </div>
            </Container>
        </>
    );
}