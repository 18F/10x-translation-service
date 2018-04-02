# Workflow

This documents the existing workflow one would use with Pootle. There are areas
where we can improve and hope to add functionality.

_TODO: split out these workflows based on target audience. This contains some
very technical information not meant for Translators or Content Managers. This
is still very rough._


## For content managers

Create a POT file with the content to be translated. Individual entries should
be no bigger than a paragraph to optimize for Translation Memory.

The easiest way to create a POT file is using gettext or similar utility.

_Note: we are working to identify the most common use cases for federal
government and hope to provide streamlined processes for preparing your content._

[gettext](https://www.gnu.org/software/gettext/) is a set of utilities for
managing content for translation. It allows developers to extract content from
their software for translation and helps show messages to the user in the right
language.

gettext also defines the PO format for exchanging and translating content,
considering language-specific details, like different plurals.

gettext supports many programming languages but you might need another
third-party utility to handle your situation.

    $ xgettext --add-comments


Source format | Utility | Testing notes
--- | --- | ---
Markdown | [gettext-markdown](https://bitbucket.org/tagoh/gettext-markdown) | Not tested.


## Upload content for translation


### Initial project setup

On the [projects admin](https://translate.app.cloud.gov/admin/projects/) click
"Add project".

For "Project Tree Style", select "Allow Pootle FS to manage filesystems
(Experimental)".

Once saved, click "Filesystems" to configure the Pootle FS settings.

Change "Filesystem backend" to "git".

Set the "Backend URL or path" to the github repo url, e.g.
`git@github.com:adborden/usa-gov-example-translations.git`.

Set the translation path to match your git repo, either
`/po/<language_code>.<ext>` or `/translations/<language_code>.<ext>` is best.

Click "Update filesystem configuration".

Next an Operator needs to sync Pootle with the git repo.

    $ cf run-task --name pootle-sync translate 'bin/sync-git.sh' -m 128m


### Adding new languages

To create a new language, you need to add the language's PO file to the git
backend and then sync it with Pootle.

For example, create a PO file for Spanish.

    $ pot2po po/templates.pot po/es.po


### Updating the content

When new content is added to the project, you need to tell Pootle about this.
Once the `templates.pot` file is updated, run `pot2po` to update each language
PO file.

For example, update the Spanish PO file.

    $ pot2po -t po/es.po po/templates.pot po/es.po


## Export

Pootle syncs all the translations to the git backend. If the git repo is the
same repo as your project, then simply doing a git pull will bring in the latest
translation files for your project.

For projects supporting `gettext`, the
[`msgfmt`](https://www.gnu.org/software/gettext/manual/html_node/msgfmt-Invocation.html)
will create data files ready to be consumed in your gettext program or web application.

    $ msgfmt po/es.po -o po/es.mo
