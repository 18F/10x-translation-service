---
title: Pootle
---
# Pootle

[Pootle][pootle] is an open source localization and translation server. It
facilitates translation workflows using standard localization formats like PO
and XLIFF, enforces quality checks on translations, shares translations across
projects using Translation Memory, and can even use Machine Translation to seed
new languages.


## Workflow

This is Pootle's default workflow. We will look into how this can be customized
and how it deviates from existing government translation workflows in a future
Phase of work.

Conceptual roles:

Role | Description
---  | ---
Content Manager | Manages the project or website. Exports content to be translated and submits it to the Translation Service. Imports updated translations back into the project or website.
Translator | Looks over strings/content to be translated and suggests translations.
Reviewer | Reviews and accepts translations to be used in the project.


This is the translation cycle. It's usually not a one-time thing since content
is constantly changing and evolving.

1. Content manager identifies new content to be translated.
1. Content manager exports the content to be translated and submits it to the
   Translation Service.
1. Translators review the content and suggest translations.
1. Reviewers review the translations and accept or reject the translations,
   providing comments when necessary.
1. When translations are ready, content manager imports the translations into
   their project.

Translations are suggested before they are accepted into the project or website.


### Suggestions

Team members review strings to be translated and suggest translations. The
translations are approved.


### Problematic content

Sometimes content can't be translated because it is missing context or it
contains technical markup that is invalid. Translators can flag this for the
Content Managers who can fix the content or add comments and hints for all
translators to see.


### Team roles

From [permission
docs](http://docs.translatehouse.org/projects/pootle/en/stable-2.8.x/features/permissions.html#action-permissions),
there are different permissions that can be set within a language team.

Role | Description
---  | ---
Member | May submit suggestions.
Submitter | Can translate and make suggestions.
Reviewer | In addition to translate and submit suggestions, can also review suggestions.
Administrator | Can administer the team, adding team members and adjusting roles. May edit the announcement of the team. Plus all rights of the Reviewer.


## Import/export of content

Pootle's primary use case is to integrate with a project through a version
control system (VCS) like [git](https://git-scm.com/). Most open source projects
using Pootle are source code based and keep their translations in PO format
side-by-side with their source code within a VCS. This allows developers and
content managers to easily integrate the Pootle translation workflow into their
existing software development life-cycle.

This is different than how content management systems (CMS) work. Many
government projects are built around a CMS, like Drupal, rather than source code
and store translations and content in a database. This doesn't mean Pootle can't
be used with CMS projects but it does mean there is an extra step to getting
translations from Pootle into a CMS. Some CMS, like Drupal, support importing
translations from the PO format.

This workflow is successful in our Investigation, but more effort would be
needed to automate and improve it for government translation projects.


## Feature evaluation

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


## Configuration

### Permissions

By default, Pootle allows anonymous users to suggest translations. Projects may
wish to disable this in the [permissions
settings](https://translate.app.cloud.gov/admin/permissions/). We have disabled
anonymous suggestions for Phase I.


[pootle]: http://pootle.translatehouse.org/
