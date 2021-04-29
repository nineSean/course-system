echo "开始部署"
echo "删除旧容器"
docker stop course-platform-client
docker rm course-platform-client
echo "删除旧镜像"
docker rmi $(docker images course-platform-client -a -q)
echo "构建新镜像"
docker build -t course-platform-client .
echo "启动新容器"
docker run -p 80:80 -v /home/course/client/dist/:/usr/share/nginx/html/ -v /home/course/client/assets/:/usr/share/nginx/assets/ -v /home/course/client/nginx.conf:/etc/nginx/conf.d/default.conf --name course-platform-client -d course-platform-client
