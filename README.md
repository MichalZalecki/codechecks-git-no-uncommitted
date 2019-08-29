# codechecks-git-no-uncommitted

[![CircleCI](https://circleci.com/gh/MichalZalecki/codechecks-git-no-uncommitted.svg?style=svg)](https://circleci.com/gh/MichalZalecki/codechecks-git-no-uncommitted)

Detect uncommitted files. This [codecheck](https://codechecks.io/) reports any uncommitted changes. You might want to use it do detect if any file you track changes unexpectedly. For example, tt makes it possible to:

* detect a lock file changing after dependencies installation
* see if any auto-generated files by tools like graphql-codegen since you branched out your PR

## Usage

Add to your `codechecks.yml` file:

```yml
checks:
  - name: codechecks-git-no-uncommitted
```

## Example

```
$ npx codechecks

Executing codechecks.yml...

# ❌ Git No Uncommitted

Result: 2 file changed


## Long description:

┌────────┬─────────────────────────────────────────┐
│ Change │ Path                                    │
├────────┼─────────────────────────────────────────┤
│ M      │ package-lock.json                       │
├────────┼─────────────────────────────────────────┤
│ M      │ src/networking/generated/schema.ts      │
└────────┴─────────────────────────────────────────┘
```

## Contributors

* [MichalZalecki](https://github.com/MichalZalecki)
* [ziolekjj](https://github.com/ziolekjj)
