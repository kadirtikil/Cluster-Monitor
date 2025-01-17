
import { useEffect, useState } from "react"
import { ContainerInfo } from "../../assets/kadircomponents/container_monitor/TypesContainerJSON";



import { DataGrid, GridColDef } from "@mui/x-data-grid";

// Icons for operations
import { MdBlock } from "react-icons/md";
import { IoPlayOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";



// Services
import { FetchContainers } from "../../services/FetchContainer";
import { getDockerStatus } from "../../services/ContainerStatusIcon";

import { useContainerWsConnection } from "../../services/ContainerWs";

export default function Body() {

    const [containers, setContainers] = useState<ContainerInfo[]>([]);
    const {sendJsonMsg, lastMessage} = useContainerWsConnection(import.meta.env.VITE_WEBSOCKET_URL)
    

    const test = () => {
        console.log(lastMessage?.data)
    }

    // const [test, setTest] = useState("first version")

    // console.log(import.meta.env.VITE_RASBERRY_URL)
    // fetch the containers from rasberry
    useEffect(() => {
        const fetchContainers = async () => {
            try {
                const resp = await FetchContainers()
                setContainers(resp)


            } catch (err) {
                console.error("Error trying to fetch data: ", err);
            }
        };    
        fetchContainers();
    }, []);

   
   const columns:GridColDef[] = [
        {
            field: 'Image',
            headerName: 'Image',
            minWidth: 300,
            editable: false,
        },
        {
            field: 'ImageID',
            headerName: 'Imageid',
            minWidth: 300,
            editable: false,
        },
        {
            field: 'Status',
            headerName: 'Status',
            minWidth: 300,
            editable: false,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            minWidth: 300,
            cellClassName: 'actions',
            getActions: ({id}) => {
                // do some stuff here

                // the -1 is necessary because the array starts at 0 but the id starts from 1 therefore havin a diff of 1 that has to be accounted for
                const index = Number(id) - 1 ;
                if(getDockerStatus(containers[index].Status) === "Up"){
                    return [
                        <MdBlock onClick={() => sendJsonMsg("pause",containers[index].Id)} style={{color: 'red', cursor: 'pointer'}}/>,
                        <AiOutlineDelete onClick={() => sendJsonMsg("remove",containers[index].Id)} style={{color: 'black', cursor: 'pointer'}}/>,
                        <IoMdClose onClick={() => sendJsonMsg("kill",containers[index].Id)} style={{color: 'red', cursor: 'pointer'}}/>,
                    ]
                } else if(getDockerStatus(containers[index].Status) === "Paused") {
                    return [
                        <IoPlayOutline onClick={() => sendJsonMsg("restart",containers[index].Id)} style={{color: 'green', cursor: 'pointer'}}/>,
                        <AiOutlineDelete onClick={() => sendJsonMsg("remove",containers[index].Id)} style={{color: 'black', cursor: 'pointer'}}/>,
                        <IoMdClose onClick={() => sendJsonMsg("kill",containers[index].Id)} style={{color: 'red', cursor: 'pointer'}}/>,
                    ]
                } else if(getDockerStatus(containers[index].Status) === "Exited") {
                    return [
                        <IoPlayOutline onClick={() => sendJsonMsg("restart",containers[index].Id)} style={{color: 'green', cursor: 'pointer'}}/>,
                        <AiOutlineDelete onClick={() => sendJsonMsg("remove",containers[index].Id)} style={{color: 'black', cursor: 'pointer'}}/>,
                    ]
                } else {
                    return []
                }
            },
        }

    ];

    const rows = containers.map((item, index) => ({
        id: index + 1, 
        ...item,    
      }));
      

    return (
        <>
        <button onClick={test}>TEST</button>
        <div className="h-[80vh] w-[90vw] bg-gray-500 bg-opacity-30">
                <DataGrid rows={rows} columns={columns} 
                    sx={{backgroundColor: 'white'}}
                />
        </div>
        </>
    )
}