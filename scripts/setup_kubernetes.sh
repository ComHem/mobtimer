#!/usr/bin/env bash

BRANCH=$1

case "${BRANCH}" in
  master)
    ;;
  *)
    echo "Error: Branch not allowed:" ${BRANCH}
    exit -1
    ;;
esac

### Install kubernetes
echo "Downloading kubernetes binary..."
curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.7.10/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl

### Create config
echo "Creating kubernetes configuration..."
mkdir ${HOME}/.kube
cat > ${HOME}/.kube/config << EOF
---
apiVersion: v1
clusters:
  - cluster:
      certificate-authority-data: "${CERTIFICATE_AUTHORITY_DATA}"
      server: "${CLUSTER_SERVER}"
    name: "${CLUSTER_NAME}"
contexts:
  - context:
      cluster: "${CLUSTER_NAME}"
      user: "${CLUSTER_NAME}-admin"
    name: "${CLUSTER_NAME}"
current-context: "${CLUSTER_NAME}"
kind: Config
users:
  - name: "${CLUSTER_NAME}-admin"
    user:
      client-certificate-data: "${CLIENT_CERTIFICATE_DATA}"
      client-key-data: "${CLIENT_KEY_DATA}"
EOF
