; Destaques UFSM — instalador assistido para Windows (electron-builder + NSIS), no estilo do LionPhotos.
; Agência de Notícias / Coordenadoria de Comunicação UFSM.
; As páginas padrão do assistente são traduzidas pelo próprio NSIS ("installerLanguages": pt_BR).

; ---- boas-vindas
!macro customWelcomePage
  !define MUI_WELCOMEPAGE_TITLE "Destaques UFSM$\r$\npainel de notícias para TV e totem"
  !define MUI_WELCOMEPAGE_TITLE_3LINES
  !define MUI_WELCOMEPAGE_TEXT "Mostra em tela cheia as notícias com foto da página principal da UFSM, em carrossel, na TV ou no totem (na horizontal ou na vertical). O conteúdo é atualizado sozinho a cada 15 minutos.$\r$\n$\r$\nIdealizado por Daniel Michelon De Carli para a Agência de Notícias UFSM / Coordenadoria de Comunicação.$\r$\n$\r$\nEste assistente vai instalar o Destaques UFSM neste computador. Não são necessários direitos de administrador.$\r$\n$\r$\nClique em Próximo para continuar."
  !insertmacro MUI_PAGE_WELCOME
!macroend

; ---- conclusão: abrir agora + abrir sozinho ao entrar no Windows (para TVs e totens)
!macro customFinishPage
  Function StartApp
    ${if} ${isUpdated}
      StrCpy $1 "--updated"
    ${else}
      StrCpy $1 ""
    ${endif}
    ${StdUtils.ExecShellAsUser} $0 "$launchLink" "open" "$1"
  FunctionEnd

  Function LigaInicioAutomatico
    WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Run" "DestaquesUFSM" '"$INSTDIR\${APP_EXECUTABLE_FILENAME}"'
  FunctionEnd

  !define MUI_FINISHPAGE_RUN
  !define MUI_FINISHPAGE_RUN_TEXT "Abrir o Destaques UFSM agora"
  !define MUI_FINISHPAGE_RUN_FUNCTION "StartApp"
  !define MUI_FINISHPAGE_SHOWREADME
  !define MUI_FINISHPAGE_SHOWREADME_TEXT "Abrir sozinho ao entrar no Windows (TV ou totem)"
  !define MUI_FINISHPAGE_SHOWREADME_NOTCHECKED
  !define MUI_FINISHPAGE_SHOWREADME_FUNCTION "LigaInicioAutomatico"
  !insertmacro MUI_PAGE_FINISH
!macroend

; ---- desinstalar: tira também a abertura automática (numa atualização ela é mantida)
!macro customUnInstall
  ${ifNot} ${isUpdated}
    DeleteRegValue HKCU "Software\Microsoft\Windows\CurrentVersion\Run" "DestaquesUFSM"
  ${endIf}
!macroend
