# ♻️ ReUse — Plataforma de Reutilização e Consumo Consciente

## Sobre o projeto

O **ReUse** é um aplicativo mobile desenvolvido com React Native e Expo, com o objetivo de incentivar a reutilização de produtos, o consumo consciente e a sustentabilidade.

A proposta é oferecer uma plataforma intuitiva na qual os usuários possam explorar produtos, visualizar informações detalhadas, salvar itens favoritos e cadastrar anúncios, contribuindo para a redução do desperdício e o prolongamento da vida útil dos objetos.

O projeto foi desenvolvido como parte das atividades acadêmicas do curso de **Design Web da FIAP**, com evolução progressiva das funcionalidades ao longo das entregas.

## Objetivos

- Incentivar a economia circular e o consumo sustentável.
- Facilitar a descoberta e a reutilização de produtos.
- Oferecer uma experiência mobile intuitiva e acessível.
- Aplicar conceitos de desenvolvimento mobile e integração com serviços externos.
- Implementar autenticação, gerenciamento de sessão e persistência local de dados.

## Tecnologias utilizadas

- **React Native:** desenvolvimento da interface mobile.
- **Expo:** ambiente de desenvolvimento e execução.
- **TypeScript:** tipagem estática e organização do código.
- **Expo Router:** gerenciamento de rotas e navegação.
- **AsyncStorage:** armazenamento local de informações.
- **Expo Camera:** integração com a câmera do dispositivo.
- **Context API:** gerenciamento de estados compartilhados.
- **DummyJSON API:** fornecimento de dados externos para o catálogo.

## Funcionalidades

### Navegação e experiência do usuário

O aplicativo possui telas de início, exploração de produtos, detalhes, anúncios, favoritos, login e perfil, organizadas para facilitar a navegação.

### Exploração de produtos

Integração com a API pública DummyJSON para consulta de produtos e apresentação de informações como nome, imagem, descrição e preço.

### Favoritos

Permite salvar produtos de interesse e manter os registros utilizando armazenamento local.

### Cadastro de anúncios

Disponibiliza uma interface para cadastrar produtos, incluindo recursos de captura de imagens pela câmera do dispositivo.

### Autenticação e gerenciamento de sessão

A Fase 3 introduz um fluxo de autenticação demonstrativo, com gerenciamento do estado do usuário e persistência de informações relacionadas à sessão.

### Cache local e funcionamento offline

Implementação de cache com AsyncStorage para reduzir consultas repetidas à API e permitir a recuperação de dados previamente armazenados quando houver falhas de conexão.

O cache do catálogo utiliza uma política de validade de seis horas, com possibilidade de aproveitar os dados locais como alternativa em caso de indisponibilidade da API.

## Evolução do projeto

### Fase 1 — Estrutura e interfaces

Desenvolvimento da proposta inicial, organização das telas, navegação e identidade visual do aplicativo.

### Fase 2 — Recursos nativos e persistência

Implementação e aprimoramento das interfaces, integração com a câmera e armazenamento local de favoritos, anúncios e informações do aplicativo.

### Fase 3 — APIs, autenticação e cache

A terceira fase concentra-se em três requisitos principais:

**1. Consumo de APIs externas — 60%**

Integração com serviços externos para obtenção e exibição de produtos no aplicativo.

**2. Autenticação e gerenciamento de sessão — 20%**

Implementação de fluxo de login e controle do estado de autenticação do usuário.

**3. Cache local — 20%**

Utilização do AsyncStorage para armazenamento temporário de informações, redução de requisições e recuperação de dados previamente consultados.

## Estrutura do projeto

```text
ReUse/
├── app/             # Telas e rotas
├── components/      # Componentes reutilizáveis
├── context/         # Contextos e estados compartilhados
├── data/            # Dados e estruturas auxiliares
├── services/        # Integrações e serviços
├── styles/          # Estilos e identidade visual
├── app.json         # Configurações do Expo
├── package.json     # Dependências e scripts
└── README.md        # Documentação
```

## Como executar

**Pré-requisitos:** Node.js, npm e Expo Go (para execução em dispositivo compatível).

Clone o repositório:

```bash
git clone https://github.com/juliaaguiar1/reuse-mobile.git
```

Acesse a pasta:

```bash
cd reuse-mobile
```

Instale as dependências:

```bash
npm install
```

Inicie o projeto:

```bash
npx expo start
```

Para verificar a tipagem do projeto:

```bash
npm run typecheck
```

Após iniciar o Expo, utilize o QR Code para abrir o aplicativo no Expo Go ou selecione uma das opções de execução disponibilizadas no terminal.

## Considerações técnicas

O ReUse é um projeto acadêmico e utiliza serviços e dados demonstrativos. A autenticação implementada tem finalidade educacional e não deve ser interpretada como uma solução de segurança pronta para produção.

As funcionalidades que dependem de recursos nativos, como a câmera, devem ser verificadas em dispositivo compatível.

## Autoria

**Júlia Aguiar de Moura Moisés**  
FIAP — Design Web  
Turma: 2TWDOR  
Ano: 2026

**GitHub:** [juliaaguiar1/reuse-mobile](https://github.com/juliaaguiar1/reuse-mobile)

---

*ReUse — Reutilizar é transformar o futuro.*
