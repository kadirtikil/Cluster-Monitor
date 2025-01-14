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



## Fetcher package
Basically just fetches all the containers that are running on the current machine, then returns it to the HTTP handler, and then sends it to the monitor/client.



# TODO
- Add refresh heartbeat after executing a DockerOp
- Should i add pagination??? IDK if that would be worth it since i wont run that many applications...
