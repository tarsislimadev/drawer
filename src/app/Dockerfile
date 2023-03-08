# FROM node:lts

# WORKDIR /app

# COPY html .

# RUN npm i

FROM nginx:stable

WORKDIR /usr/share/nginx/html/

COPY ./default.conf /etc/nginx/conf.d/default.conf

COPY html .
