'use client'
import React from 'react';
import { NavBar } from '@/components/NavBar';
import { SummaryComponent } from '@/components/SummaryComponent';

const SummaryPage = () => {
    return (
        <>
            <NavBar hideCartButton={false} blockCallLogoFunction={true} />
            <SummaryComponent />
        </>
    );
};

export default SummaryPage;
