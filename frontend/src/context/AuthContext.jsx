import { createContext, useState, useEffect } from "react";

// Creating a context for authentication
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => { 
    // AuthProvider component provides authentication state to its children components

    const [user, setUser] = useState(() => { 
        // Initializing user state with a function to retrieve saved user from localStorage

        const savedUser = localStorage.getItem("user"); 
        //  Retrieving user data from localStorage (if available)

        return savedUser ? JSON.parse(savedUser) : null; 
        //  Parsing the stored user data if found, otherwise setting user state to null
    });

    useEffect(() => { 
        //  useEffect runs whenever 'user' state changes to keep localStorage updated

        console.log("User in Context:", user); //  Debugging

        if (user) { 
            // If a user is logged in, save their data to localStorage
            localStorage.setItem("user", JSON.stringify(user));
        } else { 
            //  If user logs out, remove the user data from localStorage
            localStorage.removeItem("user");
        }
    }, [user]); 
    //  Dependency array ensures this effect runs when 'user' state changes

    return (
        <AuthContext.Provider value={{ user, setUser }}> 
            {/*  Providing user state and setUser function to all child components */}
            {children} 
            {/*  Rendering child components inside the provider */}
        </AuthContext.Provider>
    );
};





// What this code does:
// Creates an authentication context (AuthContext) to store and manage user authentication state.
// Initializes user state from localStorage (if available) to persist login sessions.
// Uses useEffect to update localStorage whenever the user state changes.
// Provides user and setUser via AuthContext.Provider to allow other components to access and update authentication data.
// Supports authentication persistence (keeps the user logged in even after page refresh).