
import { useEffect, useState } from "react"
import ContainerMonitor from "../../assets/kadircomponents/container_monitor/ContainerMonitor"
import { ContainerInfo } from "../../assets/kadircomponents/container_monitor/TypesContainerJSON";


export default function Body() {


    const [containers, setContainers] = useState<ContainerInfo[]>([]);
    const [test, setTest] = useState("first version")

    // console.log(import.meta.env.VITE_RASBERRY_URL)
    // fetch the containers from rasberry
    useEffect(() => {
        const fetchContainers = async () => {
            try {
                const resp = await fetch("/fetchcontainers", {
                    method: "GET",
                })

                const respData = await resp.json();
                


                const displayData=respData.map(mapApiToModalData) 
                setContainers(displayData)
                setTest("Secdon version")

                console.log(containers)

                

            } catch (err) {
                console.error("Error trying to fetch data: ", err);
            }
        };
    
        fetchContainers();
    }, []);

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // Helpers

    const mapApiToModalData = (modalData: any): ContainerInfo => {
        return{
            Command: modalData.Command, 
            Created: modalData.Created, 
            HostConfig: {
                NetworkMode: modalData.NetworkMode, 
            },
            Id: modalData.Id, 
            Image: modalData.Image, 
            ImageID: modalData.ImageID, 
            Labels: modalData.Labels, 
            Mounts: modalData.Mounts, 
            Names: modalData.Names, 
            NetworkSettings: modalData.NetworkSettings, 
            Ports: modalData.Ports, 
            State: modalData.State, 
            Status: modalData.Status, 
        }
    }   

    const setColorOfState = (state: string) => {
        switch(state){
            case "created":
                return 'red'
            case "restarting":
                return 'red'
            case "running":
                return 'green'
            case "removing":
                return 'red'
            case "paused":
                return 'red'
            case "exited":
                return 'purple'
            case "dead":
                return 'orange'
            default:
                return "white"
            }   
    }
   
    


    return (
        <div className="h-[80vh] w-[90vw] bg-gray-500 bg-opacity-30 grid grid-cols-5 grid-rows-4 rounded-lg">
                {
                    containers.map((item, index) => (
                        <div key={index} className="flex justify-center items-center">
                        <ContainerMonitor 
                            modal_data={item}
                            title={item.Image} 
                            state={item.State} 
                            status={item.Status} 
                            height={10} 
                            width={10} 
                            color="white" 
                            bgcolor="black" 
                            current_status={setColorOfState(item.State)}
                            
                        />
                        </div>
                    ))
                    }
        </div>
    )
}