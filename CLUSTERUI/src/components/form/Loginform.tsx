import { useState } from "react"
import { useNavigate } from "react-router"
import { useAuthStore } from "../../zustand/authStore"

import { FormControl, InputLabel, Input, FormHelperText, Button } from "@mui/material"



export default function LogInForm() {
    const setAuthStatus = useAuthStore((state) => state.setAuthStatus)  

    const navigate = useNavigate()
    
    const [email, setEmail]= useState('')
    const [pw, setPw] = useState('')

    const [emailErr, setEmailErr] = useState(false)
    const [pwErr, setPwErr] = useState(false)    

    const checkEmailFormat = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            setEmailErr(false);
            setEmail(email);
        } else {
            setEmailErr(true);
        }
    }
    
    const checkPasswordFormat = (pw: string) => {
        const minLength = 8; // Increased security
        const hasNumber = /\d/.test(pw);
        const hasUpperCase = /[A-Z]/.test(pw);
        const hasLowerCase = /[a-z]/.test(pw);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pw);
    
        if (pw.length >= minLength && hasNumber && hasUpperCase && hasLowerCase && hasSpecialChar) {
            setPwErr(false);
            setPw(pw);
        } else {
            setPwErr(true);
        }
    }

    const handleLogin = async() => {
       try { 
            if(!pwErr && !emailErr) {
                const payload = {
                    email,
                    password: pw
                }

                const resp = await fetch(import.meta.env.VITE_LOGIN_URL, {
                    method: "POST",
                    headers: { "Accept": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(payload),
                })


                if(resp.ok){
                    setAuthStatus(true)
                    navigate("/dashboard")
                } 

                


            }
        } catch(err) {
            console.error(err)
        }
    }

    return (
        <div className="flex flex-col space-y-5">
            <FormControl>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" error={emailErr} onChange={(event) => checkEmailFormat(event.target.value)} />
                <FormHelperText id="my-helper-text">Enter your email</FormHelperText>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Password</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" error={pwErr} onChange={(event) => checkPasswordFormat(event.target.value)}/>
                <FormHelperText id="my-helper-text">Enter your password</FormHelperText>
            </FormControl>
            <Button onClick={handleLogin}>
                Submit
            </Button>
        </div>
    )

}