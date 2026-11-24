# shellcheck shell=bash
# Funções e configurações comuns dos scripts do Destaques UFSM – Sistema.
# (lido com ". /usr/lib/destaques/comum.sh")

# configurações de fábrica (vêm no pacote) e as desta máquina (feitas pela tela de configurações)
. /etc/destaques-os/sistema.conf
[ -f /etc/destaques-os/local.conf ] && . /etc/destaques-os/local.conf

ESTADO=/var/lib/destaques            # versões guardadas, estado da atualização, PIN
RUN=/run/destaques                   # estado da energia (aberto/fechado)
mkdir -p "$ESTADO" "$RUN" 2>/dev/null || true

registra(){                          # registra "texto" → journal (journalctl -t destaques)
  logger -t destaques -- "$*" 2>/dev/null || true
}

uid_painel(){ id -u "$PAINEL_USUARIO" 2>/dev/null || echo 1000; }

# roda um comando como o usuário do painel, dentro da sessão dele (som, tela)
como_painel(){
  local uid; uid=$(uid_painel)
  runuser -u "$PAINEL_USUARIO" -- env \
    HOME="$(getent passwd "$PAINEL_USUARIO" | cut -d: -f6)" \
    XDG_RUNTIME_DIR="/run/user/$uid" \
    DBUS_SESSION_BUS_ADDRESS="unix:path=/run/user/$uid/bus" \
    DISPLAY=:0 XAUTHORITY="$(getent passwd "$PAINEL_USUARIO" | cut -d: -f6)/.Xauthority" \
    "$@"
}

versao_pacote(){ dpkg-query -W -f='${Version}' "$1" 2>/dev/null || true; }

# compara versões no padrão do Debian: maior "1.7.1" "1.7.0" → verdadeiro
versao_maior(){ dpkg --compare-versions "$1" gt "$2"; }

# hora "HH:MM" → minutos desde a meia-noite
minutos(){ local h=${1%%:*} m=${1##*:}; echo $((10#$h * 60 + 10#$m)); }

# reinicia só o programa do painel (o laço do quiosque abre de novo em 2 s)
reinicia_painel(){
  pkill -TERM -u "$PAINEL_USUARIO" -f '/opt/Destaques UFSM/destaques-ufsm' 2>/dev/null || true
}
