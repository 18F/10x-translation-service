#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

# Avoid using $HOME here because it is sometimes set to /home/vcap/app which
# won't work for git/ssh.
ssh_key_file="/home/vcap/.ssh/id_rsa"
gitconfig_file="/home/vcap/.gitconfig"
known_hosts_file="/home/vcap/.ssh/known_hosts"

# Avoid overwriting an existing key, espeically if this is accidently run in a
# development environment.
#TODO configure ssh-agent and ssh-add so we don't need to put a key on the filesystem
if [[ -r "$ssh_key_file" ]]; then
  echo "$ssh_key_file" already exists. >&2
  exit 1
fi

if [[ -r "$gitconfig_file" ]]; then
  echo "$gitconfig_file" already exists. >&2
  exit 1
fi

# Copy gitconfig
cp gitconfig "$gitconfig_file"

jq --version 2>&1
mkdir -m 0700 -p "$(dirname $ssh_key_file)"
(
  umask 077
  echo "$VCAP_SERVICES" | jq --raw-output '.["user-provided"][0].credentials.ssh_key' > "$ssh_key_file"
  echo "write $ssh_key_file ok"
)


# Add github.com to known hosts
cat <<EOF >> "$known_hosts_file"
# github.com:22 SSH-2.0-libssh_0.7.0
github.com ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAq2A7hRGmdnm9tUDbO9IDSwBK6TbQa+PXYPCPy6rbTrTtw7PHkccKrpp0yVhp5HdEIcKr6pLlVDBfOLX9QUsyCOV0wzfjIJNlGEYsdlLJizHhbn2mUjvSAHQqZETYP81eFzLQNnPHt4EVVUh7VfDESU84KezmD5QlWpXLmvU31/yMf+Se8xhHTvKSCZIFImWwoG6mbUoWf9nzpIoaSjB+weqqUUmpaaasXVal72J+UX2B+2RPW3RcT0eOzQgqlJL3RKrTJvdsjE3JEAvGq3lGHSZXy28G3skua2SmVi/w4yCE6gbODqnTWlg7+wC604ydGXA8VJiS5ap43JXiUFFAaQ==
EOF

echo "write $known_hosts_file ok"
