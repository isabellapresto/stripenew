// import { createContext, useContext, ReactNode, useState } from "react";
// import { Price } from "../Context/productContext";

// export type CartItem = {
//   id: string;
//   quantity: number;
//   name: string;
//   price: Price;
// };

// type ShoppingCartContext = {
//   getItemQuantity: (id: string) => number;
//   addToCart: (id: string, name: string, price: Price) => void;
//   emptyCart: () => void;
//   cartQuantity: number;
//   cartItems: CartItem[];
// };

// type ShoppingCartProviderProps = {
//   children: ReactNode;
// };
// const ShoppingCartContext = createContext({} as ShoppingCartContext);

// export function useShoppingCart() {
//   return useContext(ShoppingCartContext);
// }

// export default function ShoppingCartProvider({
//   children,
// }: ShoppingCartProviderProps) {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   const cartQuantity = cartItems.reduce(
//     (quantity, item) => item.quantity + quantity,
//     0
//   );

//   function getItemQuantity(id: string) {
//     return cartItems.find((item) => item.id === id)?.quantity || 0;
//   }

//   function addToCart(id: string, name: string, price: Price) {
//     const quantity = getItemQuantity(id);
//     console.log(quantity);

//     if (quantity === 0) {
//       setCartItems([
//         ...cartItems,
//         {
//           id: id,
//           name: name,
//           price: price,
//           quantity: 1,
//         },
//       ]);
//     } else {
//       setCartItems(
//         cartItems.map((product) =>
//           product.id === id
//             ? { ...product, quantity: product.quantity + 1 }
//             : product
//         )
//       );
//     }
//   }

//   function emptyCart() {
//     setCartItems([]);
//   }

//   return (
//     <ShoppingCartContext.Provider
//       value={{
//         getItemQuantity,
//         addToCart,
//         emptyCart,
//         cartQuantity,
//         cartItems,
//       }}
//     >
//       {children}
//     </ShoppingCartContext.Provider>
//   );
// }