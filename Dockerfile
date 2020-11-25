FROM nginx:1.18.0-alpine

WORKDIR /usr/src/app

COPY ./dist/front-end /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]