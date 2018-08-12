#!/bin/bash
set -e

node_modules/babel-cli/bin/babel-node.js init-db.js

exec "$@"