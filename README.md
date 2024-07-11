
# Backend NodeJS plann.er

A API "plann.er" é um backend Node.js que fornece uma plataforma para organizar viagens e atividades. Aqui estão algumas funcionalidades principais da API:

- **Criação de viagens**: Os usuários podem criar viagens personalizadas, definindo datas, locais e atividades.

- **Confirmação de participantes**: Os usuários podem confirmar sua participação em uma viagem, fornecendo informações pessoais.

- **Criação de atividades**: Os usuários podem adicionar atividades personalizadas a uma viagem, como visitas a lugares turísticos, excursões ou eventos.

- **Criação de convites**: Os usuários podem convidar outros usuários para participar de uma viagem, fornecendo um link de convite.

- **Gerenciamento de participantes**: Os usuários podem visualizar e gerenciar os participantes confirmados de uma viagem.

- **Gerenciamento de atividades**: Os usuários podem visualizar e gerenciar as atividades agendadas para uma viagem.

- **Health Check**: A API fornece um endpoint de health check para verificar se o banco de dados está funcionando corretamente.
  
A API utiliza o framework Fastify para criar os endpoints e o Prisma como ORM para interagir com o banco de dados PostgreSQL. O envio de e-mails é feito utilizando o Nodemailer.