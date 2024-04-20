
'use client'
import { useCart } from "@/contexts/CartContext";
import { Address } from "@/types/address.types";
import { Button, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useState } from "react";

export const AddressForm = () => {
    const { addAddress } = useCart();
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

    return (
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
            <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
                Dalej
            </Button>
        </Container>
    );
};