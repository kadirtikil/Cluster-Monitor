import { useState, useEffect } from "react"
import { Navigate, useNavigate } from "react-router"
import { useAuthStore } from "../../zustand/authStore"

import { Box, } from "@mui/system"
import { Tab, Tabs } from "@mui/material"

import Header from "../../components/header/header"
import SignUpForm from "../../components/form/Signupform"
import LogInForm from "../../components/form/Loginform"


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

  
function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
}
  
function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}   
  

export default function SignPage() {

    const authStatus = useAuthStore((state) => state.authStatus)
    const navigate = useNavigate()


    // set current tab with value
    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    useEffect(() => {
        if(authStatus) {
            navigate('/dashboard')
        }

        const checkAuth = async () => {
            try {
                const resp = await fetch(import.meta.env.VITE_AUTHSTATUS_URL, {
                    method: "POST",
                 
                })
              if(resp.ok) {
                    navigate('/dashboard')
                }
          } catch(err) {
                console.error(err)
            }
        }
        checkAuth()
    })

    



    return(
        <>
            <div className="w-screen h-screen grid grid-rows-8">
                <div className="row-start-1 row-end-2 place-items-center place-content-center">
                    <Header />
                </div>
                <div className="bg-white row-start-2 row-end-9 place-items-center place-content-center">
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'white' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="log in" {...a11yProps(0)} />
                            <Tab label="sign up" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <LogInForm />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <SignUpForm />
                    </CustomTabPanel>
                </div>
            </div>
        </>
    )
}