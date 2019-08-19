
FROM node:latest as builder
WORKDIR /usr/src/
RUN git clone https://github.com/DerDavidBohl/beerpong-fe.git
WORKDIR /usr/src/beerpong-fe
RUN npm install
ENV PATH /usr/src/beerpong-fe/node_modules/.bin:$PATH
RUN npm run ng build -- --prod --output-path=dist

FROM nginx

COPY --from=builder /usr/src/beerpong-fe/dist/ /usr/share/nginx/html

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/settings.template.json > /usr/share/nginx/html/assets/settings.json && exec nginx -g 'daemon off;'"]

