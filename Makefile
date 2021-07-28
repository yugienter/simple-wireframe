
build:
	cd server && $(MAKE) build
	cd client && $(MAKE) build

run:
	docker-compose up

stop:
	docker-compose down

install: ;@echo "React App and Server API install....."; \
	cd server && npm install
	cd client && npm install

env_template: ;@echo ".ENV Client and Server....."; \
	cd server && cp .env.example .env
	cd client && cp .env.example .env

run_server: ;@echo "Running Server....."; \
	cd server && npm run dev

run_client: ;@echo "Running Client....."; \
	cd client && npm run start

server_test: ;@echo "Testing API Server....."; \
	cd server && npm run test
