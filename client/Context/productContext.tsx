import  { PropsWithChildren, createContext, useContext, useState, useEffect} from "react";
// import { user } from "./userContext"

interface IProductContext {
 products: ProductData [];
 setProducts: React.Dispatch<React.SetStateAction<ProductData[]>>;
 listProducts: () => void;

 cart: CartItem[];
 setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
 handlePayment: () => void;
 addToCart: (id: string, name: string, image:string, price:string, currency:string) => void;
}

interface ProductData {
 id: "string";
 product: "string";
 price: ProductPrice;
 name: string;
 default_price: ProductPrice;
 description: "string";
 images: string;
 image: string;
}

 interface ProductPrice {
 currency: string;
 unit_amount: string;
 id: string;
}

 interface CartItem {
 product: string;
 quantity: number;
 name: string;
 price: string;
 image: string;
}

const defaultValues = {
 products: [],
 cart: [],
 setProducts: () => [],
 addToCart: () => {},
 listProducts: () => {},
 setCart: () => [],
 handlePayment: () => [],
}

const ProductContext = createContext<IProductContext>(defaultValues);
// eslint-disable-next-line react-refresh/only-export-components 
export const useProductContext = () => useContext(ProductContext);

const ProductProvider = ({children}: PropsWithChildren) => {
const [products, setProducts] = useState<ProductData[]>([]);
const [cart, setCart] = useState<CartItem[]>([]);

async function listProducts() {
    try {
        const response = await fetch(
            "/api/products"
            );

            const data = await response.json();
            const mappedProducts = data.data.map((product: ProductData) => ({

                name: product.name,
                description: product.description,
                product: product.default_price,
                image: product.images[0],
                id: product.id,
                price: {

                    currency: product.default_price.currency,
                    unit_amount: (parseFloat(product.default_price.unit_amount) / 100).toFixed(2),
                    id: product.default_price.id
                }
            }));
            setProducts(mappedProducts);
            console.log(data);
        }catch(err){

     console.log(err);
 }
}

useEffect(() => {
    listProducts();
}, []);

function addToCart (id: string, name: string, image:string, price:string, currency:string) {
    const existingCartItem = cart.find((item) => item.product === id);
 // If the product is already in the cart, update  quantity
        if (existingCartItem) {
            setCart((prevCart) =>prevCart.map((item) => item.product === id? { ...item, quantity: item.quantity + 1 }: item))
        } else {
            setCart((prevCart) => [...prevCart,
                {product: id,
                quantity: 1, 
                name: name,
                image: image,
                price: price,
                currency: currency,   
                },
            ]);
            console.log(cart);
        }
    }
    
    async function handlePayment() {
        // kan lägga if(loggedInUser) här{
            const response = await fetch("/api/create-checkout-session",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(cart),
                });
                
                if (!response.ok) {
                    return;
            }
            const { url } = await response.json();window.location = url;
        // } else {
        //     console.log("you are not logged in");
        // }
    }

 return (
  <ProductContext.Provider 
  value={{ products, cart, setCart, addToCart, setProducts, listProducts, handlePayment }}>
 {children}
  </ProductContext.Provider>
 )
}
 export default ProductProvider

