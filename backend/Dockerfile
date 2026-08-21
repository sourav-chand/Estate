FROM composer:2 AS vendor

WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --no-scripts

FROM php:8.4-cli-alpine

RUN docker-php-ext-install pdo_mysql
WORKDIR /var/www/html
COPY --from=vendor /app/vendor ./vendor
COPY . .

RUN rm -f bootstrap/cache/*.php \
    && chmod +x docker-entrypoint.sh \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 8000
ENTRYPOINT ["./docker-entrypoint.sh"]
