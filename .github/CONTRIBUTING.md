# Contributing

## Commands
### Get the benchmarks for a file given a minfier

Minify++ is built automatically by the benchmark workflow. Before benchmarking
it locally, check out the pinned source and build its adapter:

```sh
git clone --depth 1 --branch v1.1.2 https://github.com/minify-cx/minify.git .benchmark-dependencies/minifypp
packages/minifiers/native/build-minifypp.sh
```

```sh
$ pnpm bench --minifier <minifier> --artifact <artifact>
```

Example:
```
$ pnpm bench --minifier esbuild --artifact vue
```

### Benchmark all artifacts & minifiers

```sh
$ pnpm bench-all
```

#### Limit by minifier
```sh
$ pnpm bench-all --minifier esbuild
```

#### Limit by artifact
```sh
$ pnpm bench-all --artifact vue
```

### Benchmark all artifacts & minifiers and update README.md
```sh
$ pnpm update-readme
```

## Artifacts

All artifacts used for benchmarking are in [`/packages/artifacts/artifacts/`](/packages/artifacts/artifacts/).
