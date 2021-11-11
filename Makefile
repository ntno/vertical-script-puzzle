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

serve: build
	docker-compose up --remove-orphans $(app-name)

clean:
	rm -rf temp

generate-index: check-search-string check-asset-folder check-output-file
	@mkdir -p sketch/meta && \
	rm -rf sketch/meta/$(output-file)
	@cd $(asset-folder) && \
	ls -p -1 | grep -v -e ".*/$$" | grep -ie $(search-string) | jq -Rn '[inputs]' > ../../meta/$(output-file) 

generate-all-indexes: 
	make generate-index search-string="apd.*\.png" asset-folder="./sketch/assets/apothecary-notes-detail/"  output-file="assets-apd.json"
	make generate-index search-string="mld.*\.png" asset-folder="./sketch/assets/manor-letter-detail/" output-file="assets-mld.json"

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
