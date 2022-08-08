import {React} from 'react';
import { Container } from '@material-ui/core';
import Data from './Data'
import { useEffect } from 'react'



export default function BasicTable() {
   
    
    useEffect(() => {
        document.title = "User Management"
      }, [])


    return (
        <div>            
            <Container>
                <Data />
            </Container>
        </div>
    );
}