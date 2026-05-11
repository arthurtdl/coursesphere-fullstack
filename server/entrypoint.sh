#!/bin/bash
set -e
rm -f /home/rails/app/tmp/pids/server.pid
echo "Rodando migrações..."
bundle exec rails db:migrate
exec "$@"