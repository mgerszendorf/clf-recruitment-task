'use client';
import React from 'react';
import { List, ListItem, ListItemText, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import styles from './style.module.scss';
import { paymentOptions } from '@/data/paymentOptions';
import { shippingOptions } from '@/data/shippingOptions';

export const SummaryComponent = () => {
    const { cart, address, shipping, payment, completeOrder } = useCart();
    const { push } = useRouter();

    const paymentLabel = paymentOptions.find(option => option.value === payment)?.label;
    const shippingLabel = shippingOptions.find(option => option.value === shipping)?.label;

    const handleOrder = async () => {
        const orderDetails = {
            products: cart.map(product => ({
                name: product.name,
                price: product.price
            })),
            deliveryAddress: address,
            shippingMethod: shipping,
            paymentMethod: payment
        };

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors" as RequestMode,
            body: JSON.stringify(orderDetails)
        };

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
            console.error('API URL is not defined');
            return;
        }

        try {
            const response = await fetch(apiUrl, options);
            const result = await response.json();
            if (result) {
                completeOrder()
                push('/');
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
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
            <Button variant="contained" color="primary" onClick={handleOrder}>
                Złóż zamówienie
            </Button>
        </div>
    );
};
