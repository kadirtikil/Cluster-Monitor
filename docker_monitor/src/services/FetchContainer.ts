import { ContainerInfo, defaultContainerInfo } from "../assets/kadircomponents/container_monitor/TypesContainerJSON"

export const FetchContainers = async() => {
    try{
        const resp = await fetch(import.meta.env.VITE_RASBERRY_URL_FETCH, {
            method: "GET",
        })

        const dataJson = await resp.json()
        const data = dataJson.map(mapApiToModalData)

        return data

    } catch(err) {
        console.error("Error at FetchContainers Service: ", err)
    }

    return [defaultContainerInfo]
}


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