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

# Copia para o local correto e dá permissão
COPY entrypoint.sh /usr/bin/entrypoint.sh
RUN chmod +x /usr/bin/entrypoint.sh

# Volta para o usuário rails
USER rails

ENTRYPOINT ["/usr/bin/entrypoint.sh"]

# Porta dinâmica da Render
EXPOSE 3000

# Comando padrão
CMD ["rails", "server", "-b", "0.0.0.0"]