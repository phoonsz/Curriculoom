# Curriculoom

Gerador de currículos com edição inline, múltiplos layouts e salvamento automático. Desenvolvido em HTML, CSS e JavaScript puro, com armazenamento local no navegador.

---

• **Edição direta** - Clique em qualquer texto e altere na hora. Campos vazios mostram dicas do que preencher.

• **Presets de layout** - Escolha entre modelos prontos (atualmente o Clássico, com mais a caminho). Cada preset mantém seu próprio conteúdo salvo.

• **Salvamento automático** - Todas as alterações ficam armazenadas no seu navegador. Feche e abra a página que seu currículo continua lá.

• **Exportação para PDF** - Gere um PDF com a formatação exata do que você vê na tela, perfeito para imprimir ou enviar.

• **Personalização visual** - Ajuste cores (destaque, fundo, textos) e fonte através de um painel simples. As preferências também são salvas.

• **Responsivo** - Funciona bem em celulares, tablets e desktops, sem comprometer o layout do currículo.

---

## Tecnologias utilizadas

• HTML5, CSS3 e JavaScript (vanilla)

• Armazenamento local (localStorage / storage API) para salvar dados

• CSS Grid e Flexbox para estrutura e responsividade

• Print CSS para exportação limpa em PDF

---

## Estrutura do projeto
curriculoom/
├── index.html # Estrutura da página
├── styles.css # Estilos e responsividade
├── script.js # Lógica de edição, presets e salvamento
└── README.md

---

## Como usar

1. Abra o arquivo `index.html` em qualquer navegador moderno.

2. Se o javasript estiver quebrado(Não aparecer um layout de currículo na tela, você pode modificar o código de importação do JS no index.html para <script src="script.js"></script> ou pode hostear o HTML em um servidor local com ‘python -m http.server‘ no terminal.

4. Na tela inicial, escolha um modelo de currículo (atualmente apenas o Clássico).
   
5. Clique sobre qualquer texto para editá-lo diretamente.

6. Use os botões **“+”** para adicionar novos itens (contatos, habilidades, experiências, etc.) e **“×”** para remover.

7. Personalize cores e fonte no botão **“Cores e fonte”** da toolbar.

8. Clique em **“Baixar PDF”** para exportar seu currículo.

9. Todas as alterações são salvas automaticamente. Ao reabrir a página, seu trabalho estará lá.

---

## Capturas de tela

_(em breve)_

---

## Licença

Este projeto pode ser usado, modificado e redistribuído gratuitamente. No entanto, nem este software nem versões modificadas podem ser vendidos ou redistribuídos comercialmente sem autorização explícita do detentor dos direitos autorais.

Consulte o arquivo [LICENSE](./LICENSE.md) para obter os termos completos da licença.

---

## Autor

Feito com 💙 por [phoonsz](https://github.com/phoonsz). Dúvidas, sugestões ou contribuições são sempre bem‑vindas!

[![phoon2much4zblock](https://github.com/user-attachments/assets/85edc0c6-c746-47c7-a690-8ac0614eae10)](https://github.com/phoonsz)
