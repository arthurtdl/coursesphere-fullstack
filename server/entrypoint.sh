#!/bin/bash
set -e
rm -f /home/rails/app/tmp/pids/server.pid
exec "$@"