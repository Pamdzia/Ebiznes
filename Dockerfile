FROM ubuntu:22.04

# Aktualizacja i instalacja zależności
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

# Instalacja pyenv
RUN curl https://pyenv.run | bash

# Dodanie pyenv do PATH
ENV PATH="/root/.pyenv/bin:/root/.pyenv/shims:${PATH}"
# Ustawienie JAVA_HOME
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64

# Instalacja Pythona 3.8 za pomocą pyenv
RUN pyenv install 3.8.0
RUN pyenv global 3.8.0


# Instalacja SDKMAN! i Kotlin
RUN curl -s "https://get.sdkman.io" | bash
RUN bash -c "source \"$HOME/.sdkman/bin/sdkman-init.sh\" && sdk install kotlin"

WORKDIR /workspace

ENTRYPOINT ["/bin/bash"]
