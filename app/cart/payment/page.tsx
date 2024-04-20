'use client'
import React from 'react';
import { NavBar } from '@/components/NavBar';
import { PaymentForm } from '@/components/PaymentForm';

const PaymentFormPage = () => {
    return (
        <>
            <NavBar hideCartButton={false} blockCallLogoFunction={false} />
            <PaymentForm />
        </>
    );
};

export default PaymentFormPage;
