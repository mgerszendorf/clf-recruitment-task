'use client'
import { useCart } from "@/contexts/CartContext";
import { Address } from "@/types/address.types";
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import styles from './style.module.scss';

export const AddressForm = () => {
    const { addAddress, goBack } = useCart();
    const [addressData, setAddressData] = useState<Address>({ street: '', city: '', country: 'Polska' });

    const handleChange = (event: SelectChangeEvent) => {
        setAddressData({
            ...addressData,
            [event.target.name]: event.target.value as string,
        });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddressData({
            ...addressData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = () => {
        addAddress({
            street: addressData.street,
            city: addressData.city,
            country: addressData.country
        });
    };

    const handleBack = () => {
        goBack()
    }

    const isFormComplete = addressData.street && addressData.city && addressData.country;

    return (
        <div className={styles.addressFormContainer}>
            <Typography variant="h4" component="h1" gutterBottom>
                Podaj adres dostawy
            </Typography>
            <Container maxWidth="sm">
                <TextField
                    label="Ulica"
                    name="street"
                    fullWidth
                    margin="normal"
                    value={addressData.street}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    label="Miasto"
                    name="city"
                    fullWidth
                    margin="normal"
                    value={addressData.city}
                    onChange={handleInputChange}
                    required
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="country-label">Kraj</InputLabel>
                    <Select
                        labelId="country-label"
                        id="country-select"
                        name="country"
                        value={addressData.country}
                        onChange={handleChange}
                        label="Kraj"
                        required
                    >
                        <MenuItem value="Polska">Polska</MenuItem>
                        <MenuItem value="USA">USA</MenuItem>
                    </Select>
                </FormControl>
                <Box className={styles.buttonsContainer}>
                    <Link href="/cart" passHref>
                        <Button onClick={handleBack} type="submit" variant="outlined">
                            Wstecz
                        </Button>
                    </Link>
                    <Link href="/cart/shipping" passHref>
                        <Button onClick={handleSubmit} type="submit" variant="contained" color="primary" disabled={!isFormComplete}>
                            Dalej
                        </Button>
                    </Link>
                </Box>
            </Container>
        </div>
    );
};
