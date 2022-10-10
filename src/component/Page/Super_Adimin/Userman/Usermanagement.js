import {React} from 'react';
import { Container } from '@material-ui/core';
import Data from './Data'
import { useEffect } from 'react'
import AppLayout from '../../../../layout/appLayout';



export default function Usermanagement() {
   
    
    useEffect(() => {
        document.title = "User Management"
      }, [])


    return (
        <AppLayout>            
            <Container>
                <Data />
            </Container>
        </AppLayout>
    );
}