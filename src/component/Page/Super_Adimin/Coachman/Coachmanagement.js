import React from 'react';
import { Container } from '@material-ui/core';
import Dataman from './Dataman'
import { useEffect } from 'react'


export default function BasicTable() {
   
    useEffect(() => {
        document.title = "Coach Management"
    }, [])

    return (
        <div>
            <Container>
                <Dataman />
            </Container>
        </div>
    );
}