#!/bin/sh
registration_url="https://api.github.com/orgs/${GITHUB_OWNER}/actions/runners/registration-token"
echo "Requesting registration URL at '${registration_url}'"

payload=$(curl -sX POST -H "Authorization: token ${GITHUB_PERSONAL_TOKEN}" ${registration_url})
export RUNNER_TOKEN=$(echo $payload | jq .token --raw-output)
# v3
# RUNNER_CPU="2"
# RUNNER_MEMORY="2GB"
# RUNNER_NAME="flash-${RUNNER_CPU}cpu-${RUNNER_MEMORY}"
# v4
RUNNER_CPU="2"
RUNNER_MEMORY="4GB"
RUNNER_NAME="flash-${RUNNER_CPU}cpu-${RUNNER_MEMORY}"

echo "Runner Name: ${RUNNER_NAME}"

random_string() {
    cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 10 | head -n 1
}

./config.sh \
    --name "flash-${RUNNER_NAME}-$(random_string)" \
    --token ${RUNNER_TOKEN} \
    --labels ${RUNNER_NAME} \
    --url https://github.com/${GITHUB_OWNER} \
    --work "/work" \
    --unattended \
    --replace \
    --ephemeral

remove() {
    ./config.sh remove --token "${RUNNER_TOKEN}"
}

trap 'remove; exit 130' INT
trap 'remove; exit 143' TERM

./run.sh --once "$*" &

wait $!

remove
