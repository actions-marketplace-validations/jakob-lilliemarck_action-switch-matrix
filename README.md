# action-build-matrix
Reduce boilerplate and custom scripting while working with GitHub workflow matrices.

```yml
name: Example action-build-matrix

on: [push]

jobs:
 main:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        key: [foo, bar, baz]
    steps:   
      - uses: jakob-lilliemarck/action-build-matrix@v1
        with:
          key: ${{matrix.key}}
          instruction: |
            key=foo,cmd=echo FOO
            key=bar,cmd=echo BAR
            key=default,cmd=echo DEFAULT
```