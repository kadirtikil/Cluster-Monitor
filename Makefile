all: test vet

test:
	cd ./clustermonitor && go test 

vet:
	cd ./clustermonitor && go vet 
