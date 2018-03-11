FROM node:alpine
EXPOSE 8080
ENV PORT 8080
ADD . /srv/staticapp
COPY build.txt ./meta/build.txt
ADD ./meta /srv/staticapp/meta
WORKDIR /srv/staticapp
RUN npm install && npm install -g serve && npm run-script build
RUN echo `date '+%Y-%m-%d %H:%M:%S'` > ./meta/build.txt
CMD ["serve", "-s", "build"]
