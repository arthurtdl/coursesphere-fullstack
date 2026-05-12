# Imagem base oficial do Ruby
FROM ruby:3.2.2-slim

# Instala dependências necessárias para o Rails e PostgreSQL
RUN apt-get update -qq && apt-get install -y \
    build-essential \
    libpq-dev \
    nodejs \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Criação de usuário não-root
RUN useradd -m rails

# Configuração do diretório de trabalho
WORKDIR /home/rails/app

# Define o usuário rails como dono da pasta de trabalho antes de mudar o usuário
RUN chown rails:rails /home/rails/app

# Muda para o usuário rails antes de instalar dependências
USER rails

# Copia os arquivos de definição de gems
COPY --chown=rails:rails Gemfile Gemfile.lock ./

# Instala as gems
RUN bundle install

# Copia o restante do código
COPY --chown=rails:rails . .

# Configura o entrypoint
USER root

# Copia o script para o diretório da aplicação
COPY entrypoint.sh ./entrypoint.sh

# Corrige quebras de linha (CRLF para LF) caso use Windows
RUN sed -i 's/\r$//' ./entrypoint.sh && chmod +x ./entrypoint.sh

# Volta para o usuário rails
USER rails

# Usa o caminho relativo
ENTRYPOINT ["./entrypoint.sh"]

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]