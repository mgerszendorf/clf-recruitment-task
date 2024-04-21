'use client';
import React, { useState } from 'react';
import { List, ListItem, ListItemText, Button, Typography, Snackbar, Alert, SnackbarCloseReason } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import styles from './style.module.scss';
import { paymentOptions } from '@/data/paymentOptions';
import { shippingOptions } from '@/data/shippingOptions';
import { usePlaceOrderMutation } from '@/api/usePlaceOrderMutation';

export const SummaryComponent = () => {
    const { cart, address, shipping, payment, completeOrder, startNewOrder } = useCart();
    const { push } = useRouter();
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const paymentLabel = paymentOptions.find(option => option.value === payment)?.label;
    const shippingLabel = shippingOptions.find(option => option.value === shipping)?.label;

    const { mutate: placeOrder, isLoading, error } = usePlaceOrderMutation({
        onSuccess: () => {
            completeOrder();
            startNewOrder();
            setOpenSnackbar(true);
            setTimeout(() => push('/'), 2000);
        },
        onError: (error) => {
            console.error('Error placing order:', error.message);
        }
    });

    const handleOrder = () => {
        const orderDetails = {
            products: cart.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
                requiresShipping: product.requiresShipping
            })),
            deliveryAddress: address,
            shippingMethod: shipping,
            paymentMethod: payment
        };

        placeOrder(orderDetails);
    };

    const handleCloseSnackbar = (event: React.SyntheticEvent<any, Event> | Event, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };


    return (
        <div className={styles.summaryContainer}>
            <Typography variant="h4" component="h1" gutterBottom>Podsumowanie zamówienia</Typography>
            <List>
                <ListItem>
                    <ListItemText primary="Produkty:" secondary={cart.map(product => `${product.name} - ${product.price} zł`).join(', ')} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Adres dostawy:" secondary={`${address?.street}, ${address?.city}, ${address?.country}`} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Metoda wysyłki:" secondary={shippingLabel ? shippingLabel : "Pominięto"} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Metoda płatności:" secondary={paymentLabel ? paymentLabel : "Pominięto"} />
                </ListItem>
            </List>
            <Button variant="contained" color="primary" onClick={handleOrder} disabled={isLoading}>
                {isLoading ? 'Przetwarzanie...' : 'Złóż zamówienie'}
            </Button>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Zamówienie zostało złożone pomyślnie!
                </Alert>
            </Snackbar>
        </div>
    );
};
