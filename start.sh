#!/bin/bash

if [ "$1" = "dev" ]; then
    docker-compose -f docker-compose.dev.yaml up
elif [ "$1" = "prod" ]; then
    docker-compose up
else
    echo "Please specify dev or prod"
fi