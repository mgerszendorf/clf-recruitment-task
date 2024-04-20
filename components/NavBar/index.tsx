'use client';
import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from './style.module.scss';
import { Button } from '@mui/material';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

export const NavBar = () => {
    const { cart, goBack } = useCart();

    const handleLogoClick = () => {
        goBack('home');
    };

    return (
        <header className={styles.header}>
            <div>
                <Link href="/" passHref className={styles.link} onClick={handleLogoClick}>
                    <p className={styles.logo}>LOGO</p>
                </Link>
            </div>
            <Link href="/cart" passHref>
                <Button variant="contained">
                    <p>Koszyk</p>
                    <ShoppingCartIcon />
                    {cart.length > 0 &&
                        <span className={styles.cartCount}>{cart.length}</span>
                    }
                </Button>
            </Link>
        </header>
    );
}
