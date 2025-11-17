# Plano de Testes de Usabilidade

Os testes de usabilidade permitem avaliar a qualidade da interface com o usuário da aplicação interativa.

Um plano de teste de usabilidade deverá conter: 

## Definição do(s) objetivo(s)

Os testes de usabilidade têm como finalidade avaliar a experiência real dos usuários ao interagir com as principais funcionalidades do app. Os objetivos principais são:

 - Verificar se usuários conseguem realizar tarefas essenciais (cadastro de receitas/despesas, consulta de saldo, visualização de relatórios).
 - Identificar barreiras na navegação, incluindo dificuldade de localizar funções ou compreender elementos da interface.
 - Avaliar eficiência e fluidez das interações, considerando tempo, número de erros e necessidade de auxílio.
 - Avaliar clareza e entendimento dos elementos visuais, considerando o perfil de usuários com pouca familiaridade tecnológica
 - Identificar pontos de frustração ou confusão durante o fluxo geral.
 - Validar se o sistema atende às expectativas das personas descritas no projeto.
 - Avaliar acessibilidade básica, como tamanho de fonte, contraste e facilidade de leitura.

## Seleção dos participantes

**Critérios de Seleção**

 - Pessoas com diferentes níveis de familiaridade com tecnologia.
 - Usuários com perfis compatíveis com as 5 personas ( Estudante, Assistente administrativa, Motorista de aplicativo, Dona de casa, Freelancer )
 - Pessoas que já utilizam apps financeiros e pessoas que nunca utilizaram.
 - Usuários com idade entre 18 e 65 anos.

## Definição de cenários de teste

**Cenário 1** – Registrar uma despesa no aplicativo
**Objetivo:** Avaliar se o usuário consegue registrar uma despesa de forma rápida, clara e intuitiva.
**Contexto:** O usuário está no supermercado e deseja registrar imediatamente uma compra de R$ 85,00.
**Tarefa(s):**
 - Abrir o aplicativo Saldo Simples.
 - Acessar a tela Cadastro de Despesas.
 - Preencher valor, categoria, data e descrição.
 - Salvar a despesa.
**Critério(s) de Sucesso:**
 - Usuário encontra facilmente o botão “Cadastrar Despesa”.
 - Consegue preencher todos os campos sem dúvidas.
 - Registra a despesa em menos de 1 minuto.
 - Não requer auxílio do observador.

**Cenário 2** – Visualizar o saldo atualizado
**Objetivo:** Verificar se o usuário compreende rapidamente seu saldo disponível no início do uso diário.
**Contexto:** O usuário abre o app pela manhã e deseja saber quanto ainda pode gastar no dia/mês.
**Tarefa(s):**
 - Abrir o app.
 - Visualizar o saldo na tela inicial ou seção de resumo.
 - Interpretar se está positivo/negativo e entender o que significa.
**Critério(s) de Sucesso(s):**
 - O usuário consegue localizar o saldo sem clicar em múltiplas telas.
 - O saldo é compreendido sem explicações adicionais.
 - A interface é clara e não causa interpretação ambígua.

**Cenário 3** – Consultar relatório de gastos por categoria
**Objetivo** Avaliar a clareza dos gráficos e relatórios do aplicativo.
**Contexto** O usuário deseja entender em quais categorias gastou mais no mês.
**Tarefas**
 - Acessar a tela de relatórios.
 - Selecionar o período atual.
 - Interpretar o gráfico/relatório apresentado.
**Critérios de Sucesso**
 - Usuário encontra o menu de relatórios rapidamente.
 - Consegue compreender o gráfico sem instruções adicionais.
 - Identifica a categoria de maior gasto sem cometer erros.

**Cenário 4** – Definir um orçamento mensal por categoria
**Objetivo** Avaliar se o processo de estabelecimento de metas é simples e motivador.
**Contexto** O usuário deseja não gastar mais de R$ 300,00 com lazer no próximo mês.
**Tarefas**
 - Acessar o menu de orçamentos.
 - Criar ou editar orçamento para categoria “Lazer”.
 - Ajustar valor para R$ 300,00.
 - Salvar.
**Critérios de Sucesso**
 - Usuário encontra onde configurar orçamentos sem dificuldade.
- O processo leva no máximo 2 minutos.
 - Usuário entende o que ocorrerá quando ultrapassar o limite.


## Métodos de coleta de dados

Os dados coletados devem ajudar a entender a experiência dos usuários e os dados podem ser coletados por observação direta incluindo métricas quantitativas (quantidade de cliques, número de erros, tempo gasto para cada tarefa etc.), métricas qualitativas (dificuldades, comentários etc.) e questionários pós-teste (A interface foi fácil de entender? Você encontrou dificuldades em alguma etapa? O que poderia ser melhorado?)

Para cada voluntário do teste, é fundamental coletar e apresentar todos os dados/métricas previamente definidos, mas não se esqueça: atendendo à LGPD (Lei Geral de Proteção de Dados), nenhum dado sensível, que permita identificar o voluntário, deverá ser apresentado).

As referências abaixo irão auxiliá-lo na geração do artefato "Plano de Testes de Usabilidade".

> **Links Úteis**:
> - [Teste De Usabilidade: O Que É e Como Fazer Passo a Passo (neilpatel.com)](https://neilpatel.com/br/blog/teste-de-usabilidade/)
> - [Teste de usabilidade: tudo o que você precisa saber! | by Jon Vieira | Aela.io | Medium](https://medium.com/aela/teste-de-usabilidade-o-que-voc%C3%AA-precisa-saber-39a36343d9a6/)
> - [Planejando testes de usabilidade: o que (e o que não) fazer | iMasters](https://imasters.com.br/design-ux/planejando-testes-de-usabilidade-o-que-e-o-que-nao-fazer/)
> - [Ferramentas de Testes de Usabilidade](https://www.usability.gov/how-to-and-tools/resources/templates.html)
