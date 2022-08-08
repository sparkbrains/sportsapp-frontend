import React from 'react';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import TableRow from '@material-ui/core/TableRow';
import { TableBody } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import { ChevronLeft } from '@material-ui/icons';
import { useEffect } from 'react'
import { Link } from 'react-router-dom';


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
    useEffect(() => {
        document.title = "Transactions"
    }, [])
    const classes = useStyles();

    return (
        <div>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={9} style={{ padding: "0px", marginTop: "35px" }}>
                        <h3>Transactions</h3>
                    </Grid>
                    <Grid item xs={12} sm={3} style={{ marginTop: "16px", }}>
                        <div className={classes.search} style={{ border: "1px solid black" }}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
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
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={5} >
                            <Link to="/transactions" style={{ textDecoration: "none" }}>
                                <Button
                                    style={{ textTransform: "capitalize" }}>
                                    <ChevronLeft />
                                    Back to Transactions
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={7} >
                            <p>Mandeep Singh</p>
                        </Grid>
                    </Grid>
                    <table className="WidgetLgTable">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right"> Date</TableCell>
                                <TableCell align="right">Package</TableCell>
                                <TableCell align="right">Package Base Value</TableCell>
                                <TableCell align="right">Discount Given</TableCell>
                                <TableCell align="right">Payment Mode</TableCell>
                                <TableCell align="right">Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="right">19-08-2021</TableCell>
                                <TableCell align="right">1 Month</TableCell>
                                <TableCell align="right">1000.00 INR</TableCell>
                                <TableCell align="right">10%</TableCell>
                                <TableCell align="right">Cash</TableCell>
                                <TableCell align="right"> 1000.00 INR </TableCell>
                            </TableRow>
                        </TableBody>
                        <TableRow>
                            <TableCell align="right">19-08-2021</TableCell>
                            <TableCell align="right">3 Months</TableCell>
                            <TableCell align="right">1000.00 INR</TableCell>
                            <TableCell align="right">10%</TableCell>
                            <TableCell align="right">Cash</TableCell>
                            <TableCell align="right"> 1000.00 INR </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">19-08-2021</TableCell>
                            <TableCell align="right">1 Month</TableCell>
                            <TableCell align="right">1000.00 INR</TableCell>
                            <TableCell align="right">10%</TableCell>
                            <TableCell align="right">Cash</TableCell>
                            <TableCell align="right"> 1000.00 INR </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">19-08-2021</TableCell>
                            <TableCell align="right">3 Months</TableCell>
                            <TableCell align="right">1000.00 INR</TableCell>
                            <TableCell align="right">10%</TableCell>
                            <TableCell align="right">Net Banking</TableCell>
                            <TableCell align="right"> 1000.00 INR </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">19-08-2021</TableCell>
                            <TableCell align="right">1 Month</TableCell>
                            <TableCell align="right">1000.00 INR</TableCell>
                            <TableCell align="right">10%</TableCell>
                            <TableCell align="right">Cash</TableCell>
                            <TableCell align="right"> 1000.00 INR </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">19-08-2021</TableCell>
                            <TableCell align="right">1 Month</TableCell>
                            <TableCell align="right">1000.00 INR</TableCell>
                            <TableCell align="right">10%</TableCell>
                            <TableCell align="right">Cash</TableCell>
                            <TableCell align="right"> 1000.00 INR </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">19-08-2021</TableCell>
                            <TableCell align="right">1 Month</TableCell>
                            <TableCell align="right">1000.00 INR</TableCell>
                            <TableCell align="right">10%</TableCell>
                            <TableCell align="right">Net Banking</TableCell>
                            <TableCell align="right"> 1000.00 INR </TableCell>
                        </TableRow>
                    </table>
                </div>
            </Container>
        </div>
    );
}