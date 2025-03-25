import { createContext, useContext, useRef, useState } from "react"
import { inputStyle } from "../components/Inputs/InputAuthen/inputStyles";


const LoginContext = createContext();




function LoginProvider({ children }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const usernameRef = useRef();
    const passwordRef = useRef();

    const [error, setError] = useState({ status: false, message: "" });
    const [isLoading, setIsLoading] = useState(false);
    function handleClientErrors() {

        ////empty inputs checking
        if (!username || !password) {
            setError((prev) => ({
                ...prev,
                status: true,
                message: "Please fill inputs",
            }));

            if (!username) usernameRef.current.style.borderColor = inputStyle.error;
            if (!password) passwordRef.current.style.borderColor = inputStyle.error;
            return true;
        }


        return false;
    }
    return (
        <LoginContext.Provider
            value={{
                username,
                setUsername,
                password,
                setPassword,
                usernameRef,
                passwordRef,
                error,
                setError,
                isLoading,
                setIsLoading,
                handleClientErrors,
            }}
        >

            {children}

        </LoginContext.Provider>
    )
}
function useLogin() {
    const context = useContext(LoginContext);
    if (context === undefined) throw new Error("outside of LoginProvider");

    return context
}

export { LoginProvider, useLogin };