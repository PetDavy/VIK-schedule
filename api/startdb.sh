#!/bin/bash

#check if the database is running
if [ -z "$(docker ps -q -f name=vik-schedule)" ]; then
    echo "Database is not running"
    exit 1
fi

#check if less then 2 arguments are passed
if [ $# -lt 2 ]; then
    echo "Usage: $0 <db-name> db init -> init database"
    echo "Usage: $0 <db-name> db migrate -> migrate database"
    echo "Usage: $0 <db-name> db upgrade -> upgrade database"
    exit 1
fi

docker container run \
--rm \
-e FLASK_APP=/usr/src/app/startapp.py -e FLASK_DEBUG=1 \
--mount type=bind,source=$(pwd),target=/usr/src/app \
-p 6000:5000 \
vik-schedule \
$@