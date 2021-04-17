#!/bin/bash
echo '执行部署脚本'
ssh course@dev 'bash -s' < ./bin/deploy.sh