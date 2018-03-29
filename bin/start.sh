#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

bin/configure-ssh.sh

#TODO put this behind a wsgi and serve static assets
exec pootle runserver --insecure "0.0.0.0:$PORT"
