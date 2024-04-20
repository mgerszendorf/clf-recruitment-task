'use client'
import React, { createContext, useContext } from 'react';
import { useMachine } from '@xstate/react';
import { cartMachine } from '@/machines/cartMachines';
import { Product } from '@/types/product.types';
import { Address } from '@/types/address.types';

interface CartProviderProps {
    children: React.ReactNode;
}

interface ICartContext {
    cart: Product[];
    address?: Address;
    addProduct: (product: Product) => void;
    removeProduct: (productId: number) => void;
    addAddress: (address: Address) => void;
}

const CartContext = createContext<ICartContext | undefined>(undefined);

export const CartProvider = ({ children }: CartProviderProps) => {
    const [state, send] = useMachine(cartMachine);

    const addProduct = (product: Product) => {
        send({ type: 'ADD_PRODUCT', product });
    };

    const removeProduct = (productId: number) => {
        send({ type: 'REMOVE_PRODUCT', productId });
    };

    const addAddress = (address: Address) => {
        send({ type: 'ADD_ADDRESS', address });
        console.log(state.context)
    };

    const value = {
        cart: state.context.cart,
        address: state.context.address,
        addProduct,
        removeProduct,
        addAddress,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
