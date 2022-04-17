FROM nginx

RUN rm /etc/nginx/conf.d/default.conf

COPY config/yeyezhou.com.key  /etc/nginx/

COPY config/yeyezhou.com_bundle.crt  /etc/nginx/

ADD default.conf /etc/nginx/conf.d/

COPY dist/ /usr/share/nginx/html/