import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { CartProvider } from './_context/CartContext';
import { WishlistProvider } from './_context/WishlistContext';

export function ContextProviders({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<CartProvider>
				<WishlistProvider>
					<ChakraProvider>{children}</ChakraProvider>
				</WishlistProvider>
			</CartProvider>
		</SessionProvider>
	);
}
