'use client';
import React, { createContext, useContext } from 'react';
import { useMachine } from '@xstate/react';
import { cartMachine } from '@/machines/cartMachines';
import { Address } from '@/types/address.types';
import { Product } from '@/types/product.types';

interface CartProviderProps {
    children: React.ReactNode;
}

interface ICartContext {
    cart: Product[];
    address?: Address;
    shipping?: string;
    payment?: string;
    addProduct: (product: Product) => void;
    removeProduct: (productId: number) => void;
    addAddress: (address: Address) => void;
    selectShipping: (shipping: string) => void;
    skipShipping: () => void;
    selectPayment: (payment: string) => void;
    skipPayment: () => void;
    completeOrder: () => void;
    goBack: (from: string) => void;
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
    };

    const selectShipping = (shipping: string) => {
        send({ type: 'SELECT_SHIPPING', shipping });
    };

    const skipShipping = () => {
        send({ type: 'SKIP_SHIPPING' });
    };

    const selectPayment = (payment: string) => {
        send({ type: 'SELECT_PAYMENT', payment });
    };

    const skipPayment = () => {
        send({ type: 'SKIP_PAYMENT' });
    };

    const completeOrder = () => {
        send({ type: 'COMPLETE_ORDER' });
    };

    const goBack = (from: string) => {
        send({ type: 'GO_BACK', from });
    };

    const value = {
        cart: state.context.cart,
        address: state.context.address,
        shipping: state.context.shipping,
        payment: state.context.payment,
        addProduct,
        removeProduct,
        addAddress,
        selectShipping,
        skipShipping,
        selectPayment,
        skipPayment,
        completeOrder,
        goBack,
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
