#!/bin/bash
set -e

SUITE_TIMESTAMP=$(date +"%Y-%m-%dT%H:%M:%SZ")

YEAR_MONTH=$(date -u +"%Y.%m")
ELASTIC_INDEX="logstash-wrkflw-v2-$YEAR_MONTH"

echo "Pushing results to Elastic $ELASTIC_INDEX"

# Append metadata to JSON document
cat ./results.json | jq '. + {"@timestamp":"'$SUITE_TIMESTAMP'","@suite" : "smoke","@link":"'$CI_JOB_URL'","@environment":"'$ENV'"}' > ./output.json

echo "Appended metadata to JSON document for  $SUITE_TIMESTAMP and $ENV and $CI_JOB_URL"

# Push to Elastic
curl --insecure --capath /usr/local/share/ca-certificates -X POST "https://logs.cha.rbxd.ds/$ELASTIC_INDEX/_doc/?pretty" -H 'Content-Type:application/json' -d @./output.json

echo "Pushed results to Elastic $ELASTIC_INDEX"