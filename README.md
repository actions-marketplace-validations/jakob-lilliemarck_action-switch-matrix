# Switch matrix
Run heterogeneous commands in a GitHub workflow job matrix.

```yml
name: Switch matrix example

on: [push]

jobs:
 main:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        key: [foo, bar, baz]
    steps:   
      - uses: jakob-lilliemarck/action-switch-matrix@v1
        with:
          key: ${{matrix.key}}
          instruction: |
            key=foo,cmd=echo ${{matrix.key}}
            key=bar,cmd=echo BAR
            key=default,cmd=echo DEFAULT
```