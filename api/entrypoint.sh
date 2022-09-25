#!/bin/bash

echo "Starting the application..."

#check if the database is running
# if [ -z "$(docker ps -q -f name=vik-schedule-dev)" ]; then
#     echo "Database is not running"
#     exit 1
# fi

#check if migrations dir exists
if [ ! -d "migrations" ]; then
    echo "Migrations directory does not exist"
    flask db init
fi

#check if migrations are up to date
if [ -z "$(flask db current)" ]; then
    echo "Migrations are not up to date"
    flask db migrate
    flask db upgrade
fi

# check if env variable TEST is set to true
if [ "$TEST" = 1 ]; then
    echo "Running tests..."
    python3 -m pytest
    exit 0
fi


flask run --host 0.0.0.0 --port 5000
