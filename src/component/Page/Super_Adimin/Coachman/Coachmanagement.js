import React from 'react';
import { Container } from '@material-ui/core';
import Dataman from './Dataman'
import { useEffect } from 'react'
import AppLayout from '../../../../layout/appLayout';


export default function Coachmanagement() {
   
    useEffect(() => {
        document.title = "Coach Management"
    }, [])

    return (
        <AppLayout>
            <Container>
                <Dataman />
            </Container>
        </AppLayout>
    );
}