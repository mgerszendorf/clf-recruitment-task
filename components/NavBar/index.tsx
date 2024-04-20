'use client';
import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from './style.module.scss';
import { Button } from '@mui/material';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

interface NavBar {
    hideCartButton: boolean;
    blockCallLogoFunction: boolean;
}

export const NavBar = ({ hideCartButton, blockCallLogoFunction }: NavBar) => {
    const { cart, goBackToHome } = useCart();

    const handleLogoClick = () => {
        goBackToHome();
    };

    return (
        <header className={styles.header}>
            <div>
                {!blockCallLogoFunction ?
                    <Link href="/" passHref className={styles.link} onClick={handleLogoClick}>
                        <p className={styles.logo}>LOGO</p>
                    </Link> :
                    <p className={styles.logo}>LOGO</p>
                }
            </div>
            {hideCartButton &&
                <Link href="/cart" passHref>
                    <Button variant="contained">
                        <p>Koszyk</p>
                        <ShoppingCartIcon />
                        {cart.length > 0 &&
                            <span className={styles.cartCount}>{cart.length}</span>
                        }
                    </Button>
                </Link>
            }
        </header>
    );
}
