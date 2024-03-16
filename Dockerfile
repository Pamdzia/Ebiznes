FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    git \
    build-essential \
    libssl-dev \
    zlib1g-dev \
    libbz2-dev \
    libreadline-dev \
    libsqlite3-dev \ 
    wget \
    curl \
    libffi-dev \
    && rm -rf /var/lib/apt/lists/*

RUN curl https://pyenv.run | bash

ENV PATH="/root/.pyenv/bin:/root/.pyenv/shims:${PATH}"

RUN pyenv install 3.8.0

RUN pyenv global 3.8.0

WORKDIR /workspace

ENTRYPOINT ["/bin/bash"]
