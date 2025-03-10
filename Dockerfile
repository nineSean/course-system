FROM nginx
LABEL name="course-platform-client"
LABEL version="1.0"
COPY ./dist /usr/share/nginx/html/
COPY ./assets /usr/share/nginx/assets
COPY ./nginx.conf /etc/nginx/conf.d/
EXPOSE 80
