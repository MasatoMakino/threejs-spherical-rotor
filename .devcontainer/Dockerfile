FROM mcr.microsoft.com/devcontainers/javascript-node:22

USER root

# Pre-create volume mount point and set ownership to node user
RUN mkdir -p /workspaces/threejs-spherical-rotor/node_modules && \
    chown -R node:node /workspaces/threejs-spherical-rotor

USER node
