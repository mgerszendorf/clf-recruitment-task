import { Address } from '@/types/address.types';
import { Product } from '@/types/product.types';
import { useMutation, UseMutationOptions } from 'react-query';
import axios from 'axios';

interface OrderDetails {
    products: Product[];
    deliveryAddress?: Address;
    shippingMethod?: string;
    paymentMethod?: string;
}

interface OrderResponse {
    success: boolean;
    message: string;
}

const placeOrder = async (orderDetails: OrderDetails): Promise<OrderResponse> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        throw new Error('API URL is not defined');
    }

    try {
        const response = await axios.post(apiUrl, orderDetails, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Unknown error occurred');
        } else {
            throw new Error('Network error');
        }
    }
};

export const usePlaceOrderMutation = (options?: UseMutationOptions<OrderResponse, Error, OrderDetails>) => {
    return useMutation<OrderResponse, Error, OrderDetails>(placeOrder, options);
};
