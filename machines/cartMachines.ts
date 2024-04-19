import { Product } from '@/types/product.types';
import { createMachine, assign } from 'xstate';

interface CartContext {
    cart: Product[];
}

type CartEvent =
    | { type: 'ADD_PRODUCT'; product: Product }
    | { type: 'REMOVE_PRODUCT'; productId: number };

export const cartMachine = createMachine<CartContext, CartEvent>({
    id: 'cartMachine',
    initial: 'cart',
    context: {
        cart: []
    },
    states: {
        cart: {
            on: {
                ADD_PRODUCT: {
                    actions: assign({
                        cart: (context, event) => [...context.cart, event.product]
                    })
                },
                REMOVE_PRODUCT: {
                    actions: assign({
                        cart: (context, event) => context.cart.filter((product: Product) => product.id !== event.productId)
                    })
                }
            }
        }
    }
});