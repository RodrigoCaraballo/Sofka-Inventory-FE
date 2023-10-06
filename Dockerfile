FROM nginx:alpine
COPY ./dist/sofka-inventory-fe/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
