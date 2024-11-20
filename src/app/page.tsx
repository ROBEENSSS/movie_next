'use client'

import React from 'react';
import Page from "@/app/(movies)/movies/page";
import '@mantine/core/styles.css';
import {createTheme, MantineProvider} from "@mantine/core";
import {BrowserRouter} from "react-router-dom";

const HomePage = () => {
    const theme = createTheme({
    });

    return (
            <BrowserRouter>
        <MantineProvider theme={theme}>
        <div>
            <Page/>
        </div>
        </MantineProvider>
            </BrowserRouter>
    );
};

export default HomePage;