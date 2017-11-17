#!/usr/bin/env bash

BRANCH=$1
VERSION=$2

case "${BRANCH}" in
  master)
    env="RELEASE"
    tag="latest"
    ;;
  *)
    echo "Error: Branch not allowed:" ${BRANCH}
    exit -1
    ;;
esac

repo="${DOCKER_REGISTRY}/mobtimer"
image=${repo}:${VERSION}

echo "Creating and publishing docker image..." && \
docker login -u=${DOCKER_USERNAME} -p=${DOCKER_PASSWORD} ${DOCKER_REGISTRY} && \
docker build -t ${image} . && \
docker tag ${image} ${repo}:${tag} && \
docker push ${image} && \
echo "Deploying mobtimer to cluster…" && \
kubectl apply -f kubernetes/mobtimer-configmap.yml --record && \
kubectl set image deployment/mobtimer-deployment mobtimer=${image} --record && \
kubectl rollout status deployment/mobtimer-deployment
