'use client';
import React from 'react';
import { products } from "@/data/products"
import { Product } from "@/types/product.types"
import { Grid, Card, CardActions, CardContent, Typography, Box, Button } from '@mui/material';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import styles from './style.module.scss';
import { useCart } from '@/contexts/CartContext';
import { truncate } from '@/utils/truncate';

export const AllProducts = () => {
    const { addProduct } = useCart();

    return (
        <div className={styles.allProductsContainer}>
            <Grid container spacing={4}>
                {products.map((product: Product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <Card className={styles.card}>
                            <Box display="flex" justifyContent="center" alignItems="center" height="140px">
                                <ImageNotSupportedIcon className={styles.imageNotSupportedIcon} />
                            </Box>
                            <CardContent className={styles.cardContent}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {truncate(product.name, 20)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Cena: {product.price} zł
                                    <br />
                                    Wymaga wysyłki: {product.requiresShipping ? 'Tak' : 'Nie'}
                                </Typography>
                            </CardContent>
                            <CardActions className={styles.cardActions}>
                                <Button size="small" color="primary" onClick={() => addProduct(product)}>
                                    Dodaj do koszyka
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
