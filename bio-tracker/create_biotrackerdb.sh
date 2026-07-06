#!/bin/bash
#
# Setup script for Saince PACS DB.
#
# USAGE: install_saincepacsdb.sh [<deployment_directory>]
#
docker rmi -f postgres
docker rmi -f bio-postgres
docker system prune

DEPLOY_DIR=${1:-"/var/local/biotracker/deploy"}


echo
echo "------------------------------------------------"
echo "Initializing Biotracker database..."
echo "------------------------------------------------"

if [[ "`whoami`" != 'root' ]]
then
    echo "ERROR: Must be root user to handle setup!"
    echo
    exit
fi
DB_DIR=/var/local/bio
rm -rf ${DB_DIR}
mkdir ${DB_DIR}
docker buildx build -t bio-postgres .

docker run --name biotracker-db \
-e POSTGRES_PASSWORD=bio@20262026 \
-e POSTGRES_USER=biotrackeradmin \
-e POSTGRES_DB=biotracker \
-p 5432:5432 \
-v /var/local/bio:/var/lib/postgresql \
--name bio-postgres \
-d bio-postgres


echo "Access with psql: docker exec -it bio-postgres psql -U biotrackerdbuser -d biotracker"

