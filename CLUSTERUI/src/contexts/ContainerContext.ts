import { createContext } from "react";
import { ContainerJSONBase, dummyContainerJSONBase } from "../assets/types/TypesContainerJSON";

export const ContainerContext = createContext<ContainerJSONBase>(dummyContainerJSONBase);
