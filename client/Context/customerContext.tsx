import React, {
 createContext,
 useState,
 PropsWithChildren,
 useContext,
//  useEffect,
} from "react";

export interface Customer {
 id: string;
 email: string;
 username: string;
 password: string;
}

export interface NewCustomer {
 email: string;
 username: string;
 password: string;
}

export interface RegisteredCustomer {
 username: string;
 password: string;
}

export interface CustomerContext {
 username: string;
 setUsername: React.Dispatch<React.SetStateAction<string>>;
 email: string;
 setEmail: React.Dispatch<React.SetStateAction<string>>;
 password: string;
 setPassword: React.Dispatch<React.SetStateAction<string>>;
//  authorization: () => void;
 registerCustomer: (newCustomer: NewCustomer) => Promise<void>;
 login: (registeredCustomer: RegisteredCustomer) => void;
 logout: () => void;
 loggedInCustomer?: Customer | null;
}

// Initialize the context with default values
const defaultValues: CustomerContext = {
 username: "",
 setUsername: () => {},
 email: "",
 setEmail: () => {},
 password: "",
 setPassword: () => {},
//  authorization: () => {},
 registerCustomer: async () => {},
 login: async () => {},
 logout: () => {},
 loggedInCustomer: null,
};

// Create the UserContext
export const CustomerContext = createContext<CustomerContext>(defaultValues);
// eslint-disable-next-line react-refresh/only-export-components
export const useCustomerContext = () => useContext(CustomerContext);

// UserProvider component
const CustomerProvider = ({ children }: PropsWithChildren<{}>) => { //object
 const [loggedInCustomer, setloggedInCustomer] = useState<Customer | null>(null);
 const [username, setUsername] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

//  const authorization = async () => {
//    try {
//      const response = await fetch("/api/customers/authorize");
//      const data = await response.json();
//      if (response.status === 200 || response.status === 304) {
//        setloggedInCustomer(data);
//      }
//    } catch (err) {
//      console.log(err);
//    }
//  };

//  useEffect(() => {
//    authorization();
//  }, []);

 // Function to register a new user
 const registerCustomer = async (newCustomer: NewCustomer) => {
   try {
     const response = await fetch("api/customers/register", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(newCustomer),
     });
     const data = await response.json();

     if (response.status === 200) {
       console.log(data);
     }
     if (response.status === 409) {
       console.log("error register");
     }
   } catch (error) {
     console.log(error);
   }
 };

 const login = async (customer: RegisteredCustomer) => {
   if (customer) {
     try {
       const response = await fetch("api/customers/login", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(customer),
       });
       const data = await response.json();
       console.log(data);
       if (response.status === 200) {
         setloggedInCustomer(data);
         console.log(loggedInCustomer)
       }
       if (response.status === 404) {
         console.log("error");
       }
     } catch (error) {console.log(error)}
   }
 };

 // Function to log the user out
 const logout = async () => {
   try {
     const response = await fetch("api/customers/logout", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
     });
     if (response.status === 200) {
       setloggedInCustomer(null);
     }
   } catch (error) {
     console.log(error);
   }
 };

 return (
   <CustomerContext.Provider
     value={{
       username,
       setUsername,
       email,
       setEmail,
       password,
       setPassword,
      //  authorization,
       registerCustomer, 
       login,
       logout, 
       loggedInCustomer
     }}
   >
     {children}
   </CustomerContext.Provider>
 );
};

export default CustomerProvider;