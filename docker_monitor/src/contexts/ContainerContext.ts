import { createContext } from "react";
import { ContainerInfo, defaultContainerInfo } from "../assets/kadircomponents/container_monitor/TypesContainerJSON";


export const ContainerContext = createContext<ContainerInfo>(defaultContainerInfo);
