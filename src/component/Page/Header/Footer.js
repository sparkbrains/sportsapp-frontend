import React from 'react'
import { Favorite } from '@material-ui/icons';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import CopyrightIcon from '@material-ui/icons/Copyright';


function Footer() {
    return (
        <Container >
             <AppBar position="static" style={{
                backgroundColor: "#0c1756",
                position: "fixed",
                bottom: "0",
                width: "100%",
                left:"0", 
                backgroundColor: "#fff",
                boxShadow:"none",
               
            }}>
            <p variant="body1" style={{
                textAlign: "center", color: "#999",
                    height: "30px",
            }} >
                Copyright <CopyrightIcon style={{fontSize : "15px"}}/>  2022 Sports App. All rights reserved.
            </p>
            </AppBar>
        </Container>
    )
}

export default Footer
