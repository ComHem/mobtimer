FROM node:alpine
EXPOSE 8080
ENV PORT 8080
ADD . /srv/staticapp
WORKDIR /srv/staticapp
RUN npm install && npm install -g serve && npm run-script test && npm run-script build
RUN echo `date '+%Y-%m-%d %H:%M:%S'` > build/static/build.txt
CMD ["serve", "-s", "build"]
