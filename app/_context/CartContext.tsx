'use client';

import { createContext, useEffect, useState } from 'react';
import { ICartItem } from '../_interfaces/ICartItem';
import { getCartItems } from '../_lib/cart-service';

interface ICartContext {
	cart: ICartItem[];
	loading: boolean;
	cartIdArray: number[];
}

export const CartContext = createContext<ICartContext | null>(null);

export function CartProvider({ children }) {
	const [cart, setCart] = useState<ICartItem[]>([]);
	const [idArray, setIdArray] = useState<number[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const cartChannel = new BroadcastChannel('cart');

		async function checkCart() {
			const data = await getCartItems();
			setIdArray(data.map((item) => item.item.id));
			setCart(data);
			setLoading(false);
		}

		checkCart();

		cartChannel.onmessage = function (event) {
			if (event.data.type === 'CLEAR') {
				setCart([]);
				setIdArray([]);
				setLoading(false);
			} else if (event.data.type === 'UPDATE_ITEM') {
				checkCart();
			} else {
				setLoading(true);
				checkCart();
			}
		};

		return () => {
			cartChannel.close();
		};
	}, []);

	return (
		<CartContext.Provider value={{ cart, loading, cartIdArray: idArray }}>
			{children}
		</CartContext.Provider>
	);
}
