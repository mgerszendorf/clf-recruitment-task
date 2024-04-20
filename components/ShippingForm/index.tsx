'use client';
import React, { useState } from 'react';
import { Container, FormControl, InputLabel, Select, MenuItem, Button, SelectChangeEvent, Typography, Box } from '@mui/material';
import { useCart } from '@/contexts/CartContext';
import { getShippingOptions } from '@/data/shippingOptions';
import Link from 'next/link';
import styles from './style.module.scss';

export const ShippingForm = () => {
    const { selectShipping, skipShipping, address } = useCart();
    const [shippingMethod, setShippingMethod] = useState<string>('');

    const handleChange = (event: SelectChangeEvent) => {
        setShippingMethod(event.target.value as string);
    };

    const handleSubmit = () => {
        selectShipping(shippingMethod);
    };

    const handleSkip = () => {
        skipShipping();
    }

    const shippingChoices = address ? getShippingOptions(address.country) : [];

    return (
        <div className={styles.shippingFormContainer}>
            <Typography variant="h4" component="h1" gutterBottom>
                Wybierz metodę wysyłki
            </Typography>
            <Container maxWidth="sm">
                <FormControl fullWidth margin="normal">
                    <InputLabel id="shipping-method-label">Metoda wysyłki</InputLabel>
                    <Select
                        labelId="shipping-method-label"
                        id="shipping-method"
                        value={shippingMethod}
                        label="Metoda wysyłki"
                        onChange={handleChange}
                        required
                    >
                        {shippingChoices.map(option => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box className={styles.buttonsContainer}>
                    <Link href="/cart/payment" passHref>
                        <Button onClick={handleSkip} variant="contained" color="primary">
                            Pomiń
                        </Button>
                    </Link>
                    <Link href="/cart/payment" passHref>
                        <Button onClick={handleSubmit} variant="contained" color="primary" disabled={!shippingMethod}>
                            Dalej
                        </Button>
                    </Link>
                </Box>
            </Container>
        </div>
    );
};
