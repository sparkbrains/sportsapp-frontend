import React from 'react'
import { Favorite } from '@material-ui/icons';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';


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
                Made with <Favorite style={{ fontSize: "12px" }} /> by SparkBrains. Copyright 2022. All right reserved.
            </p>
            </AppBar>
        </Container>
    )
}

export default Footer
