#!/bin/bash

if [ "$1" = "dev" ]; then
    docker-compose -f docker-compose.dev.yaml up
elif [ "$1" = "prod" ]; then
    docker-compose up
elif [ "$1" = "test" ]; then
    docker-compose -f docker-compose.test.yaml up --exit-code-from api
else
    echo "Please specify dev or prod"
fi