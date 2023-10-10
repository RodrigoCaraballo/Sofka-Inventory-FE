FROM nginx:alpine
COPY ./dist/sofka-inventory-fe/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./entrypoint.sh ./entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]
