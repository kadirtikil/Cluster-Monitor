
import { FormControl, InputLabel, Input, FormHelperText, Button } from "@mui/material"
import { useState } from "react"

import { Dialog, DialogTitle, DialogContent } from "@mui/material"

export default function SignUpForm() {

    const [email, setEmail]= useState('')
    const [pw, setPw] = useState('')

    const [emailErr, setEmailErr] = useState(false)
    const [pwErr, setPwErr] = useState(false)    
    const [pwEqual, setPwEqual] = useState(false)


    const [dialogOpen, setDialogOpen] = useState(false)


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
        const minLength = 8;
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

    const checkPwEqual = (pw2: string) => {
        if (pw === pw2) {
            setPwEqual(false)
        } else {
            setPwEqual(true)
        }
    }
    

    const handleSignUp = async () => {
        try { 
            if (!emailErr && !pwErr && !pwEqual && pw !== "") {
                    
                const payload = { email, password: pw }
                
                const resp = await fetch(import.meta.env.VITE_SIGNUP_URL, {
                    method: "POST",
                    headers: { "Accept": "application/json" },
                    body: JSON.stringify(payload),
                });
    
                const msg = await resp.json()

                console.log(msg?.msg)

                if(msg?.msg == "User has been created successfully!" && resp.ok) {
                    setDialogOpen(true)
                }
                
            
            }
        } catch (err) {
            console.error("Fetch error:", err)
        }
    };
    
    const handleSignupConfirm = () => {
        window.location.href = "/"
    }


    return (
        <div className="flex flex-col space-y-5">
            <FormControl required>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" error={emailErr} onChange={(event) => checkEmailFormat(event.target.value)}/>
                <FormHelperText id="my-helper-text">Enter your email</FormHelperText>
            </FormControl>
            <FormControl required>
                <InputLabel htmlFor="my-input">Password</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" error={pwErr} onChange={(event) => checkPasswordFormat(event.target.value)}/>
                <FormHelperText id="my-helper-text">Enter your password</FormHelperText>
            </FormControl>
            <FormControl required>
                <InputLabel htmlFor="my-input">Repeat password</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" error={pwEqual} onChange={(event) => checkPwEqual(event.target.value) }/>
                <FormHelperText id="my-helper-text">verify your password</FormHelperText>
            </FormControl>
            <Button onClick={handleSignUp}>
                Submit
            </Button>

            <Dialog
                open={dialogOpen}
                onClose={handleSignupConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    {"Your account has been created, you can now log in!"}
                </DialogTitle>
                <DialogContent>
                    <Button onClick={handleSignupConfirm}>
                        continue to log in  
                    </Button>
                </DialogContent>

            </Dialog>

        </div>
    )

}