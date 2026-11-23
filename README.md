<div align="center">

# Destaques UFSM

**Painel de notícias para TVs e totens da Universidade Federal de Santa Maria**

![Versão](https://img.shields.io/badge/vers%C3%A3o-1.7.0-0b5394)
![Licença](https://img.shields.io/badge/licen%C3%A7a-GPL--3.0-e7640a)
![Plataformas](https://img.shields.io/badge/plataformas-Windows%20%7C%20Linux-1ab2af)
![Electron](https://img.shields.io/badge/Electron-45-47848f)

**[⬇ Baixar a versão mais recente](#download)** · [Todas as versões](https://github.com/danielcarli/Totem-UFSM-noticias/releases) · [Como instalar](#instalação)

<img src="docs/tela-tv.jpg" alt="Destaques UFSM em uma TV" width="900">

</div>

## Sobre o projeto

O **Destaques UFSM** é uma solução feita especificamente para **totens e TVs**: leva para as
telas dos prédios, halls e espaços de convivência as notícias e informações publicadas no site
da Universidade Federal de Santa Maria ([www.ufsm.br](https://www.ufsm.br)).

Idealizado por **Daniel Michelon De Carli**, o software tem a finalidade de trazer uma
**visualização mais moderna para as notícias e os destaques institucionais da UFSM**. Foi
desenvolvido para a **Agência de Notícias UFSM**, da **Coordenadoria de Comunicação da UFSM**.

O painel abre em tela cheia, mostra em carrossel todas as notícias com foto da página principal
do portal e se atualiza sozinho. Depois de instalado, não precisa de ninguém para operar.

## Sumário

- [Download](#download)
- [Telas](#telas)
- [Recursos](#recursos)
- [Instalação](#instalação)
- [TV ou totem funcionando sozinho](#tv-ou-totem-funcionando-sozinho)
- [Configurações](#configurações)
- [Uso](#uso)
- [Como funciona](#como-funciona)
- [Desenvolvimento](#desenvolvimento)
- [Versões](#versões)
- [Sugestões por fazer](#sugestões-por-fazer)
- [Créditos](#créditos)
- [Licença](#licença)

## Download

Os links abaixo sempre baixam a **versão mais recente** publicada em
[Releases](https://github.com/danielcarli/Totem-UFSM-noticias/releases).

| Sistema | Download |
|---|---|
| **Windows 10 / 11** (64 bits) — instalador | [`Destaques-UFSM-Setup.exe`](https://github.com/danielcarli/Totem-UFSM-noticias/releases/latest/download/Destaques-UFSM-Setup.exe) |
| Windows — portátil, sem instalar | [`Destaques-UFSM-win-x64.zip`](https://github.com/danielcarli/Totem-UFSM-noticias/releases/latest/download/Destaques-UFSM-win-x64.zip) |
| **Debian, Ubuntu, Linux Mint** | [`destaques-ufsm_amd64.deb`](https://github.com/danielcarli/Totem-UFSM-noticias/releases/latest/download/destaques-ufsm_amd64.deb) |
| **Fedora, RHEL, openSUSE** | [`destaques-ufsm.x86_64.rpm`](https://github.com/danielcarli/Totem-UFSM-noticias/releases/latest/download/destaques-ufsm.x86_64.rpm) |
| Qualquer Linux — AppImage, sem instalar | [`Destaques-UFSM-x86_64.AppImage`](https://github.com/danielcarli/Totem-UFSM-noticias/releases/latest/download/Destaques-UFSM-x86_64.AppImage) |
| Navegador — arquivo único | [`destaques-ufsm.html`](https://github.com/danielcarli/Totem-UFSM-noticias/releases/latest/download/destaques-ufsm.html) |

Pelo terminal do Linux (Debian, Ubuntu, Mint):

```bash
wget https://github.com/danielcarli/Totem-UFSM-noticias/releases/latest/download/destaques-ufsm_amd64.deb
sudo apt install ./destaques-ufsm_amd64.deb
```

## Telas

<table>
  <tr>
    <th>TV (horizontal)</th>
    <th>Totem (vertical)</th>
  </tr>
  <tr>
    <td><img src="docs/tela-tv.jpg" alt="Painel na horizontal" width="560"></td>
    <td align="center"><img src="docs/tela-totem.jpg" alt="Painel na vertical" width="250"></td>
  </tr>
</table>

O painel reconhece a posição da tela. Na **horizontal**, mostra o carrossel com os cards
vizinhos ao fundo, dando uma prévia das próximas notícias. **Em pé**, o card ocupa a tela
inteira, com textos e QR code maiores ("Leia no celular").

<table>
  <tr>
    <th>Banner do topo do portal</th>
    <th>Notícia sem foto</th>
  </tr>
  <tr>
    <td><img src="docs/tela-banner.jpg" alt="Banner do Descubra UFSM no painel" width="430"></td>
    <td><img src="docs/tela-sem-foto.jpg" alt="Card de notícia sem foto" width="430"></td>
  </tr>
</table>

**Identidade institucional.** A marca da UFSM fica no topo; a Coordenadoria de Comunicação e a
Agência de Notícias, que desenvolve o painel, assinam no rodapé, com a hora da última atualização
e, bem discreta embaixo dela, a versão do painel (ex.: `v1.7.0`) — útil para saber se uma TV já
recebeu a atualização.
Abaixo do título de cada matéria aparece o **site de onde ela vem**: o portal da UFSM é formado por
muitos subsites (pró-reitorias, centros, cursos), e as matérias da página principal são da
Agência — nelas aparece "Agência de Notícias UFSM - Portal Institucional".

<img src="docs/detalhe-topo.jpg" alt="Topo do painel com a marca da UFSM" width="760">
<img src="docs/detalhe-rodape.jpg" alt="Rodapé com Coordenadoria de Comunicação e Agência de Notícias" width="560">

## Recursos

- **Notícias do portal, sempre atualizadas.** Lê a página principal de www.ufsm.br a cada
  15 minutos e mostra todas as notícias com foto: banners do topo, Destaques, Divulga Ciência e
  as demais áreas. Notícia nova entra sozinha; a que saiu do portal sai do painel. Se a página
  tiver menos notícias com foto que o configurado (12), completa com as últimas matérias do portal.
- **Notícias de outros sites da UFSM.** Pela tela de configurações, entram também as matérias do
  Gabinete da Reitoria, das pró-reitorias, das diretorias (DTI e DRI), das unidades de ensino,
  dos campi e das mídias da UFSM (Rádios, TV Campus e Revista .TXT).
- **Rádio UNIFM 107,9 ao vivo (opcional).** Um player discreto, na identidade da UNIFM, na
  lateral direita da tela (no totem, no topo). Desligado por padrão; liga-se na engrenagem.
- **Feito para ser visto de longe.** Títulos grandes, editoria, data e site de origem de cada
  matéria, e um QR code para continuar a leitura no celular.
- **Marca de quem publicou.** Ao lado do site de origem aparece, discreto e na cor do texto, o
  símbolo da unidade, conforme a [identidade institucional](https://www.ufsm.br/identidade-institucional):
  Agência de Notícias no portal, símbolo próprio dos centros e colégios (CAL, CCNE, CCR, CCS,
  CCSH, CE, CEFD, CT, CTISM e Politécnico) e o brasão da UFSM em linhas para o Gabinete, as
  pró-reitorias, as diretorias, os campi e qualquer outro site da UFSM sem símbolo próprio.
- **Só notícia recente.** Matérias publicadas há mais de 30 dias não entram no carrossel
  (opção `--dias`).
- **Leituras do QR code medidas.** O endereço do QR leva `utm_source=painel-destaques`,
  `utm_medium=qrcode` e `utm_campaign=<local>`: no Google Analytics do portal dá para ver quantas
  pessoas leram matérias a partir dos painéis, e de qual painel (opção `--local`).
- **Banners largos animados.** Artes muito largas aparecem inteiras e depois percorrem a imagem
  da esquerda para a direita, terminando antes da troca de card.
- **TV ou totem.** Layout horizontal ou vertical automático, conforme a tela.
- **Vários monitores.** As teclas **1**, **2** e **3** levam o painel para o monitor escolhido, e
  ele lembra a escolha nas próximas aberturas.
- **Funciona sozinho, o dia todo.** Abre em tela cheia, impede que a tela apague, continua
  mostrando as últimas notícias se a internet cair (e tenta de novo a cada minuto), se recupera
  de travamentos, se recarrega uma vez por dia e pode abrir sozinho ao ligar o computador.
- **Atualização automática.** O aplicativo procura versões novas nas
  [Releases](https://github.com/danielcarli/Totem-UFSM-noticias/releases) e, no Windows e no
  AppImage, instala sozinho às 4h30 da manhã, voltando a abrir com as mesmas opções. Nos pacotes
  `.deb` e `.rpm` (que pedem senha de administrador para atualizar), mostra um aviso discreto.
- **Resistente a mudanças no portal.** Se o layout da página principal mudar e o painel achar
  poucas notícias, ele completa com as últimas matérias com foto, direto pela API do WordPress
  (plano B). E um teste diário no GitHub avisa por e-mail quando isso acontece.
- **Modo noite.** Opcionalmente, deixa a tela preta em um horário (ex.: das 23h às 6h).
- **Só lê o site.** Não envia nenhum dado sobre o computador ou sobre quem está diante da tela.
  Com a rádio UNIFM ligada, também recebe o áudio do servidor da transmissão
  (`stream3.svrdedicado.org`), como qualquer player da rádio.

## Instalação

| Sistema | Arquivo | Como instalar |
|---|---|---|
| **Windows 10 / 11** (64 bits) | [`Destaques-UFSM-Setup.exe`](https://github.com/danielcarli/Totem-UFSM-noticias/releases/latest/download/Destaques-UFSM-Setup.exe) | Dê dois cliques e siga o assistente. Não precisa de administrador. |
| Windows, sem instalar | [`Destaques-UFSM-win-x64.zip`](https://github.com/danielcarli/Totem-UFSM-noticias/releases/latest/download/Destaques-UFSM-win-x64.zip) | Descompacte e abra `DestaquesUFSM.exe`. |
| **Debian, Ubuntu, Linux Mint** | [`destaques-ufsm_amd64.deb`](https://github.com/danielcarli/Totem-UFSM-noticias/releases/latest/download/destaques-ufsm_amd64.deb) | `sudo apt install ./destaques-ufsm_amd64.deb` |
| **Fedora, RHEL, openSUSE** | [`destaques-ufsm.x86_64.rpm`](https://github.com/danielcarli/Totem-UFSM-noticias/releases/latest/download/destaques-ufsm.x86_64.rpm) | `sudo dnf install ./destaques-ufsm.x86_64.rpm` |
| Qualquer Linux, sem instalar | [`Destaques-UFSM-x86_64.AppImage`](https://github.com/danielcarli/Totem-UFSM-noticias/releases/latest/download/Destaques-UFSM-x86_64.AppImage) | `chmod +x Destaques-UFSM-x86_64.AppImage` e abra o arquivo. |

Para atualizar, baixe e instale a versão nova por cima da anterior: as configurações e a
abertura automática são mantidas.

### Instalador do Windows

Assistente em português, com licença, escolha da pasta e, na última tela, a opção de abrir o
painel sozinho sempre que o Windows iniciar, para TVs e totens. Cria atalhos na área de trabalho
e no menu Iniciar; para remover, use **Configurações › Aplicativos › Destaques UFSM**.

<table>
  <tr>
    <td><img src="docs/instalador-1-boas-vindas.png" alt="Boas-vindas" width="400"></td>
    <td><img src="docs/instalador-2-licenca.png" alt="Licença" width="400"></td>
  </tr>
  <tr>
    <td><img src="docs/instalador-3-pasta.png" alt="Pasta de instalação" width="400"></td>
    <td><img src="docs/instalador-4-concluir.png" alt="Conclusão com a opção de abrir ao entrar no Windows" width="400"></td>
  </tr>
</table>

> Os instaladores ainda não têm assinatura digital. Na primeira vez, o Windows pode mostrar
> "O Windows protegeu o computador": clique em **Mais informações › Executar assim mesmo**.

## TV ou totem funcionando sozinho

1. **Abrir sozinho.** No Windows, marque a opção na última tela do instalador. No Linux, rode uma
   vez (sem `sudo`), como o usuário que fica logado na TV:
   ```bash
   destaques-ufsm --iniciar-com-sistema --password-store=basic
   ```
   O `--password-store=basic` evita a janela "Desbloquear chaveiro" quando o login é automático.
2. **Login automático** do usuário, sem pedir senha. Linux Mint/Ubuntu: Menu › Administração ›
   Janela de início de sessão › Usuários › Login automático. Windows: `netplwiz`.
3. **Tela que não apaga.** O painel já impede o descanso de tela, mas desligue também a proteção
   de tela e o bloqueio nas configurações de energia.
4. **Volta após falta de luz.** Na BIOS, ajuste "Restore on AC Power Loss" para **Power On**.

## Configurações

Tudo o que muda de uma TV para outra — de onde vêm as notícias, quantas de cada site, o nome da
TV e o monitor — é ajustado na própria tela, sem editar arquivos nem atalhos. A configuração fica
guardada no computador da TV (na versão para navegador, no próprio navegador) e continua valendo
depois de fechar o painel, reiniciar o computador ou atualizar o programa.

### Como abrir

Clique na **engrenagem** ao lado do relógio, no canto superior direito, ou pressione a tecla **C**.
A engrenagem fica semitransparente para não chamar atenção de quem está só lendo as notícias.

<img src="docs/config-engrenagem.jpg" alt="Engrenagem das configurações ao lado do relógio" width="420">

Enquanto a tela de configurações está aberta, o carrossel para e as teclas servem só para os
campos (as teclas 1, 2 e 3 não trocam de monitor, por exemplo). **Esc**, **Cancelar** ou o **×**
fecham sem mudar nada.

<img src="docs/configuracoes.jpg" alt="Tela de configurações do painel" width="700">

### Esta TV

<img src="docs/config-tv-monitor.jpg" alt="Nome da TV, monitor e tempo de cada notícia" width="700">

- **Monitor atual.** O quadrado laranja no topo mostra em qual monitor o painel está aberto
  (ex.: *Monitor 2 de 2*) e a resolução dele. Aparece sempre no aplicativo, mesmo com um monitor só.
- **Nome ou local desta TV.** Identifica a TV nas estatísticas do QR code: o nome vira o
  `utm_campaign` do endereço (ex.: *Hall do Centro de Tecnologia* → `hall-do-centro-de-tecnologia`).
  No Google Analytics do portal dá para ver quantas leituras vieram de cada painel. Em branco, fica `ufsm`.
- **Monitor em que o painel aparece.** Só aparece no aplicativo, quando o computador tem mais de
  um monitor. A escolha é lembrada nas próximas vezes que o painel abrir. As teclas **1**, **2** e
  **3** fazem o mesmo fora da tela de configurações.
- **Tempo de cada notícia na tela.** Quantos segundos cada notícia fica no centro antes de passar
  para a próxima — de 4 a 60, padrão 7. Vale também para a barra de progresso e para a animação
  dos banners largos. Se o atalho do painel tiver a opção `--intervalo`, o campo fica travado e
  vale o valor da opção.

### Rádio UNIFM 107,9

O painel pode tocar ao vivo a [UNIFM 107,9](https://www.ufsm.br/orgaos-suplementares/radio), a
rádio da UFSM. **Vem desligado**: marque *Mostrar o player da rádio no painel* e salve.

<img src="docs/config-radio.jpg" alt="Configurações da rádio UNIFM" width="700">

- **Começar a tocar sozinha quando o painel abrir** — para TVs e totens sem ninguém por perto.
  No aplicativo, a rádio começa sozinha. No navegador, que só libera som depois de um toque, o
  player pisca *Toque para ouvir* até o primeiro toque ou tecla — no Chrome ou Edge em modo
  quiosque, a opção `--autoplay-policy=no-user-gesture-required` libera o som automático.
- **Volume** — muda na hora enquanto arrasta, para testar no som da TV (Cancelar desfaz).

O player fica na lateral direita, no mesmo estilo de vidro do painel, com a marca da UNIFM
(versão negativa, branca) e o laranja da marca no equalizador. No totem (vertical), vira uma
faixa no topo, entre a marca da UFSM e o relógio. Sem ninguém mexendo no mouse, ele fica
semitransparente.

<img src="docs/radio-lateral.jpg" alt="Player da rádio UNIFM na lateral direita do painel" width="340">
<img src="docs/radio-totem.jpg" alt="Player da rádio UNIFM no topo do totem" width="540">

- **▶ / ❚❚** liga e pausa (ou a tecla **M**); o alto-falante tira e devolve o som.
- *Ao vivo* com o equalizador mexendo = tocando. *Conectando* ou *Reconectando* = buscando a
  transmissão. Se a internet ou a transmissão cair, o player tenta de novo sozinho (em 3 s,
  6 s, 12 s… até 1 minuto entre as tentativas).
- No horário noturno (`--noite`), a rádio também para, e volta de manhã.
- Ao pausar, a transmissão é desligada (não fica baixando áudio). Ao voltar, entra de novo no ao
  vivo.

### De onde vêm as notícias

Cada site tem uma caixa para marcar e, ao lado, quantas matérias com foto dele entram no
carrossel (de 1 a 30). O símbolo ao lado de cada nome é o mesmo que aparece nos cards.

<img src="docs/config-sites.jpg" alt="Lista de sites: diretorias, unidades de ensino e campi" width="700">

| Grupo | Sites | Símbolo |
|---|---|---|
| Portal da UFSM | Agência de Notícias UFSM – Portal Institucional (**marcado por padrão, 12 notícias**) | Agência de Notícias |
| Reitoria e pró-reitorias | Gabinete da Reitoria, PROGRAD, PRPGP, PRE, PRAE, PROGEP, PROPLAN, PRA, PROINFRA, PROINOVA | brasão da UFSM em linhas |
| Diretorias | DTI, DRI | brasão da UFSM em linhas |
| Unidades de ensino | CAL, CCNE, CCR, CCS, CCSH, CE, CEFD, CT, CTISM, Colégio Politécnico | símbolo de cada unidade |
| Campi | UFSM-CS (Cachoeira do Sul), UFSM-FW (Frederico Westphalen), UFSM-PM (Palmeira das Missões) | brasão da UFSM em linhas |
| Mídias da UFSM | Rádios da UFSM, TV Campus, Revista .TXT | brasão da UFSM em linhas |

**TV Campus:** entram primeiro os vídeos do YouTube em destaque na página inicial do site (TV
Campus Entrevista, TVC…), na ordem em que aparecem lá. O título vem do próprio YouTube, a editoria
é o programa e a capa do vídeo aparece como a foto das matérias; o QR code abre o vídeo no
celular. Esses vídeos não têm data, então valem enquanto estiverem na página inicial. Depois vêm
as matérias recentes do site — as que só têm vídeo também entram com a capa do YouTube.

Como as notícias são escolhidas:

- **Portal:** primeiro as notícias da página principal de ufsm.br (banners do topo, Destaques,
  Divulga Ciência…); se forem menos que a quantidade marcada, completa com as últimas matérias do portal.
- **Demais sites:** as últimas matérias com foto publicadas em cada um.
- **Só notícia recente:** matérias com mais de 30 dias ficam de fora. Um site que não publica há
  mais de um mês não aparece no carrossel até publicar de novo — por isso o total pode ficar
  abaixo do que foi marcado.
- **Alternância:** as notícias dos sites se intercalam (portal, CT, campus, portal…), para variar
  ao longo da volta.
- **Sem repetição:** uma matéria publicada em dois sites com o mesmo título aparece uma vez só.
- **Site sem nada recente:** depois de uma busca, os sites marcados que não trouxeram matéria
  aparecem com o aviso *sem matérias com foto nos últimos 30 dias* (ou *não respondeu*). Se
  nenhum dos sites escolhidos tiver matéria recente e o portal estiver desmarcado, o painel mostra
  as notícias do portal para a tela não ficar vazia, e avisa no topo.

### Salvar

<img src="docs/config-rodape.jpg" alt="Total de sites e notícias, e botões da tela de configurações" width="700">

O rodapé mostra quantos sites estão marcados, quantas notícias **no máximo** entram no carrossel
e quanto tempo leva uma volta completa, com o tempo escolhido para cada notícia. É preciso marcar
pelo menos um site.

- **Salvar e aplicar** guarda a configuração e já busca as notícias de novo, sem reiniciar o painel.
- **Restaurar padrão** volta ao portal com 12 notícias e apaga o nome da TV (só vale depois de salvar).
- **Cancelar** fecha sem mudar nada.

### Resultado

Abaixo do título de cada matéria aparece o site de onde ela vem, com sigla, nome completo e o
símbolo da unidade:

<img src="docs/tela-subsite.jpg" alt="Matéria do campus de Frederico Westphalen no painel" width="760">

> As opções `--quantidade`, `--sites`, `--porsite`, `--local` e `--intervalo` (veja [Opções](#opções)) valem por
> cima do que foi salvo na tela de configurações — úteis para configurar várias TVs pelo atalho.

## Uso

### Atalhos

| Tecla | Ação |
|---|---|
| ← / → | notícia anterior / próxima |
| Espaço | pausa / continua |
| R | busca as notícias agora |
| C | tela de configurações |
| M | liga / pausa a rádio UNIFM (quando o player está ligado) |
| 1 / 2 / 3 | leva o painel para o monitor 1, 2 ou 3 (da esquerda para a direita) e lembra a escolha |
| F11 / Esc | entra / sai da tela cheia |
| Ctrl+R | recarrega o painel |
| Ctrl+Q | fecha o aplicativo |

Em telas de toque, deslize o dedo para os lados para trocar de notícia.

### Opções

Acrescente ao atalho (Windows, campo "Destino") ou ao comando (Linux):

| Opção | O que faz |
|---|---|
| `--monitor=2` | abre no segundo monitor só desta vez (para fixar, use as teclas 1, 2, 3) |
| `--intervalo=10` | segundos por notícia (padrão 7). Também na tela de configurações |
| `--atualizacao=10` | minutos entre as leituras do portal (padrão 15) |
| `--quantidade=12` | notícias do portal (padrão 12; se a página principal tiver menos, completa com as últimas matérias do portal). Também na tela de configurações |
| `--sites=unidades-universitarias/ct,pro-reitorias/prograd` | inclui as últimas matérias desses subsites (5 de cada; `--porsite=10` muda). O mais simples é marcar na tela de configurações |
| `--max=30` | número máximo de notícias |
| `--dias=30` | idade máxima das matérias, em dias (padrão 30) |
| `--secoes=Destaques,JAI` | mostra só estas áreas da página principal |
| `--ignorar="Em destaque"` | tira áreas (ex.: os banners do topo) |
| `--orientacao=vertical` | força o layout de totem (normalmente é automático) |
| `--leve=1` | sem efeitos de desfoque, para computadores mais fracos |
| `--noite=23-6` | tela preta das 23h às 6h |
| `--local=ct` | nome desta TV, para medir as leituras do QR code (`utm_campaign`). Também na tela de configurações |
| `--sem-atualizacao` | não procura versões novas |
| `--iniciar-com-sistema` | passa a abrir sozinho ao entrar no computador (guarda as outras opções) |
| `--nao-iniciar-com-sistema` | desfaz a opção acima |

Exemplo no Windows: `"%LOCALAPPDATA%\Programs\DestaquesUFSM\DestaquesUFSM.exe" --intervalo=8`

### Versão para navegador

[`destaques-ufsm.html`](navegador/destaques-ufsm.html) é o mesmo painel em um único arquivo, para abrir em qualquer navegador
(Chrome ou Edge em modo quiosque, por exemplo). As opções vão no endereço:
`destaques-ufsm.html?intervalo=10&orientacao=vertical`. A troca de monitor pelas teclas 1, 2 e 3
existe só no aplicativo.

## Como funciona

```
 www.ufsm.br ──(API pública do WordPress, a cada 15 min)──▶ painel (HTML + JavaScript)
                                                             │
                     lê a página principal, encontra as matérias com foto,
                     escolhe a melhor imagem e monta o carrossel
                     (poucas notícias? plano B: últimas matérias pela API)
                                                             │
                                                             ▼
                          aplicativo Electron: tela cheia, tela sempre acesa,
                          abrir com o sistema, monitores, recuperação automática,
                          atualização automática pelas Releases do GitHub
```

O painel é uma página HTML + JavaScript que roda no próprio computador da TV. Ele lê a página
principal do portal pela API pública do WordPress da UFSM, identifica as matérias com foto
(endereços no formato `/AAAA/MM/DD/titulo`), escolhe a melhor imagem de cada uma e monta o
carrossel. O aplicativo para Windows e Linux é feito com [Electron](https://www.electronjs.org):
ele abre essa página em tela cheia e cuida do que um navegador comum não faz sozinho.

### Teste diário do portal

O painel depende do layout da página principal do portal. Todo dia às 7h17, o GitHub Actions
([`.github/workflows/portal.yml`](.github/workflows/portal.yml)) abre o painel contra o site real e
confere se ele encontra pelo menos 5 notícias, todas com título, foto e site de origem — e se o
plano B pela API também funciona. Se algo falhar, a execução fica vermelha e o GitHub avisa por
e-mail; o resumo de cada execução lista as notícias encontradas. Para rodar à mão:
**Actions › Teste do portal › Run workflow**, ou, no computador, `npm run teste:portal`
(precisa do [Playwright](https://playwright.dev): `cd testes && npm install --no-save playwright`
e `npx playwright install chromium`).

## Desenvolvimento

Requisitos: [Node.js LTS](https://nodejs.org) e [Git](https://git-scm.com).

```bash
git clone https://github.com/danielcarli/Totem-UFSM-noticias.git
cd Totem-UFSM-noticias
npm install
npm start            # abre o painel
npm run painel       # gera app/index.html e navegador/destaques-ufsm.html a partir de painel/
npm run teste:portal # testa o painel contra o portal real (veja "Teste diário do portal")
npm run dist:win     # instalador (Setup.exe) e versão portátil (.zip) do Windows
npm run dist:linux   # .deb, .rpm e AppImage
npm run dist         # todos
```

Os arquivos ficam em `dist/`, já com os nomes usados nos links de [Download](#download).
Os instaladores são gerados com [electron-builder](https://www.electron.build) (no Windows, com
o NSIS). Para gerar o `.rpm` é
preciso o `rpmbuild` (pacote `rpm`); para gerar o instalador do Windows a partir do Linux, o
`wine`.

### Estrutura do projeto

O painel é editado em **`painel/template.html`**. Depois de mudar o template ou as marcas,
rode `npm run painel` (os comandos `dist` já fazem isso).

```
painel/template.html   o painel: HTML, CSS e JavaScript (é aqui que se edita)
painel/marcas/         marcas da UFSM, da Coordenadoria e da Agência usadas no painel
painel/marcas/origens/ símbolos das unidades ao lado do site de origem (branco sobre transparente)
scripts/               geração do painel a partir do template e publicação no GitHub
main.js                aplicativo Electron (janela, atalhos, opções, monitores, abrir com o sistema)
app/index.html         o painel gerado para o aplicativo (fontes e QR code locais)
navegador/             o painel gerado em arquivo único, para navegador
app/fontes/            fonte Barlow
app/vendor/            gerador de QR code
build/                 ícones, licença e personalização do instalador do Windows
docs/                  imagens deste README
testes/                teste do painel contra o portal real
LEIA-ME.txt            instruções que acompanham os instaladores
.github/workflows/     geração e publicação automática dos instaladores
```

### Publicar uma versão

1. Descreva as novidades na tabela de [Versões](#versões).
2. Rode o script de publicação, na pasta do projeto:

   ```bash
   npm run publicar -- 1.7.1     # ou: patch (1.7.0 → 1.7.1), minor (→ 1.8.0), major (→ 2.0.0)
   ```

   No Windows também dá para dar dois cliques em **`publicar.cmd`** (publica a versão que está
   no `package.json`). O script:
   - liga a pasta ao repositório do GitHub, se ela veio de um `.zip` e ainda não é um repositório Git;
   - confere se a versão ainda não foi publicada e se o GitHub não tem mudanças que faltam aqui;
   - atualiza a versão no `package.json`, no `package-lock.json` e no selo do README;
   - gera o painel (`npm run painel`);
   - mostra os arquivos que mudaram e pergunta antes de enviar;
   - envia o código e a tag `v1.7.1`.

   Opções: `--teste` (só mostra o que faria), `--sem-tag` (envia o código sem gerar instaladores),
   `--mensagem "texto"` (mensagem do commit) e `--sim` (não pergunta). Precisa do
   [Git](https://git-scm.com); na primeira vez, o Git pede o login do GitHub.
3. A tag dispara o GitHub Actions ([`.github/workflows/release.yml`](.github/workflows/release.yml)),
   que gera os instaladores de Windows e Linux e os publica na release da versão em uns 10 a
   15 minutos. Os links de [Download](#download) passam a apontar para ela, e os painéis já
   instalados se atualizam sozinhos (pelos arquivos `latest.yml` e `latest-linux.yml` da release).

Também dá para publicar à mão: `git tag v1.7.0 && git push origin v1.7.0` depois de enviar o
código, ou gerar com `npm run dist` e criar a release em
[Releases](https://github.com/danielcarli/Totem-UFSM-noticias/releases/new), anexando os arquivos
de `dist/` e o `navegador/destaques-ufsm.html`, com os mesmos nomes.

## Versões

| Versão | Novidades |
|---|---|
| **1.7.0** | Tela de configurações (engrenagem ao lado do relógio ou tecla C): de onde vêm as notícias — portal com 12 por padrão e, se quiser, Gabinete da Reitoria, pró-reitorias, diretorias (DTI e DRI), unidades de ensino e campi, com a quantidade de cada um —, nome da TV, monitor (com o número do monitor atual) e tempo de cada notícia na tela; player da rádio UNIFM 107,9 ao vivo (desligado por padrão, tecla M); notícias das mídias da UFSM (Rádios, TV Campus, Revista .TXT), com os vídeos em destaque da TV Campus (título e capa do YouTube); quando os sites escolhidos não têm nada recente, mostra o portal em vez da tela vazia; símbolo da unidade ao lado do site de origem (Agência de Notícias, centros e colégios; brasão da UFSM em linhas para os demais); matérias com mais de 30 dias ficam de fora (`--dias`); origem do portal como "Agência de Notícias UFSM - Portal Institucional"; versão do painel discreta no rodapé; script `npm run publicar` para publicar no GitHub. |
| **1.5.0** | Atualização automática pelas Releases do GitHub (instala de madrugada e reabre com as mesmas opções); site de origem abaixo do título de cada matéria; carrossel com 30 notícias (completa com as últimas matérias do portal); leituras do QR code medidas no Google Analytics (`--local`); plano B pela API do WordPress quando a página principal muda de layout; teste diário contra o portal no GitHub Actions. |
| **1.4.4** | Notícias com GIF animado como imagem de destaque (ex.: "Lembre bem") também aparecem, com a animação no card; nesses casos o fundo desfocado não usa o GIF, para não pesar na placa de vídeo. |
| **1.4.3** | Corrige imagens piscando nas transições depois de várias trocas seguidas pelo teclado: o fundo desfocado troca sem piscar, os cards fora da tela deixam de ocupar a placa de vídeo (cerca de 1/3 menos área desenhada) e o card que chega ao centro só passa à frente quando cruza o anterior. |
| **1.4.2** | O título da matéria fica sempre embaixo da imagem: saiu a troca de posição com as setas ↑/↓ (e a opção `--layout`). |
| **1.4.1** | Banners do carrossel do topo que levam a uma página ou site (ex.: Descubra UFSM), e não a uma matéria, também entram no painel; correção da geração automática no Windows (GitHub Actions). |
| **1.4.0** | Instalador assistido para Windows (com opção de abrir ao iniciar) e pacotes `.deb`, `.rpm` e AppImage para Linux; teclas 1, 2 e 3 para trocar de monitor, com memória da escolha; hora da última atualização só no rodapé; licença GNU GPL 3. |
| **1.3.0** | Marca da UFSM no topo; Coordenadoria de Comunicação e Agência de Notícias no rodapé; card de notícia sem foto com mais contraste. |
| **1.2.0** | Layout para totem vertical, QR code maior, toque na tela, modo noite, recarga diária, instalador `.deb`. |

## Sugestões por fazer

Ideias para as próximas versões (contribuições são bem-vindas):

- [ ] **Siglas oficiais** do Gabinete da Reitoria e do Colégio Politécnico, se existirem, ao lado do nome.
- [ ] **Avisos urgentes**: uma mensagem institucional que ocupa a tela em todas as TVs (suspensão de aulas, alerta climático, mudança de horário).
- [ ] **Configuração central**: ajustar todas as TVs de um lugar só, sem ir até cada computador.
- [ ] **Painel de funcionamento**: cada TV informa que está ligada e mostrando notícias; aviso quando alguma parar.
- [ ] **Agenda de eventos** da UFSM e **cardápio do RU** entre as notícias.
- [ ] **Previsão do tempo** de Santa Maria (e dos campi) no topo.
- [ ] **Ligar e desligar a TV** por horário (HDMI-CEC), além da tela preta do modo noite.
- [ ] **Fotos guardadas no computador**, para continuar mostrando as notícias com a internet fora por mais tempo.
- [ ] **Vídeos** como destaque, quando a matéria tiver vídeo em vez de foto.
- [ ] **Instalador do Windows assinado** com certificado da UFSM, para o Windows não mostrar o aviso de "editor desconhecido".

## Créditos

Idealizado por **Daniel Michelon De Carli**, para a Agência de Notícias UFSM / Coordenadoria de
Comunicação da UFSM.

Encontrou um problema ou tem uma sugestão? Abra uma [issue](https://github.com/danielcarli/Totem-UFSM-noticias/issues).

## Licença

Copyright © 2026 UFSM — Coordenadoria de Comunicação / Agência de Notícias UFSM.

Este programa é software livre, distribuído sob a **GNU General Public License, versão 3** ou
(a seu critério) qualquer versão posterior. Veja o arquivo [LICENSE](LICENSE).

As marcas da UFSM, da Coordenadoria de Comunicação e da Agência de Notícias **não** são cobertas
por essa licença: pertencem à UFSM e só podem ser usadas conforme o manual de identidade visual
da instituição. As notícias e fotos exibidas pertencem aos seus autores e à UFSM.

Componentes de terceiros: Electron (MIT), Chromium (BSD e outras), fonte Barlow
(SIL Open Font License 1.1) e qrcode-generator (MIT).
