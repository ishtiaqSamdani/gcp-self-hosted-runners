FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
USER root
RUN rm -rf /usr/share/nginx/html/*
COPY build/ /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
