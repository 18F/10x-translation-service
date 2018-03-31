[![CircleCI](https://circleci.com/gh/18F/10x-translation-service.svg?style=svg)](https://circleci.com/gh/18F/10x-translation-service)

# 10x Open Source Translation Service

_We are currently in the initial phase of [10x](https://10x.gsa.gov/):
Investigation. This phase is two weeks long and ends approximately April 4th,
2018._

> 60.6 million Americans are not fluent in English. Despite this, most federal
> web content is only available in English. Having content available in multiple
> languages will make the information we produce more accessible to the members
> of the public whose primary language is not English. This can be done with
> existing open source tools for delivering localized content such as [Pootle][pootle] and
> [gettext][gettext]. [TTS][tts] will investigate whether translation services could be shared as
> a GSA-sponsored service or as a reusable playbook.

The goal of this initial phase is to investigate if there is an opportunity
here. A soft yes or a hard no on whether to continue is what we're looking for.


## Who are we?

Team members:

- Aaron D Borden, software developer, [18F](https://18f.gsa.gov/)

Advisers:

- Laura Godfrey, Multilingual Strategies Lead, [Office of Products and Platforms](https://www.gsa.gov/about-us/organization/federal-acquisition-service/technology-transformation-services/office-of-products-and-programs)


## Tasks

1. Setup an instance of [Pootle][pootle].
1. Pilot a [translation service][translate-app] with a single multilingual project.
1. Demonstrate how content gets in and how translations get out.
1. Get feedback.
1. Document what worked and what did not and any opportunities.


## Progress

We are tracking the work for this Phase on our [Kanban
board](https://github.com/18F/10x-translation-service/projects/1).

Any issues or ideas that we want to keep track of for later are being noted in
the [GitHub issues](https://github.com/18F/10x-translation-service/issues). At
the end of this Phase, we'll identify work that we think will be good candidates
for [Phase II: Discovery](https://github.com/18F/10x-translation-service/milestone/1).

We post weekly progress updates in [updates](updates).


## Investigation

- [What is Pootle?](pootle.md)
- [Use cases](use-cases)
- [Workflow](workflow.md)
- [Technical findings](technical.md)
- [Additional resources](resources.md)


## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for additional information.


## Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.


[gettext]: https://www.gnu.org/software/gettext/
[pootle]: http://pootle.translatehouse.org/
[translate-app]: https://translate.app.cloud.gov/projects/usa-gov-example/
[tts]: https://www.gsa.gov/about-us/organization/federal-acquisition-service/technology-transformation-services
