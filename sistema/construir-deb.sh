#!/bin/bash
# Gera dist/destaques-sistema_all.deb a partir de sistema/raiz (versão = package.json).
#   bash sistema/construir-deb.sh
set -euo pipefail
raiz=$(cd "$(dirname "$0")/.." && pwd)
versao=$(sed -n 's/^ *"version": *"\([^"]*\)".*/\1/p' "$raiz/package.json" | head -1)
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
cp -a "$raiz/sistema/raiz/." "$tmp/"
mkdir -p "$tmp/DEBIAN"
cp "$raiz/sistema/pacote/DEBIAN/"* "$tmp/DEBIAN/"
sed -i "s/@VERSAO@/$versao/" "$tmp/DEBIAN/control"
# arquivos de /etc do pacote (atualizados sem perguntar, com --force-confnew)
(cd "$tmp" && find etc -type f | sed 's#^#/#' | sort) > "$tmp/DEBIAN/conffiles"
# finais de linha e permissões corretos mesmo vindo do Windows
find "$tmp" -type f ! -path '*/DEBIAN/conffiles' -exec sed -i 's/\r$//' {} +
chmod 755 "$tmp"/usr/sbin/* "$tmp"/usr/lib/destaques/{sessao,xsessao,quiosque,telas,telas-root} \
  "$tmp"/etc/grub.d/42_destaques-recuperacao "$tmp"/etc/kernel/postinst.d/zz-destaques-grub "$tmp"/DEBIAN/postinst "$tmp"/DEBIAN/prerm
chmod 644 "$tmp"/usr/lib/destaques/comum.sh "$tmp"/usr/lib/destaques/openbox.xml
chmod 440 "$tmp"/etc/sudoers.d/destaques
mkdir -p "$raiz/dist"
dpkg-deb --root-owner-group -Zxz --build "$tmp" "$raiz/dist/destaques-sistema_all.deb" >/dev/null
echo "gerado dist/destaques-sistema_all.deb ($versao)"
