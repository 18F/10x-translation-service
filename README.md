# 10x Open Source Translation Service

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

Push the applications.

    $ cf push translate -f manifest.yml
    $ cf push translate-worker -f manifest.yml

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

### Permissions

By default, Pootle allows anonymous users to suggest translations. Projects may
wish to disable this in the [permissions
settings](https://translate.app.cloud.gov/admin/permissions/). We have disabled
anonymous suggestions for Phase I.


## Deploy

Deploy the worker.

    $ cf zero-downtime-push translate-worker -f manifest.yml

Deploy the web application.

    $ cf zero-downtime-push translate -f manifest.yml


## Development

### Pootle hacking

- [ ] Sign up for the [Pootle mailing](https://lists.sourceforge.net/lists/listinfo/translate-pootle) list.
- [ ] Join the Pootle [Gitter chat](https://gitter.im/translate/pootle).
- [ ] Read the Pootle [contributing docs](http://docs.translatehouse.org/projects/pootle/en/stable-2.8.x/developers/contributing.html).


### Setup

Create a local configuration file.

Create an SSH key.

    $ ssh-keygen -b 4096 -f git-ssh-key

Add this key as a deploy key in the project under the repo's `Settings > Deploy
keys`.

Create the JSON secrets for the user provided service.

    $ cf update-user-provided-service translate-secrets -p <(bin/create-user-provided-service.sh git-ssh-key)


## Pootle evaluation

### What Pootle features are useful today?

### What features are missing that agencies need today?

### Translation Memory

This is supported out of the box using an external [Translation Memory
service](http://amagama.translatehouse.org/). You can setup an instance of
Elasticsearch for a private TM server instance.

Pootle supports multiple TM servers, so it will keep a local instance up to
date, but can still use an external one for read-only lookups from external
projects.

For projects that wish to have their own Pootle instance, they can share TM by
sharing the external TM server.


### Machine translation

### Email

Pootle sends out emails for registrations and notifications. The settings use an
SMTP configuration.


## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for additional information.


## Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.
