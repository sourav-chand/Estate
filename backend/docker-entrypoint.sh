#!/bin/sh
set -eu

php artisan package:discover --ansi
php artisan migrate --force --seed --ansi

exec php artisan serve --host=0.0.0.0 --port=8000
