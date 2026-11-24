#!/bin/bash
# Gera a imagem do Destaques UFSM – Sistema: dist/Destaques-UFSM-Sistema-amd64.iso
#
#   sudo bash sistema/construir-iso.sh            usa dist/destaques-ufsm_amd64.deb e dist/destaques-sistema_all.deb
#   sudo bash sistema/construir-iso.sh --release  baixa o painel da última release do GitHub
#
# Precisa de Debian 13 com live-build (sudo apt install live-build). Em outro Linux com Docker,
# o script roda sozinho dentro de um container debian:trixie (--privileged).
# Leva de 15 a 40 minutos e uns 8 GB de disco; o resultado tem cerca de 1 GB.
set -euo pipefail
raiz=$(cd "$(dirname "$0")/.." && pwd)
REPO=danielcarli/Totem-UFSM-noticias

# fora do Debian 13 com live-build: refaz dentro do Docker
if ! command -v lb >/dev/null || ! grep -q 'VERSION_CODENAME=trixie' /etc/os-release 2>/dev/null; then
  command -v docker >/dev/null || { echo "Precisa de Debian 13 com live-build, ou de Docker."; exit 1; }
  echo "==> rodando dentro de um container Debian 13"
  exec docker run --rm --privileged -v "$raiz:/projeto" -w /projeto \
    -e DESTAQUES_UID="$(id -u)" -e DESTAQUES_GID="$(id -g)" debian:trixie bash -c '
      set -e
      apt-get update -qq && apt-get install -y -qq live-build wget ca-certificates curl >/dev/null
      bash sistema/construir-iso.sh '"$*"'
      chown -R "$DESTAQUES_UID:$DESTAQUES_GID" dist'
fi

[ "$(id -u)" = 0 ] || { echo "Rode como administrador (sudo)."; exit 1; }
mkdir -p "$raiz/dist"

# ---- pacotes .deb ----
debs=$(mktemp -d)
if [ "${1:-}" = --release ]; then
  echo "==> baixando o painel da última release"
  curl -fsSL -o "$debs/destaques-ufsm_amd64.deb" "https://github.com/$REPO/releases/latest/download/destaques-ufsm_amd64.deb"
  bash "$raiz/sistema/construir-deb.sh" >/dev/null && cp "$raiz/dist/destaques-sistema_all.deb" "$debs/"
else
  [ -f "$raiz/dist/destaques-sistema_all.deb" ] || bash "$raiz/sistema/construir-deb.sh"
  for f in destaques-ufsm_amd64.deb destaques-sistema_all.deb; do
    [ -f "$raiz/dist/$f" ] || { echo "Falta dist/$f (gere com: npm run dist:linux e bash sistema/construir-deb.sh, ou use --release)"; exit 1; }
    cp "$raiz/dist/$f" "$debs/"
  done
fi

# ---- live-build ----
TRAB=${DESTAQUES_TRABALHO:-/tmp/destaques-iso}
echo "==> preparando $TRAB"
rm -rf "$TRAB"; mkdir -p "$TRAB"
cp -a "$raiz/sistema/live/." "$TRAB/"
find "$TRAB" -type f \( -name '*.chroot' -o -name '*.cfg' -o -path '*/auto/*' -o -path '*/includes.chroot*' \) -exec sed -i 's/\r$//' {} +
chmod +x "$TRAB"/auto/* "$TRAB"/config/hooks/normal/*
mkdir -p "$TRAB/config/packages.chroot" "$TRAB/config/includes.chroot/root/destaques-debs"
cp "$debs"/*.deb "$TRAB/config/packages.chroot/"
cp "$debs"/*.deb "$TRAB/config/includes.chroot/root/destaques-debs/"
rm -rf "$debs"

cd "$TRAB"
lb config
lb build
iso=$(ls -1 "$TRAB"/*.iso | head -1)
[ -f "$iso" ] || { echo "a imagem não foi gerada (veja $TRAB/build.log)"; exit 1; }
mv "$iso" "$raiz/dist/Destaques-UFSM-Sistema-amd64.iso"
echo "==> pronto: dist/Destaques-UFSM-Sistema-amd64.iso ($(du -h "$raiz/dist/Destaques-UFSM-Sistema-amd64.iso" | cut -f1))"
