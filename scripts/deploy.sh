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

repo="${registry}/mobtimer”
image=${repo}:${VERSION}

echo "Creating and publishing docker image..." && \
docker login -u=${DOCKER_USERNAME} -p=${DOCKER_PASSWORD} ${DOCKER_REGISTRY} && \
docker build -t ${image} . && \
docker tag ${image} ${repo}:${tag} && \
docker push ${image} && \
echo "Deploying mobtimer to cluster…” 
# && \
#kubectl apply -f kubernetes/quantum-configmap.yml --record && \
#kubectl set image deployment/quantum-deployment quantum=${image} --record && \
#kubectl rollout status deployment/quantum-deployment && \
