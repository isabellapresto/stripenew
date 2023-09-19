import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ProductProvider from "../Context/productContext.js";

ReactDOM.createRoot(document.getElementById("root")!).render(

    <ProductProvider>
    <App/>
    </ProductProvider>

);
