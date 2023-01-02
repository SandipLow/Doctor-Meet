import { createContext } from "react";
import { useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthState(props) {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    // Auth State check:
    useEffect(() => {
        
    }, [])

    // Sign In :
    const signIn = (email, password)=>{
        // TODO : SIGN IN CODE :::::::::::
        let users = [
            {
                email : "doctor1@apollo.org",
                password : "doctor1"
            },
            {
                email : "doctor2@apollo.org",
                password : "doctor2"
            },
            {
                email : "doctor3@apollo.org",
                password : "doctor3"
            },
        ]

        for (let i=0; i<users.length; i++) {
            if (users[i].email == email) {
                if (users[i].password == password) {
                    let newUser = {
                        id : users[i].email,
                        username : users[i].password
                    }
                    setUser(newUser)
                    localStorage.setItem("user", JSON.stringify(newUser))
                    return "Success"
                }
                else {
                    return "Invalid credentials"
                }
            }
        }
        // :::::::::::::

        return "User Not Found"

    }

    // Sign Out :
    const signOut = ()=> {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user:user, setUser: setUser, signOut: signOut, signIn: signIn}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;