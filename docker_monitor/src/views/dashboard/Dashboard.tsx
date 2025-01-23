import { useEffect } from "react"

import { useNavigate } from "react-router"

import Header from "../../components/header/header"
import ContainerList from "../../components/body/ContainerList"

import LogoutIcon from '@mui/icons-material/Logout';

import { IconButton } from "@mui/material";


export default function Dashboard() {

    const navigate = useNavigate()

    useEffect(() => {
        const checkAuth = async() =>{
            try{
                const resp = await fetch(import.meta.env.VITE_AUTHSTATUS_URL, {
                    method: "POST",
                })

                if (!resp.ok){
                    navigate("/")
                }
                               
            } catch(err){
                console.error(err)
            }
        }   
        checkAuth()
    })

    const handleLogout = async () => {
        try{
            await fetch(import.meta.env.VITE_LOGOUT_URL, {
                method: "POST"
            })
        } catch(err){
            console.error(err)
        }
    }

    return (
        <div className="h-screen w-screen grid grid-row-8 grid-cols-10">
           
            <div className="row-start-1 row-end-3 col-start-1 col-end-11 w-screen grid grid-cols-11 ">

                <div className="place-items-center place-content-center col-start-5 col-end-8">
                    <Header/>
                </div>

                <div className="place-items-center place-content-center col-start-11 col-end-12">
                    <IconButton onClick={handleLogout} >
                        <LogoutIcon sx={{color: 'yellow'}}/>
                    </IconButton>
                </div>

            </div>
           
            <div className="row-start-3 row-end-9 col-start-1 col-end-11 place-items-center place-content-center">
                <ContainerList />
            </div>

        </div>
    )
}