<div align="center">

# Destaques UFSM

**Painel de notícias para TVs e totens da Universidade Federal de Santa Maria**

![Versão](https://img.shields.io/badge/vers%C3%A3o-1.5.0-0b5394)
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
- [Uso](#uso)
- [Como funciona](#como-funciona)
- [Desenvolvimento](#desenvolvimento)
- [Versões](#versões)
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
Agência de Notícias, que desenvolve o painel, assinam no rodapé, com a hora da última atualização.
Abaixo do título de cada matéria aparece o **site de onde ela vem**: o portal da UFSM é formado por
muitos subsites (pró-reitorias, centros, cursos), e as matérias da página principal são da
Agência — nelas aparece "Portal Institucional - Agência de Notícias da UFSM".

<img src="docs/detalhe-topo.jpg" alt="Topo do painel com a marca da UFSM" width="760">
<img src="docs/detalhe-rodape.jpg" alt="Rodapé com Coordenadoria de Comunicação e Agência de Notícias" width="560">

## Recursos

- **Notícias do portal, sempre atualizadas.** Lê a página principal de www.ufsm.br a cada
  15 minutos e mostra todas as notícias com foto: banners do topo, Destaques, Divulga Ciência e
  as demais áreas. Notícia nova entra sozinha; a que saiu do portal sai do painel. Se a página
  tiver menos de 30 notícias com foto, completa com as últimas matérias publicadas no portal.
- **Feito para ser visto de longe.** Títulos grandes, editoria, data e site de origem de cada
  matéria, e um QR code para continuar a leitura no celular.
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

## Uso

### Atalhos

| Tecla | Ação |
|---|---|
| ← / → | notícia anterior / próxima |
| Espaço | pausa / continua |
| R | busca as notícias agora |
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
| `--intervalo=10` | segundos por notícia (padrão 7) |
| `--atualizacao=10` | minutos entre as leituras do portal (padrão 15) |
| `--quantidade=30` | notícias no carrossel: se a página principal tiver menos, completa com as últimas matérias com foto do portal (padrão 30) |
| `--max=30` | número máximo de notícias |
| `--secoes=Destaques,JAI` | mostra só estas áreas da página principal |
| `--ignorar="Em destaque"` | tira áreas (ex.: os banners do topo) |
| `--orientacao=vertical` | força o layout de totem (normalmente é automático) |
| `--leve=1` | sem efeitos de desfoque, para computadores mais fracos |
| `--noite=23-6` | tela preta das 23h às 6h |
| `--local=ct` | nome do local do painel, para medir as leituras do QR code (`utm_campaign`) |
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
scripts/               geração do painel a partir do template
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

1. Atualize `"version"` no `package.json` e a tabela de [Versões](#versões).
2. Crie e envie a tag da versão: `git tag v1.5.0 && git push origin v1.5.0`.
3. O GitHub Actions ([`.github/workflows/release.yml`](.github/workflows/release.yml)) gera os
   instaladores de Windows e Linux e os publica na release da tag. Os links de
   [Download](#download) passam a apontar para ela, e os painéis já instalados se atualizam
   sozinhos (pelos arquivos `latest.yml` e `latest-linux.yml` da release).

Também dá para publicar à mão: gere com `npm run dist`, crie a release em
[Releases](https://github.com/danielcarli/Totem-UFSM-noticias/releases/new) e anexe os arquivos
de `dist/` e o `navegador/destaques-ufsm.html`, com os mesmos nomes.

## Versões

| Versão | Novidades |
|---|---|
| **1.5.0** | Atualização automática pelas Releases do GitHub (instala de madrugada e reabre com as mesmas opções); site de origem abaixo do título de cada matéria; carrossel com 30 notícias (completa com as últimas matérias do portal); leituras do QR code medidas no Google Analytics (`--local`); plano B pela API do WordPress quando a página principal muda de layout; teste diário contra o portal no GitHub Actions. |
| **1.4.4** | Notícias com GIF animado como imagem de destaque (ex.: "Lembre bem") também aparecem, com a animação no card; nesses casos o fundo desfocado não usa o GIF, para não pesar na placa de vídeo. |
| **1.4.3** | Corrige imagens piscando nas transições depois de várias trocas seguidas pelo teclado: o fundo desfocado troca sem piscar, os cards fora da tela deixam de ocupar a placa de vídeo (cerca de 1/3 menos área desenhada) e o card que chega ao centro só passa à frente quando cruza o anterior. |
| **1.4.2** | O título da matéria fica sempre embaixo da imagem: saiu a troca de posição com as setas ↑/↓ (e a opção `--layout`). |
| **1.4.1** | Banners do carrossel do topo que levam a uma página ou site (ex.: Descubra UFSM), e não a uma matéria, também entram no painel; correção da geração automática no Windows (GitHub Actions). |
| **1.4.0** | Instalador assistido para Windows (com opção de abrir ao iniciar) e pacotes `.deb`, `.rpm` e AppImage para Linux; teclas 1, 2 e 3 para trocar de monitor, com memória da escolha; hora da última atualização só no rodapé; licença GNU GPL 3. |
| **1.3.0** | Marca da UFSM no topo; Coordenadoria de Comunicação e Agência de Notícias no rodapé; card de notícia sem foto com mais contraste. |
| **1.2.0** | Layout para totem vertical, QR code maior, toque na tela, modo noite, recarga diária, instalador `.deb`. |

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
