import { createContext, useContext, useRef, useState } from "react"
import validator from "validator";

const RegisterContext = createContext();


const inputStyle = {
    error: "red",
    default: "rgb(133, 127, 127)"
}

function RegisterProvider({ children }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    // error is an object: { status: boolean, message: string }
    const [error, setError] = useState({ status: false, message: "" });
    const [isLoading, setIsLoading] = useState(false);

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordCheckRef = useRef();


    function handleClientErrors() {

        ////empty inputs checking
        if (!username || !email || !password || !passwordCheck) {
            setError((prev) => ({
                ...prev,
                status: true,
                message: "Please fill inputs",
            }));

            if (!username) usernameRef.current.style.borderColor = inputStyle.error;
            if (!email) emailRef.current.style.borderColor = inputStyle.error;
            if (!password) passwordRef.current.style.borderColor = inputStyle.error;
            if (!passwordCheck) passwordCheckRef.current.style.borderColor = inputStyle.error;
            return true;
        }

        ///password checking
        if (password !== passwordCheck) {
            setError((prev) => ({
                ...prev,
                status: true,
                message: "Passwords do not match",
            }));
            passwordRef.current.style.borderColor = inputStyle.error;
            passwordCheckRef.current.style.borderColor = inputStyle.error;
            setPassword("");
            setPasswordCheck("");
            return true;
        }
        if (!validator.isEmail(email)) {
            setError((prev) => ({
                ...prev,
                status: true,
                message: "please enter valid email",
            }));
            setEmail("");
            emailRef.current.style.borderColor = inputStyle.error;
            return true;
        }
        return false;
    }


    return (
        <RegisterContext.Provider
            value={{
                username,
                email,
                password,
                passwordCheck,
                error,
                isLoading,
                usernameRef,
                emailRef,
                passwordRef,
                passwordCheckRef,
                setUsername,
                setEmail,
                setPassword,
                setPasswordCheck,
                setError,
                setIsLoading,
                handleClientErrors,
                inputStyle
            }}>
            {children}
        </RegisterContext.Provider>

    )
}


function useRegister() {
    const context = useContext(RegisterContext);
    if (context === undefined) throw new Error("outside of RegisterProvider");

    return context


}

export { RegisterProvider, useRegister }
