---
title: Pootle
---
# Pootle

## Workflow


## Import/export of content

https://www.gnu.org/software/gettext/manual/html_node/PO-Files.html

For the purposes of Phase I, we loaded in some sample content from [USA.gov's
API](https://platform-api.usa.gov/#!/text_assets/Api_V1_TextAssets_show).

    $ node index.js > templates.pot

This outputs content for a POT file to be used as the template. Rename this to
`templates.pot` and commit it to the [translations
repo](https://github.com/adborden/usa-gov-example-translations).


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


[pootle]: http://pootle.translatehouse.org/
