'use client';
import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from './style.module.scss';
import { Button } from '@mui/material';
import { useCart } from '@/contexts/CartContext';

export const NavBar = () => {
    const { cart } = useCart();

    return (
        <header className={styles.header}>
            <div>
                <p className={styles.logo}>LOGO</p>
            </div>
            <Button variant="contained">
                <p>Koszyk</p>
                <ShoppingCartIcon />
                {cart.length > 0 &&
                    <span className={styles.cartCount}>{cart.length}</span>
                }
            </Button>
        </header>
    );
}
