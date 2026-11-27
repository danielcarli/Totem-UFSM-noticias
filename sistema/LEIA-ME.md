# Destaques UFSM – Sistema

Imagem de um Linux enxuto (Debian 13, 64 bits) que **liga direto no painel**, para PCs e
notebooks que ficam só por conta da TV ou do totem. Vem com tudo o que o painel precisa — e só
isso: vídeo, rede cabeada e Wi-Fi, Bluetooth, som, mouse e teclado.

- **Download:** [`Destaques-UFSM-Sistema-amd64.iso`](https://github.com/danielcarli/Totem-UFSM-noticias/releases/latest/download/Destaques-UFSM-Sistema-amd64.iso)
  (cerca de 900 MB, gerada pelo GitHub Actions a cada versão).
- **Computador:** 64 bits (x86-64), 2 GB de RAM (4 GB recomendado), 8 GB de disco. PCs e notebooks
  de 2008 em diante, com BIOS antiga ou UEFI. Computadores de 32 bits não servem (o painel usa o
  Electron, que só existe em 64 bits).

## Gravar no pendrive

Use o [balenaEtcher](https://etcher.balena.io/) ou o [Rufus](https://rufus.ie/) (modo **DD**, quando
ele perguntar) para gravar a ISO num pendrive de 2 GB ou mais. No Linux:

```bash
sudo dd if=Destaques-UFSM-Sistema-amd64.iso of=/dev/sdX bs=4M status=progress conv=fsync
```

## Instalar

1. Ligue o computador pelo pendrive (tecla de boot: F12, F9, F11 ou Esc, conforme a marca).
2. No menu, escolha **Instalar o Destaques UFSM neste computador**.
3. Escolha o disco e digite `APAGAR` para confirmar — **tudo no disco é apagado**.
4. Em poucos minutos aparece "Pronto!". Retire o pendrive e pressione Enter.

O computador reinicia e abre o painel sozinho. Na primeira vez, abra a **engrenagem** (ou tecla
**C**) e configure a rede, o som, o nome da TV e o horário de funcionamento.

Para conhecer antes de instalar, escolha **Testar** no menu: o sistema roda do pendrive, sem mexer
no disco (o que for configurado se perde ao desligar).

> **Instalação em série:** com os parâmetros de inicialização `destaques.instalar destaques.auto
> destaques.disco=/dev/sda`, a instalação acontece sem nenhuma pergunta e o computador desliga
> no fim.

## Configurações (engrenagem do painel)

No sistema próprio, a tela de configurações do painel ganha estas seções, que valem na hora:

| Seção | O que dá para fazer |
|---|---|
| **Rede** | ver o endereço; Wi-Fi: procurar redes, conectar com senha ou com **usuário e senha** (eduroam e redes institucionais), rede oculta, esquecer; cabo: automático (DHCP) ou **endereço fixo** (IP, gateway, DNS) |
| **Som** | escolher a saída (HDMI da TV, saída do computador, caixa Bluetooth), volume geral, testar |
| **Bluetooth** | ligar/desligar, procurar, conectar e esquecer caixas de som, fones, teclados e mouses |
| **Telas do notebook** | TV e tela do notebook lado a lado, só a TV, ou espelhadas (aparece só em notebooks) |
| **Horário de funcionamento** | dias e horários do setor e o que fazer fora deles (veja abaixo) |
| **Este computador** | nome, endereço, modelo, versões, espaço livre; reiniciar e desligar |
| **Versão e atualizações** | buscar e instalar a versão nova agora; atualizar sozinho ligado/desligado |

O mouse e o teclado funcionam normalmente (com fio, sem fio ou Bluetooth; teclado ABNT2). O cursor
do mouse **some depois de 1 minuto parado** e volta ao mexer o mouse.

## Notebook com a TV

O notebook funciona com a própria tela e a da TV ao mesmo tempo. Por padrão, as duas ficam lado a
lado e a TV é o **monitor 1** — é nela que o painel abre. As teclas **1**, **2** e **3** (ou a
engrenagem) trocam o painel de monitor, e a escolha é lembrada. Ligar ou desligar o cabo da TV com o
sistema ligado rearruma as telas sozinho.

- **Tampa fechada:** o notebook continua ligado e usa só a TV.
- Em **Telas do notebook** dá para escolher "só a TV" (desliga a tela do notebook) ou "espelhar".

## Horário de funcionamento

Marque os dias e os horários em que o setor fica aberto. Fora deles:

- **Suspender o computador** (padrão): o painel escurece, a tela apaga e o computador entra em
  suspensão — fica quase desligado, gastando poucos watts. O relógio da placa-mãe liga o computador
  sozinho **2 minutos antes da abertura**, e o painel volta já com notícias novas.
- **Só desligar a tela:** para computadores que não voltam bem da suspensão. A tela fica sem sinal
  (a maioria das TVs entra em espera) e o processador desacelera.

Se a suspensão falhar numa máquina, o sistema passa sozinho a só desligar a tela até o dia
seguinte. Se alguém acordar o computador fora do horário (tecla ou botão), ele fica ligado por
30 minutos para manutenção e depois volta a dormir.

## Atualização

O sistema procura versão nova na página de [Releases](https://github.com/danielcarli/Totem-UFSM-noticias/releases)
**15 minutos depois de ligar e todo dia às 4h30** (num minuto aleatório até 4h50, para as TVs não
baixarem todas juntas). Ele baixa o painel (`destaques-ufsm_amd64.deb`) e a camada do sistema
(`destaques-sistema_all.deb`), **confere os dois com o `SHA256SUMS.txt` da release**, instala e
reabre o painel. A versão anterior fica guardada para poder voltar.

Para atualizar na hora: engrenagem → **Versão e atualizações** → **Buscar atualização** →
**Instalar agora**. A atualização automática pode ser desligada na mesma seção.

## Se algo der errado — recuperação

O painel se recupera sozinho de quase tudo:

- se o painel fechar, ele abre de novo em 2 segundos;
- se a página travar por 1 minuto, o painel é reiniciado;
- se o painel fechar **4 vezes seguidas** logo depois de abrir, o sistema faz uma **atualização
  forçada** pelo GitHub e tenta de novo;
- se o computador inteiro travar, o watchdog da placa-mãe (quando existe) reinicia a máquina.

Para entrar à mão no **menu de recuperação** (pede o **PIN de manutenção**, de fábrica **1960**):

- com o painel na tela: **Ctrl+Alt+F2** (Ctrl+Alt+F1 volta para o painel);
- se nem o painel aparece: no menu de inicialização, escolha **Destaques UFSM — recuperação**.

| Opção | Para quê |
|---|---|
| Forçar atualização | baixa e reinstala a última versão, mesmo se for a mesma |
| Voltar para a versão anterior | quando uma versão nova deu problema |
| Configurar a rede | cabo e Wi-Fi em modo texto (`nmtui`), para o caso de a rede ter mudado |
| Diagnóstico | versões, endereço, internet, disco, placas de rede (com o driver), bloqueios de rádio, mensagens de firmware, últimas mensagens do painel |
| Restaurar as configurações | volta o painel e o horário ao padrão de fábrica |
| Trocar o PIN | **troque o PIN de fábrica** em painéis em lugares públicos |
| Terminal | linha de comando de administrador (manutenção avançada) |

### Wi-Fi não aparece

A engrenagem diz o motivo e tem o botão **Tentar de novo** (libera o rádio e procura a placa de
novo):

- **Chave do notebook desligada** — muitos notebooks têm uma chavinha de Wi-Fi na lateral ou na
  frente. Ligue e clique em *Tentar de novo*.
- **Desligado pela tecla Fn** (ex.: Fn + F5 nos Lenovo) — o bloqueio fica guardado no notebook,
  até de quando ele usava Windows. O sistema libera ao ligar e no *Tentar de novo*.
- **Placa encontrada, mas sem driver** — aparece o nome e o código da placa (ex.: `14e4:4315`).
  Use o cabo de rede ou um adaptador USB de Wi-Fi, e mande o código para quem mantém o painel.
- **Nenhuma placa** — o computador não tem Wi-Fi (ou ela está desligada por chave): um adaptador
  USB de Wi-Fi resolve.

## Para quem mantém

| Arquivo | Função |
|---|---|
| `/etc/destaques-os/sistema.conf` | padrões de fábrica (repositório, usuário, opções do painel, telas) |
| `/etc/destaques-os/local.conf` | o que foi mudado nesta máquina (vale por cima do anterior) |
| `/etc/destaques-os/horario.json` | horário de funcionamento |
| `/var/lib/destaques/` | estado da atualização, versões guardadas (`atual`, `anterior`), PIN |
| `~painel/.local/state/destaques/painel.log` | mensagens do painel |
| `journalctl -t destaques` | registro do sistema: rede, horário, atualizações, telas |

Opções extras do painel (as mesmas do atalho, ex.: `--leve` ou `--orientacao=vertical`, e
`--disable-gpu` para placas de vídeo muito antigas) vão em `PAINEL_OPCOES` no `local.conf`.

Programas: `destaques-sistema` (ponte da tela de configurações, responde em JSON),
`destaques-atualiza`, `destaques-energia`, `destaques-recuperacao`, `destaques-instalar` e
`/usr/lib/destaques/{sessao,xsessao,quiosque,telas}`. O código fica em
[`sistema/`](https://github.com/danielcarli/Totem-UFSM-noticias/tree/main/sistema).

### Gerar a imagem

```bash
npm run dist:linux                 # painel: dist/destaques-ufsm_amd64.deb
bash sistema/construir-deb.sh      # sistema: dist/destaques-sistema_all.deb
sudo bash sistema/construir-iso.sh # imagem: dist/Destaques-UFSM-Sistema-amd64.iso
```

`construir-iso.sh` usa o live-build do Debian 13; em outro Linux, roda sozinho dentro de um
container Docker. Com `--release`, usa o painel da última release em vez de gerar um.
