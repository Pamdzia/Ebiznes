FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    build-essential \
    libssl-dev \
    zlib1g-dev \
    libbz2-dev \
    libreadline-dev \
    libsqlite3-dev \
    wget \
    curl \
    libffi-dev \
    software-properties-common \
    openjdk-8-jdk \
    && rm -rf /var/lib/apt/lists/*

RUN curl https://pyenv.run | bash

ENV PATH="/root/.pyenv/bin:/root/.pyenv/shims:${PATH}"
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64

RUN pyenv install 3.8.0
RUN pyenv global 3.8.0

RUN curl -s "https://get.sdkman.io" | bash
RUN bash -c "source \"$HOME/.sdkman/bin/sdkman-init.sh\" && sdk install kotlin"
RUN bash -c "source \"$HOME/.sdkman/bin/sdkman-init.sh\" && sdk install gradle"

RUN curl -sSLO https://github.com/pinterest/ktlint/releases/download/0.43.2/ktlint && chmod a+x ktlint && mv ktlint /usr/local/bin/

WORKDIR /workspace