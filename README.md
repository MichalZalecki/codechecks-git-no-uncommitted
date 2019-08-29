# codechecks-git-no-uncommitted

Detect uncommitted files. This [codecheck](https://codechecks.io/) reports any uncommitted changes. You might want to use it do detect if any file you track changes unexpectedly. For example, tt makes it possible to:

* detect a lock file changing after dependencies installation
* see if any auto-generated files by tools like graphql-codegen since you branched out your PR

## Usage

Add to your `codechecks.yml` file:

```yml
checks:
  - name: codechecks-git-no-uncommitted
```

## Contributors

* [MichalZalecki](https://github.com/MichalZalecki)
* [ziolekjj](https://github.com/ziolekjj)
