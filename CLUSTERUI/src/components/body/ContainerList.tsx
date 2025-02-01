import { useState } from "react"
import { DataGrid, GridColDef } from "@mui/x-data-grid";
// websocket stuff
import useWebSocket from "react-use-websocket";

// own stuff
import { ContainerJSONBase } from "../../assets/types/TypesContainerJSON";
import ContainerDeleteDialog from "../dialogues/ContainerDeleteDialog";


// Icons for operations
import { MdBlock } from "react-icons/md";
import { IoPlayOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";



export default function ContainerList() {

    const [containers, setContainers] = useState<ContainerJSONBase[]>([]);
    
    const [open, setOpen] = useState(false)
    const [id, setId] = useState("")

    const handleCloseDialog = () => {
        setOpen(false)
    }

    const {sendJsonMessage} = useWebSocket(import.meta.env.VITE_WEBSOCKET_URL, {
        onClose: () => {
            console.log("Connection closed")
        },
        onOpen: () => {
            console.log('Connection openend')
            const fetchpayload = {
                "action": "fetch",
                "id": "none"
            }
            sendJsonMessage(fetchpayload)
        },
        onMessage: (event) => {
            
            // message is a string
            const msgJson: ContainerJSONBase[] = JSON.parse(event.data)
            // update the instance instead of sending the whole containers a new. 
            // bring code to data is the name of the game
            console.log(msgJson[1])

            if(msgJson.length > 1){
                setContainers(msgJson)
            }
            else {
                updateInstance(msgJson[0])
            }
        },

    })

    /** 
     * prepare data for take off
     */
    const sendJsonMsg = (action: string, id: string) => {
        const payload = {
            "action": action,
            "id": id
        }

        sendJsonMessage(payload)
    }
    
    /**
     * function to update certain row in array
     */
    const updateInstance = (update: ContainerJSONBase) => {
        setContainers((prevContainers) => 
            prevContainers.map((container) => 
                container.Id === update.Id ? update : container
            )
        )
    }

    /**
     * function that handles deletion of the container
     * this step is a little tricky
     */

    const setupDeletionOfContainer = (id: string) => {
        setId(id)
        setOpen(true)
    }

    const deleteContainer = (id: string) => {
        sendJsonMsg("remove", id)
        setOpen(false)
    }    
    
   const columns:GridColDef[] = [
        {
            field: 'Name',
            headerName: 'Name',
            minWidth: 300,
            editable: false,
        },
        {
            field: 'Id',
            headerName: 'Imageid',
            minWidth: 300,
            editable: false,
        },
        {
            field: 'State',
            headerName: 'Status',
            minWidth: 300,
            editable: false,
            valueGetter: (params: any) => params.Status
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            minWidth: 300,
            cellClassName: 'actions',
            getActions: ({id}) => {
                


                // the -1 is necessary because the array starts at 0 but the id starts from 1 therefore havin a diff of 1 that has to be accounted for
                const index = Number(id)
                const ID = containers[index].Id
                const status = containers[index].State.Status
                
                if(status === "running"){
                    return [
                        <MdBlock onClick={() => sendJsonMsg("pause",ID)} style={{color: 'red', cursor: 'pointer'}}/>,
                        <AiOutlineDelete onClick={() => setupDeletionOfContainer(ID)} style={{color: 'black', cursor: 'pointer'}}/>,
                        <IoMdClose onClick={() => sendJsonMsg("kill",ID)} style={{color: 'red', cursor: 'pointer'}}/>,
                    ]
                } else if(status === "paused") {
                    return [
                        <IoPlayOutline onClick={() => sendJsonMsg("restart",ID)} style={{color: 'green', cursor: 'pointer'}}/>,
                        <AiOutlineDelete onClick={() => setupDeletionOfContainer(ID)} style={{color: 'black', cursor: 'pointer'}}/>,
                        <IoMdClose onClick={() => sendJsonMsg("kill",ID)} style={{color: 'red', cursor: 'pointer'}}/>,
                    ]
                } else if(status === "exited") {
                    return [
                        <IoPlayOutline onClick={() => sendJsonMsg("restart",ID)} style={{color: 'green', cursor: 'pointer'}}/>,
                        <AiOutlineDelete onClick={() => setupDeletionOfContainer(ID)} style={{color: 'black', cursor: 'pointer'}}/>,
                    ]
                } else {
                    return []
                }
            },
        }
      

    ];

    const rows = containers.map((item, index) => ({
        id: index, 
        ...item,    
      }));
      

    return (
        <>
        <div className="h-[80vh] w-[90vw] bg-gray-500 bg-opacity-30">
                <DataGrid rows={rows} columns={columns} 
                    sx={{backgroundColor: 'white'}}
                    processRowUpdate={(updatedContainer) => {
                        updateInstance(updatedContainer)
                        return updatedContainer
                    }}
                />
        </div>
        <ContainerDeleteDialog openProp={open} handleClose={handleCloseDialog} deleteContainer={() => deleteContainer(id)}/>
        </>
    )
}