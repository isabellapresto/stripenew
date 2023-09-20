import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ProductProvider from "../Context/productContext.js";
import CustomerProvider from "../Context/customerContext.js";

ReactDOM.createRoot(document.getElementById("root")!).render(

    <ProductProvider>
    <CustomerProvider>
    <App/> 
    </CustomerProvider> 
    </ProductProvider>

);
