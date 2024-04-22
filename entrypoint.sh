#!/bin/sh
registration_url="https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPOSITORY}/actions/runners/registration-token"
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
RUNNER_NAME_ARGUMENT_PASSED=$1
RUNNER_NAME="flash-${RUNNER_CPU}cpu-${RUNNER_MEMORY}"

if [ -n "$RUNNER_NAME_ARGUMENT_PASSED" ]; then
    RUNNER_NAME=$RUNNER_NAME_ARGUMENT_PASSED
fi

echo "Runner Name: ${RUNNER_NAME}"

random_string() {
    cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 5 | head -n 1
}

./config.sh \
    --name "${RUNNER_NAME}-$(random_string)" \
    --token ${RUNNER_TOKEN} \
    --labels ${RUNNER_NAME} \
    --url https://github.com/${GITHUB_OWNER}/${GITHUB_REPOSITORY} \
    --work "/work" \
    --unattended \
    --replace

remove() {
    ./config.sh remove --unattended --token "${RUNNER_TOKEN}"
}

trap 'remove; exit 130' INT
trap 'remove; exit 143' TERM

./run.sh --once "$*" &

wait $!

remove
