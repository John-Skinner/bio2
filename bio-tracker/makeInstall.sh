#!/bin/bash

rm -rf bioRoot
mkdir bioRoot
cp -r server bioRoot/server
cp  package.json bioRoot
cp startServer.sh bioRoot
cp create-psql bioRoot
cp create_biotrackerdb.sh bioRoot
cp create-psql.sql bioRoot
cp Dockerfile bioRoot
cp -r dist bioRoot
cp -r public bioRoot
tar -zcvf bio.tgz bioRoot

