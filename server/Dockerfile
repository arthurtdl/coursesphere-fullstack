# Imagem base oficial do Ruby
FROM ruby:3.2.2-slim

# Instala dependências necessárias para o Rails e PostgreSQL
RUN apt-get update -qq && apt-get install -y \
    build-essential \
    libpq-dev \
    nodejs \
    curl \
    git

# Criação de usuário não-root (segurança) e configuração do diretório de trabalho
RUN useradd -m rails
WORKDIR /home/rails/app

# Copia os arquivos de definição criados manualmente
COPY --chown=rails:rails Gemfile Gemfile.lock ./

# Instala as gems
RUN bundle install

# Copia o restante do código da aplicação para o contêiner
COPY --chown=rails:rails . .

# Configura o entrypoint
COPY --chown=rails:rails entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# Muda para o usuário não-root
USER rails
EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]