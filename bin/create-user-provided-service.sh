#!/bin/bash
# create-user-provided-service.sh <ssh-private-key>
#
# Creates the JSON to be fed into cf create-user-provided-service translate-secrets -p ups.json

set -o errexit
set -o pipefail

ssh_key_file=${1}
if [[ -z "$ssh_key_file" ]]; then
  echo "$0: <ssh-key-file>" >&2
  echo You must provide the ssh private key. >&2
  exit 1
fi

set -o nounset

read -e -p 'Yandex API key> ' yandex_api_key

cat <<EOF
{
  "secret_key": "$(python -c 'import random,string; print("".join(random.choice(string.ascii_letters + string.digits) for _ in range(50)))')",
  "ssh_key": $(python -c 'import json,sys; print(json.dumps(sys.stdin.read()))' < "$ssh_key_file"),
  "yandex_api_key": "$yandex_api_key"
}
EOF
