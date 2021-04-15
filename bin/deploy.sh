#!/bin/bash
#WORK_PATH='/home/course/client'
WORK_PATH='/root/client'
cd $WORK_PATH
echo "清理代码"
git reset --hard origin/main
git clean -f
echo "拉取最新代码"
git pull origin main
echo "安装依赖"
yarn install
echo "打包最新代码"
yarn build
echo "开始构建镜像"
docker build -t course-platform-client .
echo "删除旧容器"
docker stop course-platform-client
docker rm course-platform-client
echo "启动新容器"
docker run -p 80:80 --name course-platform-client -d course-platform-client