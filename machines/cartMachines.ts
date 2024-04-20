import { Address } from '@/types/address.types';
import { Product } from '@/types/product.types';
import { createMachine, assign } from 'xstate';

interface CartContext {
    cart: Product[];
    address?: Address;
}

type CartEvent =
    | { type: 'ADD_PRODUCT'; product: Product }
    | { type: 'REMOVE_PRODUCT'; productId: number }
    | { type: 'ADD_ADDRESS'; address: Address };

export const cartMachine = createMachine<CartContext, CartEvent>({
    id: 'cartMachine',
    initial: 'cart',
    context: {
        cart: [],
        address: undefined,
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
                        cart: (context, event) => context.cart.filter(product => product.id !== event.productId)
                    })
                },
                ADD_ADDRESS: {
                    target: 'addressed',
                    actions: assign({
                        address: (_, event) => event.address,
                    }),
                }
            }
        },
        addressed: {
            on: {
                ADD_ADDRESS: {
                    actions: assign({
                        address: (_, event) => event.address,
                    }),
                },
            }
        },
    }
});
