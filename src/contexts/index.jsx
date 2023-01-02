import { createContext } from "react"
import AuthState from "./auth"

export default function State (props) {

    return (
        <AuthState>
            {props.children}
        </AuthState>
    )
}