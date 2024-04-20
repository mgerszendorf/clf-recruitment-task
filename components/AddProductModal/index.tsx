'use client'
import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useCart } from '@/contexts/CartContext';
import styles from './style.module.scss';

interface AddProductModalProps {
    open: boolean;
    onClose: () => void;
}

interface ProductFormState {
    name: string;
    price: number | null;
    requiresShipping: boolean;
}

export const AddProductModal = ({ open, onClose }: AddProductModalProps) => {
    const { addProduct } = useCart();
    const [product, setProduct] = useState<ProductFormState>({ name: '', price: null, requiresShipping: false });

    const isFormValid = product.name.trim() !== '' && product.price !== null && product.price > 0;

    const handleChange = (key: keyof ProductFormState, value: any) => {
        setProduct(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        if (isFormValid && product.price !== null) {
            addProduct({
                id: Math.random(),
                name: product.name,
                price: product.price,
                requiresShipping: product.requiresShipping
            });
            handleClose();
        }
    };

    const handleClose = () => {
        setProduct({ name: '', price: null, requiresShipping: false });
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="add-product-title"
            aria-describedby="add-product-description"
        >
            <Box className={styles.modalContainer}>
                <Typography id="add-product-title" variant="h6" component="h2">
                    Dodaj nowy produkt
                </Typography>
                <TextField
                    label="Nazwa Produktu"
                    variant="standard"
                    fullWidth
                    value={product.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    inputProps={{ maxLength: 20 }}
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Cena"
                    variant="standard"
                    fullWidth
                    value={product.price || ''}
                    onChange={(e) => handleChange('price', Number(e.target.value))}
                    type="number"
                    sx={{ mt: 2 }}
                />
                <FormControl fullWidth sx={{ mt: 4 }}>
                    <InputLabel id="shipping-required-label">Wymaga wysyłki?</InputLabel>
                    <Select
                        labelId="shipping-required-label"
                        id="shipping-required-select"
                        value={product.requiresShipping ? 'yes' : 'no'}
                        label="Wymaga wysyłki?"
                        onChange={(e) => handleChange('requiresShipping', e.target.value === 'yes')}
                    >
                        <MenuItem value="yes">Tak</MenuItem>
                        <MenuItem value="no">Nie</MenuItem>
                    </Select>
                </FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                    <Button onClick={handleClose} variant="outlined" sx={{ mr: 2 }}>
                        Anuluj
                    </Button>
                    <Button onClick={handleSubmit} variant="contained" disabled={!isFormValid}>
                        Dodaj
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};
