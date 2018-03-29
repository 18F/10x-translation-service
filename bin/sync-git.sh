#!/bin/bash
# sync-git.sh
#
# Pull changes from git and sync them to the database.

set -o errexit
set -o pipefail
set -o nounset

bin/configure-ssh.sh

# TODO iterate over all projects with pootle list_projects
project=usa-gov-example
pootle fs fetch "$project"
pootle fs add "$project"
pootle fs resolve --overwrite --pootle-wins "$project"
pootle fs sync "$project"
