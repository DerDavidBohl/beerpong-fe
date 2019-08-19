### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node as builder

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build

RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

# RUN sed 's/http:\/\/localhost:3000\/api\/v1/${BACKEND_URL}/g' src/environments/environment.prod.ts > src/environments/environment.prod.ts
# RUN cat src/environments/environment.prod.ts
## Build the angular app in production mode and store the artifacts in dist folder

RUN npm run ng build -- --prod --output-path=dist


### STAGE 2: Setup ###

FROM nginx

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html
CMD envsubst < /usr/share/nginx/html/assets/settings.template.json > /usr/share/nginx/html/assets/settings.json && exec nginx -g 'daemon off;'


