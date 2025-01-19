# Docker container fetcher
This service fetches currently running container on the system.


# Change of plans
I'm building docker desktop for my rasberry pi. The rasberry will then monitor it. I will then use k8s to orchestrate the containers on two worker nodes (no mini hp pcs).



## Prerequisites
Make sure the ```$DOCKER_HOST``` env variable is set in bashrc, to be sure, that both client point to the same socket.
(Or the same pipe on windows)


## The Containers
The containers can be in one of the following states:
- created
- restarting
- running
- removing
- paused
- exited
- dead

The monitor will show the status itself, and for ease of use, provide an outline corresponding to the status.


# HOW DOES IT WORK
The client and server are connected through by websockets. There will be no heartbeats, since they are not necessary to keep the client and server in sync.
After the connection is established, the client can fetch, pause, restart, kill or remove containers. The state of the container will then be returned to the client
by the server. The server will send a sort of heartbeat (more of a publisher subscriber architecture) the information about the changed container to all clients.
This way, the clients stay in sync with the server and unnecessary overheads are avoided.<br>

![websocketsequence](/assets/websocketCM.drawio.png)

# TODO
- Add refresh heartbeat after executing a DockerOp DONE
- Should i add pagination??? IDK if that would be worth it since i wont run that many applications...
    - SOLVED: Just return the containers. The client checks if its one or an array and changes accordingly.
- DONE Deletion, add deletion, such that its refetches the containers after deleting one certain container. (This can be further optimized by just checking for the deleted container.)
- NEXT Add logging
- NEXT Add AUTH



