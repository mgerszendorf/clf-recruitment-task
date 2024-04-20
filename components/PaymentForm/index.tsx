'use client';
import React, { useState } from 'react';
import { Container, FormControl, InputLabel, Select, MenuItem, Button, SelectChangeEvent, Typography, Box } from '@mui/material';
import { useCart } from '@/contexts/CartContext';
import { paymentOptions } from '@/data/paymentOptions';
import Link from 'next/link';
import styles from './style.module.scss';

export const PaymentForm = () => {
    const { selectPayment, skipPayment } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setPaymentMethod(event.target.value as string);
    };

    const handleSubmit = () => {
        selectPayment(paymentMethod);
    };

    const handleSkip = () => {
        skipPayment();
    }

    return (
        <div className={styles.paymentFormContainer}>
            <Typography variant="h4" component="h1" gutterBottom>
                Wybierz metodę płatności
            </Typography>
            <Container maxWidth="sm">
                <FormControl fullWidth margin="normal">
                    <InputLabel id="payment-method-label">Metoda płatności</InputLabel>
                    <Select
                        labelId="payment-method-label"
                        id="payment-method-select"
                        value={paymentMethod}
                        label="Metoda płatności"
                        onChange={handleChange}
                        required
                    >
                        {paymentOptions.map(option => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box className={styles.buttonsContainer}>
                    <Link href="/cart/summary" passHref>
                        <Button onClick={handleSkip} variant="contained" color="primary">
                            Pomiń
                        </Button>
                    </Link>
                    <Link href="/cart/summary" passHref>
                        <Button onClick={handleSubmit} variant="contained" color="primary" disabled={!paymentMethod}>
                            Dalej
                        </Button>
                    </Link>
                </Box>
            </Container>
        </div>
    );
};
