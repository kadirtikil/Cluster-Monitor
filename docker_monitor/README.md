# Monitoring Docker Containers On A Rasberry Pi
### TL;DR;
Docker monitor for my rasberry pi I run my small applications on. 
This will then show latern on, which docker containers are running on which worker node with kubernetes.

Use as you please. (I use components tho from my own components library on my other repo so pull them into your src folder they are not here cause of .gitignore)

# TODO's
- optimize loading 
    - used useContext for data passing to stop fetching for changes DONE
    - TODO use backend pagination for updating the client
    - TODO use even driven watchdogs to check for changes and transmit with websockets only send the changed data.
    - TODO make the client be able to find and handle the only changed data

- clean code
    - create services dont repeat stuff DONE
    - create types and their defaults DONE
    - create contexts and just import them DONE 

- best practices
    - make sure it works

- k8s
    - TODO get money and buy another small pc to add more worker nodes (this is more difficult than it seems...)

- design
    - TODO design the layout of the modals
    - TODO make the client be able to decide between a grid and a normal table (just use a material ui table)
    - add tooltips for state

