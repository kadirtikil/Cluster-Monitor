# Monitoring Docker Containers On A Rasberry Pi

TODO:
- expand the container component to taking data from  usestate, such that the containers can be created correcty DONE
- map the states of a container to a color in useeffect DONE
- optimize loading times with usememory  (shouldnt fetch on every new loading event) 
    - ok instead i should do pagination, the computation itself is not that expensive.
    - i might send it via websocket to the client on change on the backend.
- add modals for more data in context of container NEXT
    - create the types DONE
    - add props to the modal to display the data DONE (some prop drilling but hey its just three layers so we cool. couldve used useContext...)
    - .... so these are the options
        - websockets and then event driven communicatin instigated by the backend on change of data 
        - with the id and the changed datapoint, then change the data in the client. is less expensive computation wise.
    - design the layout of the modal
- add tooltips for state


### TL;DR;
Docker monitor for my rasberry pi I run my small applications on. 
Use as you please. (I use components tho from my own components library on my other repo)