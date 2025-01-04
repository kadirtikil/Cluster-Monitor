export const setColorOfState = (state: string) => {
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