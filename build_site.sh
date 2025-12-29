#!/bin/bash
set -e  # Interrompe o script se qualquer comando falhar

#
# build_site.sh: constrói o site de documentação da Plataforma Opus Open Finance.
#
# Etapas:
#   (1) página de redirecionamento
#   (2) pt-br
#   (3) en
#   (4) es
#

# Detecta ambiente (GitHub Actions ou local)
if [ -n "$GITHUB_ACTIONS" ]; then
  BASE="$PWD"
else
  BASE="$HOME/site_doc_oof"
fi

BUILD_TMP="$BASE/tmp-build"
FINAL_DEST="$BASE/_site"
DOCS_DEST="$FINAL_DEST/Documentation"

# Garante que estamos na raiz do docs
if [ "$(basename "$PWD")" != "docs" ]; then
  cd docs
fi

echo "🔄 Limpando build anterior..."
bundle exec jekyll clean
rm -rf "$BUILD_TMP" "$FINAL_DEST"

# -------------------------------
# Builds
# -------------------------------

build_redirect() {
  echo "🌐 Gerando página de redirecionamento..."
  bundle exec jekyll build \
    --config _config.yml,_config-redirect.yml \
    --destination "$BUILD_TMP/index"
}

build_pt_br() {
  echo "🌐 🇧🇷 Gerando versão pt-br..."
  JEKYLL_ENV=pt-br bundle exec jekyll build \
    --config _config.yml,_config-pt-br.yml \
    --destination "$BUILD_TMP/pt-br"
}

build_en() {
  echo "🌐 🇺🇸 Gerando versão en..."
  JEKYLL_ENV=en bundle exec jekyll build \
    --config _config.yml,_config-en.yml \
    --destination "$BUILD_TMP/en"
}

build_es() {
  echo "🌐 🇪🇸 Gerando versão es..."
  JEKYLL_ENV=es bundle exec jekyll build \
    --config _config.yml,_config-es.yml \
    --destination "$BUILD_TMP/es"
}

# -------------------------------
# Montagem final
# -------------------------------

assemble_final_site() {
  echo "📦 Montando conteúdo final em $FINAL_DEST..."
  mkdir -p "$DOCS_DEST"

  # -------- Copia swagger-ui UMA VEZ --------
  if [ -d "swagger-ui" ] && [ ! -d "$DOCS_DEST/swagger-ui" ]; then
    echo "📁 Copiando swagger-ui..."
    cp -r swagger-ui "$DOCS_DEST/"
  fi

  # -------- pt-br --------
  if [ -d "$BUILD_TMP/pt-br" ]; then
    echo "📁 Montando pt-br..."

    mv "$BUILD_TMP/pt-br/pt-br" "$DOCS_DEST/"

    # assets entram UMA ÚNICA VEZ
    if [ ! -d "$DOCS_DEST/assets" ]; then
      cp -r "$BUILD_TMP/pt-br/assets" "$DOCS_DEST/"
    fi

    mv "$BUILD_TMP/pt-br/assets/js/search-data.json" \
       "$DOCS_DEST/assets/js/search-data-pt-br.json"

    mv "$BUILD_TMP/pt-br/404.html" "$DOCS_DEST/" 2>/dev/null || true
    mv "$BUILD_TMP/pt-br/LICENSE" "$DOCS_DEST/" 2>/dev/null || true
    mv "$BUILD_TMP/pt-br/README.md" "$DOCS_DEST/" 2>/dev/null || true
  fi

  # -------- en --------
  if [ -d "$BUILD_TMP/en" ]; then
    echo "📁 Montando en..."

    mv "$BUILD_TMP/en/en" "$DOCS_DEST/"

    mv "$BUILD_TMP/en/assets/js/search-data.json" \
       "$DOCS_DEST/assets/js/search-data-en.json"
  fi

  # -------- es --------
  if [ -d "$BUILD_TMP/es" ]; then
    echo "📁 Montando es..."

    mv "$BUILD_TMP/es/es" "$DOCS_DEST/"

    mv "$BUILD_TMP/es/assets/js/search-data.json" \
       "$DOCS_DEST/assets/js/search-data-es.json"
  fi

  # -------- index --------
  if [ -f "$BUILD_TMP/index/index.html" ]; then
    echo "📄 Instalando index.html..."
    mkdir -p "$FINAL_DEST"
    mv "$BUILD_TMP/index/index.html" "$FINAL_DEST/index.html"
  fi
}

# -------------------------------
# Execução
# -------------------------------

case "$1" in
  pt-br|-pt-br)
    build_pt_br
    ;;
  en|-en)
    build_en
    ;;
  es|-es)
    build_es
    ;;
  *)
    build_redirect
    build_pt_br
    build_en
    build_es
    ;;
esac

assemble_final_site
echo "✅ Build concluído com sucesso em $FINAL_DEST"