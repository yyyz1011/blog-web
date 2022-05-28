#!/bin/sh

# use source xxx.sh

unzip -q blog-web.zip -d blog-web
echo 'unzip successfully'

rm -rf blog-web.zip
echo 'rmove blog-web.zip successfully'

cd ~/blog-web
echo 'cd into blog-web'

docker build -t blog-web .
echo 'docker build blog-web successfully'

docker run -d -p 80:80 blog-web
echo 'docker run blog-web successfully'

cd ~ 
echo 'cd ~'

rm -rf blog-web 
echo 'remove blog-web successfully'