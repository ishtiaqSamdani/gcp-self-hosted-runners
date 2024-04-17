FROM node:18-alpine3.15

WORKDIR /mockserver

COPY db.json .
COPY ../package.json .
# COPY package-lock.json .

RUN npm install json-server@0.17.3

# RUN npm install -g json-server

EXPOSE 8080

ENTRYPOINT [ "json-server", "--watch", "db.json", "--port", "8080", "--host", "0.0.0.0" ]