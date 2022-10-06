import React from 'react'
import Container from '@mui/material/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Route, Switch, BrowserRouter as Router, Link } from 'react-router-dom';
import Monday from './Monday'
import Tursday from './Tursday'
import Wednesday from './Wednesday'
import Thuesday from './Thuesday'
import Firday from './Firday'
import Saturday from './Saturday'
import Sunday from './Sunday'

function dietplan({match}) {

    return (
        <Router>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} style={{ padding: "0px 14px", marginTop: "30px", marginBottom: "20px" }}>
                        <h3> Diet Plan </h3>
                    </Grid>
                </Grid>
            </Container>
            <Container >
                <Paper maxWidth="lg" style={{ padding: "30px", marginBottom: "-3px" }}>
                    <Stack direction="row" spacing={2} style={{ justifyContent: "center" }}>
                        <Link className="id" 
                        to="/user/dietplan/monday" 
                        style={{ textDecoration: "none", color: "#122A4D" }}>
                            <Button variant="outlined" style={{ textTransform: "capitalize" }}>
                                Monday
                            </Button>
                        </Link>
                        <Link className="id" to="/user/dietplan/tursday" style={{ textDecoration: "none", color: "#122A4D" }}>
                            <Button variant="outlined" style={{ textTransform: "capitalize" }}>
                                Tuesday
                            </Button>
                        </Link>
                        <Link className="id" to="/user/dietplan/wednesday" style={{ textDecoration: "none", color: "#122A4D" }}>
                            <Button variant="outlined" style={{ textTransform: "capitalize" }}>
                                Wednesday
                            </Button>
                        </Link>
                        <Link className="id" to="/user/dietplan/thuesday" style={{ textDecoration: "none", color: "#122A4D" }}>
                            <Button variant="outlined" style={{ textTransform: "capitalize" }}>
                                Thursday
                            </Button>
                        </Link>
                        <Link className="id" to="/user/dietplan/" style={{ textDecoration: "none", color: "#122A4D" }}>
                            <Button variant="outlined" style={{ textTransform: "capitalize" }}>
                                Friday
                            </Button>
                        </Link>
                        <Link className="id" to="/user/dietplan/saturday" style={{ textDecoration: "none", color: "#122A4D" }}>
                            <Button variant="outlined" style={{ textTransform: "capitalize" }}>
                                Saturday
                            </Button>
                        </Link>
                        <Link className="id" to="/user/dietplan/sunday" style={{ textDecoration: "none", color: "#122A4D" }}>
                            <Button variant="outlined" style={{ textTransform: "capitalize" }}>
                                Sunday
                            </Button>
                        </Link>
                    </Stack>
                </Paper>
            </Container>
            <Switch>
            <Route path={`${match.path}/monday`} component={Monday} />
            <Route path={`${match.path}/tursday`} component={Tursday} />
            <Route path={`${match.path}/wednesday`} component={Wednesday} />
            <Route path={`${match.path}/thuesday`} component={Thuesday} />
            <Route path={`${match.path}/`} component={Firday} />
            <Route path={`${match.path}/saturday`} component={Saturday} />
            <Route path={`${match.path}/sunday`} component={Sunday} />
 
            </Switch>
        </Router>
    )
}

export default dietplan
