#!/usr/bin/env bash

#cd tests/
container_name=workflow-visual-tests

echo "Building ${container_name}"
docker build -f Dockerfile -t ${container_name} --build-arg ENVIRONMENT="systest" --build-arg PASSWORD="Passw0rd" .

echo "Running ${container_name}"
docker run -d --name ${container_name} ${container_name}
sleep 100
docker cp ${container_name}:/usr/src/app/tests/visual_tests_pricing.spec.ts-snapshots ./tests

echo "Stopping ${container_name}"
docker stop ${container_name} || true
docker rm ${container_name} || true
docker-compose down