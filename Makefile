all-workflow: test vet

push:
	git add . && git commit -m "makefile push" && git push

test:
	cd ./clustermonitor && go test 

vet:
	cd ./clustermonitor && go vet 
