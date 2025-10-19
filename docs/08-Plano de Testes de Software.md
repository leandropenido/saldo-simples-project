# Plano de Testes de Software

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>

Apresente os cenários de testes utilizados na realização dos testes da sua aplicação. Escolha cenários de testes que demonstrem os requisitos sendo satisfeitos.

Não deixe de enumerar os casos de teste de forma sequencial e de garantir que o(s) requisito(s) associado(s) a cada um deles está(ão) correto(s) - de acordo com o que foi definido na seção "2 - Especificação do Projeto". 

Por exemplo:
 
| **Caso de Teste** 	| **CT01 – Cadastrar novo usuário** 	|
|:---:	|:---:	|
|	Requisito Associado 	| RF-01 - 	Permitir o cadastro de receitas e despesas, com valor, data, descrição e categoria. |
| Objetivo do Teste 	| Verificar se o usuário consegue se registrar com e-mail e senha. |
| Passos 	| - Abrir app → “Criar Conta”  <br> - Informar nome, e-mail e senha <br> - Confirmar registro <br> - Aceitar os termos de uso <br> - Clicar em "Registrar" |
|Critério de Êxito | - Mensagem de sucesso e acesso à tela inicial. |
|  	|  	|

| **Caso de Teste** 	| **CT02 – Realizar login** 	|
|:---:	|:---:	|
|	Requisito Associado 	| RF-01 - 	Permitir o cadastro de receitas e despesas, com valor, data, descrição e categoria. |
| Objetivo do Teste 	| Validar o login com credenciais válidas. |
| Passos 	| - Abrir app → “Entrar”   <br> - Inserir e-mail e senha <br> - Clicar em “Login” <br> |
|Critério de Êxito | - Mensagem de sucesso e acesso à tela inicial. |
|  	|  	|

| **Caso de Teste** 	| **CT03 – Recuperar senha** 	|
|:---:	|:---:	|
|	Requisito Associado 	| RF-01 - 	Permitir o cadastro de receitas e despesas, com valor, data, descrição e categoria.  |
| Objetivo do Teste 	| Verificar envio de e-mail de redefinição. |
| Passos 	| - Tela de login → “Esqueci minha senha”  <br> - Inserir e-mail válido <br> - Confirmar <br>  |
|Critério de Êxito | - E-mail de redefinição recebido. |
|  	|  	|


| **Caso de Teste** 	| **CT04 – Registrar despesa** 	|
|:---:	|:---:	|
|	Requisito Associado 	| RF-01 - 	Permitir o cadastro de receitas e despesas, com valor, data, descrição e categoria. <br> RF-02 - Classificar despesas como recorrentes ou variáveis.|
| Objetivo do Teste 	| Verificar se o usuário consegue se registrar com e-mail e senha. |
| Passos 	| - Abrir app → “Criar Conta”  <br> - Informar nome, e-mail e senha <br> - Confirmar registro <br> - Aceitar os termos de uso <br> - Clicar em "Registrar" |
|Critério de Êxito | - Mensagem de sucesso e acesso à tela inicial. |
|  	|  	|


 
> **Links Úteis**:
> - [IBM - Criação e Geração de Planos de Teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Práticas e Técnicas de Testes Ágeis](http://assiste.serpro.gov.br/serproagil/Apresenta/slides.pdf)
> -  [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e Geração de Planos de Teste de Software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)
