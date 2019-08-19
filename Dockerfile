
FROM node:latest as builder
WORKDIR /usr/src/
RUN git clone https://github.com/DerDavidBohl/beerpong-fe.git
WORKDIR /usr/src/beerpong-fe
RUN npm install
#ENV PATH /usr/src/beerpong-fe/node_modules/.bin:$PATH
RUN npm run ng build -- --prod --output-path=dist

FROM nginx

COPY --from=builder /usr/src/beerpong-fe/dist /usr/share/nginx/html
COPY --from=builder /usr/src/beerpong-fe/setEnv.sh /usr/share/beerpong-fe/setEnv.sh

RUN ls /usr/share/beerpong-fe
RUN ["chmod", "+x", "/usr/share/beerpong-fe/setEnv.sh"]
RUN /usr/share/beerpong-fe/setEnv.sh

EXPOSE 80
CMD /usr/share/beerpong-fe/setEnv.sh && nginx -g 'daemon off;'
