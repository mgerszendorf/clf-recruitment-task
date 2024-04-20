'use client'
import React from 'react';
import { NavBar } from '@/components/NavBar';
import { AddressForm } from '@/components/AddressForm';

const AddressFormPage = () => {
    return (
        <>
            <NavBar hideCartButton={false} blockCallLogoFunction={false} />
            <AddressForm />
        </>
    );
};

export default AddressFormPage;
