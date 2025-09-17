## Arquitetura do Projeto

**Routes**: Responsável por mapear a URL que para um ação.<br/>

**Controllers**: responsável APENAS por pegar os dados da requisição e passar pra outra função do projeto que realmente sabe o que fazer com eles, que seria então, os Services. <br/>

**Services**: Contem a regra de negócio, ele recebe os dados do controller, processa e devolve um resultado. <br/>
Exemplo de regra de negócio: Encryptar a senha, verificar se email já existe, e entre outros. <br/>
Ponto de atenção: Não é responsável por acessar o banco de dados. <br/>

**Middlewares**: Responsáveis pela autenticação e verificação dos dados, utilizar o zod para manter os dados sempre limpos, responsável também por validar o JWT token do usuário, antes de fazer um sign-in por exemplo.<br/>

**Repositories**: Responsável pela conexão do database na qual busca e leva ao service o que precisa pra entregar a response.<br/>
Ponto de atenção: Único responsável pela conexão do database, se algo relacionado a métodos do prisma fora dele, está errado.

===========================================================================
