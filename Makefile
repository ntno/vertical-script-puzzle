SHELL:=/bin/bash
env=dev
region=us-east-1
app-name=vertical-script-puzzle

##########################################################################################
stop: check-app-name
	docker-compose down --remove-orphans

build: check-app-name
	docker build -f ./Dockerfile . -t $(app-name):latest

docker:
	docker-compose run --rm unix 

local: 
	p5 serve ./sketch/ --port=8080

serve: build
	docker-compose up --remove-orphans $(app-name)

clean:
	rm -rf temp


create-gif-from-demo-files:
	docker-compose run --rm graphics-magic convert -verbose -delay 15 /usr/src/demo/*.png /usr/src/demo.gif

##########################################################################################
check-asset-folder: 
ifndef asset-folder
	$(error asset-folder is not defined)
endif

check-exclude: 
ifndef exclude
	$(error exclude is not defined)
endif

check-search-string:
ifndef search-string
	$(error search-string is not defined)
endif

check-output-file:
ifndef output-file
	$(error output-file is not defined)
endif

check-env:
ifndef env
	$(error env is not defined)
endif

check-region:
ifndef region
	$(error region is not defined)
endif

check-version:
ifndef version
	$(error version is not defined)
endif

check-app-name:
ifndef app-name
	$(error app-name is not defined)
endif
