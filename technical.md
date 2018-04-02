---
title: Technical findings
---
# Technical findings

[Pootle][pootle] is a [Django](https://www.djangoproject.com/) web application
written with [Python](https://www.python.org/) 2.

We've deployed a [demo instance](https://translate.app.cloud.gov/projects/) to
[cloud.gov](https://cloud.gov/) for this Investigation.


## Initial setup on cloud.gov

Follow these instructions to setup an instance of Pootle on cloud.gov.

Create a database for Pootle.

    $ cf create-service aws-rds shared-psql pootle-database

Create a Redis instance for Poolte's workers. _Note: Pootle uses 3 DB indexes,
however the Redis services on cloud.gov only support DB index 0, so instead we opt for
three separate Redis instances._

    $ cf create-service redis32 micro pootle-redis-1
    $ cf create-service redis32 micro pootle-redis-2
    $ cf create-service redis32 micro pootle-redis-3

Create an SSH key to sync with Git.

    $ ssh-keygen -b 4096 -f git-ssh-key

Add this key as a write/deploy key in the project. In GitHub, this is under the
repo's `Settings > Deploy keys`.

(Optional) Grab a [free Yandex API key](https://tech.yandex.com/translate/) to enable machine translation.

Create the JSON secrets for the user-provided service. _Note: you'll be prompted
for the Yandex API key. If you opted not to use it, just hit enter._

    $ cf create-user-provided-service translate-secrets -p <(bin/create-user-provided-service.sh git-ssh-key)

Push the application and worker.

    $ cf push translate -f manifest.yml
    $ cf push translate-worker -f manifest.yml

Run the migrations and setup the DB schema.

    $ cf run-task translate "pootle migrate --no-rq --noinput" -m 128m
    $ cf run-task translate "pootle initdb --no-rq" -m 128m

SSH into the instance to create the admin user.

    $ cf ssh translate
    $ export DEPS_DIR=/home/vcap/deps
    $ for f in /home/vcap/profile.d/*.sh; do source "$f"; done
    $ cd app
    $ pootle createsuperuser --username admin
    $ pootle verify_user admin


### Continuous integration tasks

We use continuous integration to run some automated tasks, like keeping the git
backend in sync with Pootle.

Create a [cloud.gov service account](https://cloud.gov/docs/services/cloud-gov-service-account/).

    $ cf create-service cloud-gov-service-account space-deployer ci-deployer
    $ cf create-service-key  ci-deployer ci-deployer-key
    $ cf service-key ci-deployer ci-deployer-key

Use the `username` and `password` output to [configure the environment
variables](https://github.com/18F/cloud-foundry-cli#configuration) in the
CircleCI [project
settings](https://circleci.com/gh/18F/10x-translation-service/edit#env-vars).

Or, if you're using a different CI, use the `username` and `password` to
configure `cf` access as appropriate.


## Deploy

How to update the translation server.

Deploy the worker.

    $ cf zero-downtime-push translate-worker -f manifest.yml

Deploy the web application.

    $ cf zero-downtime-push translate -f manifest.yml


## Development

How to hack on Pootle.

### Pootle hacking

- [ ] Sign up for the [Pootle mailing](https://lists.sourceforge.net/lists/listinfo/translate-pootle) list.
- [ ] Join the Pootle [Gitter chat](https://gitter.im/translate/pootle).
- [ ] Read the Pootle [contributing docs](http://docs.translatehouse.org/projects/pootle/en/stable-2.8.x/developers/contributing.html).


### Setup

Install the dependencies.

    $ pip install -r requirements.txt

Create a local configuration file.

    $ pootle init

Run the server.

    $ pootle runserver --insecure

Open your web browser to [http://localhost:8000/](http://localhost:8000/).


## Import/export of content

https://www.gnu.org/software/gettext/manual/html_node/PO-Files.html

For the purposes of Phase I, we loaded in some sample content from [USA.gov's
API](https://platform-api.usa.gov/#!/text_assets/Api_V1_TextAssets_show).

    $ node index.js > templates.pot

This outputs content for a POT file to be used as the template. Rename this to
`templates.pot` and commit it to the [translations
repo](https://github.com/adborden/usa-gov-example-translations).


## What you should backup

This is just an evaluation project for the initial Phase, so the demo instance
will not be around forever, however we'll [grab
a snapshot](http://docs.translatehouse.org/projects/pootle/en/stable-2.8.x/server/backup.html)
of the data in case we want to revive it in a future phase.


[pootle]: http://pootle.translatehouse.org/
