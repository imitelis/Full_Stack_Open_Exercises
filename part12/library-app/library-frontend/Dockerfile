# The first FROM is now a stage called build-stage
FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

# Declare the APP Backend HTTP and WS as arguments
ARG REACT_APP_GRAPHQL_HTTP
ARG REACT_APP_GRAPHQL_WS
ENV REACT_APP_GRAPHQL_HTTP=$REACT_APP_GRAPHQL_HTTP
ENV REACT_APP_GRAPHQL_WS=$REACT_APP_GRAPHQL_WS

RUN npm ci
RUN npm run build

# This is a new stage, everything before this is gone, except the files we want to COPY
FROM nginx:1.20-alpine

# COPY the directory build from build-stage to /usr/share/nginx/html
# The target location here was found from the Docker hub page
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html