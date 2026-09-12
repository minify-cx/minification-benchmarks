#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
source_dir="${MINIFYPP_SOURCE_DIR:-$root/.benchmark-dependencies/minifypp}"
output="$root/.benchmark-dependencies/minifypp-benchmark"

mkdir -p "$(dirname "$output")"
"${CXX:-g++}" -std=c++17 -O2 \
  -I "$source_dir/include" \
  -I "$source_dir/src" \
  "$root/packages/minifiers/native/minifypp-driver.cpp" \
  "$source_dir/src/Minify.cpp" \
  -o "$output"
