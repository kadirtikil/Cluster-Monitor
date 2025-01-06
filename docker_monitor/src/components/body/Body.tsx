
import { useEffect, useState } from "react"
import ContainerMonitor from "../../assets/kadircomponents/container_monitor/ContainerMonitor"
import { ContainerInfo } from "../../assets/kadircomponents/container_monitor/TypesContainerJSON";


import { FetchContainers } from "../../services/FetchContainer";
import { setColorOfState } from "../../services/ContainerStatusColor";
import { ContainerContext } from "../../contexts/ContainerContext";

import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

// Create a context, such that the data that has been fetched here, is available down the tree
// so i dont have to pass, all the props to all the components.

export default function Body() {


    const [containers, setContainers] = useState<ContainerInfo[]>([]);
    const [stateColor, setStateColor] = useState('white')

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

    const test = () => {
        console.log(rows)
    }
   
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

                {/**
                    containers.map((item, index) => (
                        <div key={index} className="flex justify-center items-center">
                            <ContainerContext.Provider value={item}>
                                <ContainerMonitor 
                                    modal_data={item}
                                    height={12} 
                                    width={12} 
                                    color="white" 
                                    bgcolor="black" 
                                    current_status={setColorOfState(item.State)}
                                />
                            </ContainerContext.Provider>
                        </div>
                    ))
                     */}
        </div>
        </>
    )
}