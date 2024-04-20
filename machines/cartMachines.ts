import { Address } from '@/types/address.types';
import { Product } from '@/types/product.types';
import { createMachine, assign } from 'xstate';

interface CartContext {
    cart: Product[];
    address?: Address;
    shipping?: string;
    payment?: string;
}

type CartEvent =
    | { type: 'ADD_PRODUCT'; product: Product }
    | { type: 'REMOVE_PRODUCT'; productId: number }
    | { type: 'ADD_ADDRESS'; address: Address }
    | { type: 'SELECT_SHIPPING'; shipping: string }
    | { type: 'SKIP_SHIPPING' }
    | { type: 'SELECT_PAYMENT'; payment: string }
    | { type: 'SKIP_PAYMENT' }
    | { type: 'COMPLETE_ORDER' }
    | { type: 'GO_BACK_TO_HOME' }
    | { type: 'GO_BACK' }

export const cartMachine = createMachine<CartContext, CartEvent>({
    id: 'cartMachine',
    initial: 'cart',
    context: {
        cart: [],
        address: undefined,
        shipping: undefined,
        payment: undefined,
    },
    predictableActionArguments: true,
    states: {
        cart: {
            on: {
                ADD_PRODUCT: {
                    actions: assign({
                        cart: (context, event) => [...context.cart, event.product],
                    }),
                },
                REMOVE_PRODUCT: {
                    actions: assign({
                        cart: (context, event) => context.cart.filter((product) => product.id !== event.productId),
                    }),
                },
                ADD_ADDRESS: {
                    target: 'addressed',
                    actions: assign({
                        address: (_, event) => event.address,
                    }),
                },
                GO_BACK: {
                    actions: assign({
                        address: (_) => undefined,
                        shipping: (_) => undefined,
                        payment: (_) => undefined,
                    }),
                },
                GO_BACK_TO_HOME: {
                    target: 'cart',
                    actions: assign({
                        cart: (_) => [],
                        address: (_) => undefined,
                        shipping: (_) => undefined,
                        payment: (_) => undefined,
                    }),
                },
            },
        },
        addressed: {
            on: {
                SELECT_SHIPPING: {
                    target: 'shipping_selected',
                    actions: assign({
                        shipping: (_, event) => event.shipping,
                    }),
                },
                SKIP_SHIPPING: {
                    target: 'shipping_skipped',
                    actions: assign({
                        shipping: (_) => undefined,
                    }),
                },
                GO_BACK: {
                    target: 'cart',
                    actions: assign({
                        address: (_) => undefined,
                    }),
                },
                GO_BACK_TO_HOME: {
                    target: 'cart',
                    actions: assign({
                        cart: (_) => [],
                        address: (_) => undefined,
                        shipping: (_) => undefined,
                        payment: (_) => undefined,
                    }),
                },
            },
        },
        shipping_selected: {
            on: {
                SELECT_PAYMENT: {
                    target: 'payment_selected',
                    actions: assign({
                        payment: (_, event) => event.payment,
                    }),
                },
                SKIP_PAYMENT: {
                    target: 'completed',
                    actions: assign({
                        payment: (_) => undefined,
                    }),
                },
                GO_BACK: {
                    target: 'addressed',
                    actions: assign({
                        shipping: (_) => undefined,
                    }),
                },
                GO_BACK_TO_HOME: {
                    target: 'cart',
                    actions: assign({
                        cart: (_) => [],
                        address: (_) => undefined,
                        shipping: (_) => undefined,
                        payment: (_) => undefined,
                    }),
                },
            },
        },
        shipping_skipped: {
            on: {
                SELECT_PAYMENT: {
                    target: 'payment_selected',
                    actions: assign({
                        payment: (_, event) => event.payment,
                    }),
                },
                SKIP_PAYMENT: {
                    target: 'completed',
                    actions: assign({
                        payment: (_) => undefined,
                    }),
                },
                GO_BACK: {
                    target: 'addressed',
                    actions: assign({
                        shipping: (_) => undefined,
                    }),
                },
                GO_BACK_TO_HOME: {
                    target: 'cart',
                    actions: assign({
                        cart: (_) => [],
                        address: (_) => undefined,
                        shipping: (_) => undefined,
                        payment: (_) => undefined,
                    }),
                },
            },
        },
        payment_selected: {
            on: {
                COMPLETE_ORDER: {
                    target: 'completed',
                },
                GO_BACK: {
                    target: 'shipping_selected',
                    actions: assign({
                        payment: (_) => undefined,
                    }),
                },
                GO_BACK_TO_HOME: {
                    target: 'cart',
                    actions: assign({
                        cart: (_) => [],
                        address: (_) => undefined,
                        shipping: (_) => undefined,
                        payment: (_) => undefined,
                    }),
                },
            },
        },
        payment_skipped: {
            on: {
                COMPLETE_ORDER: {
                    target: 'completed',
                },
                GO_BACK: {
                    target: 'shipping_selected',
                    actions: assign({
                        payment: (_) => undefined,
                    }),
                },
                GO_BACK_TO_HOME: {
                    target: 'cart',
                    actions: assign({
                        cart: (_) => [],
                        address: (_) => undefined,
                        shipping: (_) => undefined,
                        payment: (_) => undefined,
                    }),
                },
            },
        },

        completed: {
            type: 'final',
        },
    },
});

