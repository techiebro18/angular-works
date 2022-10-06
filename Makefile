docker-start:
	docker-compose -f docker-compose.yml up --build -d --remove-orphans --force-recreate
docker-stop:
	docker-compose -f docker-compose.yml stop