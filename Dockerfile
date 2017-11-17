FROM node:alpine
EXPOSE 8080
ENV PORT 8080
ADD . /srv/staticapp
WORKDIR /srv/staticapp
RUN npm install && npm install -g serve && npm run-script build
CMD ["serve", "-s", "build"]
