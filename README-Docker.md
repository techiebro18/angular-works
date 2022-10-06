# BUILD

docker build -t angular-website -f Dockerfile .

## DEPLOY

docker compose up -d

## RUN

Open browser and type http://127.0.0.1:8082

## PORTS used

MYSQL 3306
PHPMYADMIN 9080
APIV2WEBSERVER 9081
admincms_angular 9082
admincms_webserver 9083
angular-website 9084
