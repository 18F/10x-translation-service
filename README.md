# 10x Open Source Translations Service

_We are currently in the initial phase of 10x: Investigation. This phase is two
weeks long and ends approximately March 30th, 2018._

> 60.6 million Americans are not fluent in English. Despite this, most federal
> web content is only available in English. Having content available in multiple
> languages will make the information we produce more accessible to the members
> of the public whose primary language is not English. This can be done with
> existing open source tools for delivering localized content such as Pootle and
> gettext. TTS will investigate whether translation services could be shared as
> a GSA-sponsored service or as a reusable playbook.

The goal of this initial phase is to investigate if there is an opportunity
here. A soft yes or a hard no on whether to continue is what we're looking for.


## Tasks

1. Setup an instance of Pootle
1. Pilot a translation service with a single multilingual project
1. Demonstrate how content gets in and how translations get out
1. Get feedback
1. Document what worked and what did not


## Initial setup

Follow these instructions to setup an instance of Pootle on cloud.gov.

Create a database for Pootle.

    $ cf create-service aws-rds shared-psql pootle-database

Create a Redis instance for Poolte's workers. _Note: Pootle uses 3 DB indexes,
however the Redis services on cloud.gov only support DB index 0, so instead we opt for
three separate Redis instances._

    $ cf create-service redis32 micro pootle-redis-1
    $ cf create-service redis32 micro pootle-redis-2
    $ cf create-service redis32 micro pootle-redis-3

Create a user-provided store for secrets.

    $ cf cups translate-secrets -p '{"secret_key":"random-secret-string"}'

Run the migrations and setup the DB schema.

    $ cf run-task translate "pootle migrate --no-rq --noinput"
    $ cf run-task translate "pootle initdb --no-rq"

SSH into the instance to create the admin user.

    $ cf ssh translate
    $ export DEPS_DIR=/home/vcap/deps
    $ for f in /home/vcap/profile.d/*.sh; do source "$f"; done
    $ cd app
    $ pootle createsuperuser --username admin
    $ pootle verify_user admin


## Configuration

## Deploy

## Development

## Pootle evaluation

### What Pootle features are useful today?

### What features are missing that agencies need today?

### Machine translation

### Email

Pootle sends out emails for registrations and notifications. The settings use an
SMTP configuration.
