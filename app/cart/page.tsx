'use client'
import React, { useState } from 'react';
import { Typography, Button, List, ListItem, ListItemText, Box } from '@mui/material';
import { NavBar } from '@/components/NavBar';
import { useCart } from '@/contexts/CartContext';
import styles from './style.module.scss';
import { Product } from '@/types/product.types';
import AddProductModal from '@/components/AddProductModal.tsx';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const CartPage = () => {
    const { cart, removeProduct } = useCart();
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const totalSum = cart.reduce((acc, item) => acc + item.price, 0);

    return (
        <div>
            <NavBar />
            <Box className={styles.cartContainer}>
                <Box className={styles.yourCart}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Twój koszyk
                    </Typography>
                    <Button variant="outlined" onClick={handleOpenModal}>
                        Dodaj produkt
                    </Button>
                </Box>
                <List>
                    {cart.length > 0 ? (
                        cart.map((item: Product) => (
                            <ListItem key={item.id} divider>
                                <ListItemText primary={item.name} secondary={`Cena: ${item.price} zł`} />
                                <Button variant="contained" color="error" onClick={() => removeProduct(item.id)}>
                                    Usuń
                                </Button>
                            </ListItem>
                        ))
                    ) : (
                        <Box className={styles.emptyCart}>
                            <RemoveShoppingCartIcon className={styles.removeShoppingCartIcon} />
                            <Typography component="p">
                                Koszyk jest pusty
                            </Typography>
                        </Box>
                    )}
                </List>
                {cart.length > 0 &&
                    <Box className={styles.nextStepContainer}>
                        <Typography variant="h6" component="p">
                            Suma: {totalSum} zł
                        </Typography>
                        <Button variant="contained" disabled={cart.length === 0}>
                            Przejdź dalej
                        </Button>
                    </Box>
                }
            </Box>
            <AddProductModal open={modalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default CartPage;
