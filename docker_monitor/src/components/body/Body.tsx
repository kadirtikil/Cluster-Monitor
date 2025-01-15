
import { useEffect, useState } from "react"
import { ContainerInfo } from "../../assets/kadircomponents/container_monitor/TypesContainerJSON";


import { FetchContainers } from "../../services/FetchContainer";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

// Icons for operations
import { MdBlock } from "react-icons/md";
import { IoPlayOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";


// Icons for status
import { containerOp } from "../../services/DockerOps";



// Create a context, such that the data that has been fetched here, is available down the tree
// so i dont have to pass, all the props to all the components.

export default function Body() {


    const [containers, setContainers] = useState<ContainerInfo[]>([]);

    // const [test, setTest] = useState("first version")

    // console.log(import.meta.env.VITE_RASBERRY_URL)
    // fetch the containers from rasberry
    useEffect(() => {
        const fetchContainers = async () => {
            try {
                const resp = await FetchContainers()
                setContainers(resp)

                console.log(resp)

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
                return [
                    <MdBlock onClick={() => containerOp(containers[Number(id) - 1].Id, import.meta.env.VITE_RASBERRY_URL_PAUSE)} style={{color: 'red', cursor: 'pointer'}}/>,
                    <IoPlayOutline onClick={() => containerOp(containers[Number(id) - 1].Id, import.meta.env.VITE_RASBERRY_URL_RESTART)} style={{color: 'green', cursor: 'pointer'}}/>,
                    <AiOutlineDelete onClick={() => containerOp(containers[Number(id) - 1].Id, import.meta.env.VITE_RASBERRY_URL_REMOVE)} style={{color: 'black', cursor: 'pointer'}}/>,
                ]
            },
        }

    ];

    const rows = containers.map((item, index) => ({
        id: index + 1, 
        ...item,    
      }));
      

    return (
        <>

        <div className="h-[80vh] w-[90vw] bg-gray-500 bg-opacity-30">
                <DataGrid rows={rows} columns={columns} 
                    sx={{backgroundColor: 'white'}}
                />
        </div>
        </>
    )
}