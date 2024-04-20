'use client';
import React from 'react';
import { List, ListItem, ListItemText, Button, Typography } from '@mui/material';
import { useCart } from '@/contexts/CartContext';
import styles from './style.module.scss';
import { paymentOptions } from '@/data/paymentOptions';
import { shippingOptions } from '@/data/shippingOptions';

export const SummaryComponent = () => {
    const { cart, address, shipping, payment } = useCart();

    const paymentLabel = paymentOptions.find(option => option.value === payment)?.label;
    const shippingLabel = shippingOptions.find(option => option.value === shipping)?.label;

    return (
        <div className={styles.summaryContainer}>
            <Typography variant="h4" component="h1" gutterBottom>Podsumowanie zamówienia</Typography>
            <List>
                <ListItem>
                    <ListItemText primary="Produkty:" secondary={cart.map(product => `${product.name} - ${product.price} PLN`).join(', ')} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Adres dostawy:" secondary={`${address?.street}, ${address?.city}, ${address?.country}`} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Metoda wysyłki:" secondary={shippingLabel} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Metoda płatności:" secondary={paymentLabel} />
                </ListItem>
            </List>
            <Button variant="contained" color="primary">
                Złóż zamówienie
            </Button>
        </div>
    );
};
