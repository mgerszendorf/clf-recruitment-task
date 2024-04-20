'use client'
import React from 'react';
import { NavBar } from '@/components/NavBar';
import { ShippingForm } from '@/components/ShippingForm';

const ShippingFormPage = () => {
    return (
        <>
            <NavBar hideCartButton={false} blockCallLogoFunction={false} />
            <ShippingForm />
        </>
    );
};

export default ShippingFormPage;
