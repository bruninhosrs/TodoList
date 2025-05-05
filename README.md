# TodoList Avançado

Este é um projeto de **lista de tarefas (TodoList)** desenvolvido para treinar **HTML, CSS e JavaScript** com funcionalidades avançadas, incluindo **edição, remoção, marcação como concluída, busca e filtros**. Você pode testar o projeto aqui 👉 [TodoList - Deploy](https://bruninhosrs.github.io/TodoList/)

---

## 🚀 Funcionalidades
- ✅ **Adicionar Tarefas:** Insira novas tarefas rapidamente.
- ✏️ **Editar Tarefas:** Altere o texto de uma tarefa já criada.
- ✅ **Marcar como Concluída:** Clique para finalizar uma tarefa.
- ❌ **Excluir Tarefas:** Remova itens da lista.
- 🔍 **Pesquisar Tarefas:** Filtre por nome utilizando a barra de pesquisa.
- 📂 **Filtrar Tarefas:** Selecione para exibir **todas**, apenas as **concluídas** ou as **pendentes**.
- 💾 **Persistência Local:** As tarefas são **armazenadas no Local Storage**, permanecendo salvas mesmo após atualizar ou fechar o navegador.

---

## 🛠 Tecnologias Utilizadas
- **HTML5:** Estrutura semântica da página e formulários.
- **CSS3:** Estilização com foco em responsividade e efeitos visuais (hover, transições).  
  ✨ Utilização de **Flexbox** e **classes dinâmicas** para mudança de estado das tarefas.
- **JavaScript Puro (Vanilla JS):** Manipulação completa do DOM e controle das tarefas, com:
  - Eventos (`addEventListener`)
  - Manipulação de classes (`classList.add/remove/toggle`)
  - Local Storage para persistência dos dados
  - Filtros e busca dinâmica em tempo real

- **Font Awesome:** Ícones para os botões de ação (adicionar, editar, concluir, excluir).

---

## 📂 Estrutura dos Arquivos
- `index.html`: Estrutura da página e containers para a lista de tarefas.
- `style.css`: Estilos para layout, botões, formulários e interação visual.
- `script.js`: Toda a lógica da aplicação, incluindo **adição, edição, remoção, busca e filtros**, além da integração com o **Local Storage**.

---

## 💡 Destaque Técnico
Este projeto faz uso de **manipulação dinâmica do DOM**, criando elementos diretamente pelo JavaScript e atribuindo eventos aos botões de forma dinâmica. Além disso:
- Implementa **edição inline de tarefas** com formulários alternáveis.
- Controla **exibição de elementos** via classes CSS como `.hide` e `.done`.
- Utiliza **localStorage** para salvar e recuperar os dados, garantindo que as tarefas permaneçam mesmo após atualizar a página.
