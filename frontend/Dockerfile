FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
USER root
RUN chmod -R 777 /usr/share/nginx/html && rm -rf /usr/share/nginx/html/*
COPY build/ /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
