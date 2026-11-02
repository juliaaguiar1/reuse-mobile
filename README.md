# ReUse — FIAP | Fase 3: APIs, autenticação e cache

Projeto individual de Júlia Aguiar de Moura Moisés • Design Web • 2TWDOR • 2026.

Continuação da Fase 2. Aplicativo acadêmico em **React Native, Expo SDK 54, Expo Router e TypeScript**, com telas Início, Explorar, Detalhes, Favoritos, Anunciar, Perfil e Login.

## Como executar

```bash
npm install
npm run typecheck
npx expo start
```

Abra no Expo Go para testar a câmera. Necessário internet para primeiro carregamento da API e login.

## 1. Consumo de APIs (60%)

API pública de testes [DummyJSON](https://dummyjson.com/docs):

- `GET https://dummyjson.com/products?limit=30&select=id,title,description,category,thumbnail,price,availabilityStatus` em `services/catalog.ts`.
- Produtos externos são convertidos para o modelo do ReUse e exibidos nas telas **Início**, **Explorar**, **Detalhes** e **Favoritos**.
- A tela Explorar oferece busca local nos dados retornados e botão **Atualizar** para nova requisição.
- Fotos e preços são dados ilustrativos do catálogo da API, **não** anúncios reais, produtos usados ou pessoas próximas. Os preços são apresentados em USD, sem conversão.
- Requisições tratam erros HTTP, respostas inesperadas e timeout de 9 segundos.

## 2. Autenticação e sessão (20%)

- `POST https://dummyjson.com/auth/login` em `services/auth.ts` envia usuário/senha e recebe token e dados do usuário.
- `GET https://dummyjson.com/auth/me` verifica o token quando a aplicação reinicia.
- Tela **Login** com conta de demonstração: usuário `emilys`, senha `emilyspass` (credenciais públicas da DummyJSON).
- **Perfil** mostra os dados da sessão; **Anunciar** exige login; botão **Sair** remove a sessão.
- Ao reiniciar, uma sessão salva é restaurada e validada com a API. Se houver falha de rede, a interface indica verificação pendente; se a API rejeitar o token, a sessão é encerrada.
- Não há cadastro real nem servidor próprio. O armazenamento de tokens no AsyncStorage é **somente para fins didáticos**; aplicativos de produção devem utilizar armazenamento criptografado e política de renovação/revogação de tokens.

## 3. Caching local (20%)

- `services/catalog.ts` mantém o catálogo em `@reuse:catalog:v3`, com `savedAt` e **TTL de 6 horas**.
- Dentro do TTL, o catálogo é carregado do cache sem nova chamada de rede.
- No botão **Atualizar**, a API é consultada novamente, independentemente do TTL.
- Se a rede falhar, usa o último catálogo salvo; na primeira instalação offline, usa os quatro itens locais da Fase 2.
- O estado **API / cache / local** e eventuais avisos são mostrados ao usuário.
- Também preserva o AsyncStorage anterior: `@reuse:favorites`, `@reuse:ads`, `@reuse:lastPhoto`.
- A sessão demonstrativa fica em `@reuse:demo-session:v3`.

## Estrutura relevante

- `services/catalog.ts` — HTTP, mapeamento e política de cache
- `services/auth.ts` — login e validação de token
- `context/CatalogContext.tsx` — catálogo e atualização compartilhados
- `context/AuthContext.tsx` — sessão e logout
- `context/AppContext.tsx` — favoritos, anúncios e câmera da fase anterior
- `components/CatalogStatus.tsx` — feedback da origem dos dados
- `app/login.tsx`, `app/profile.tsx`, `app/announce.tsx` — autenticação e rotas protegidas

## Roteiro de testes e evidências para o PDF

1. Com internet, abrir **Explorar** e mostrar produtos da API e a indicação de atualização.
2. Buscar um item, abrir **Detalhes** e salvar em **Favoritos**.
3. Pressionar **Atualizar** e observar o catálogo obtido novamente.
4. Fechar/reabrir com cache válido; verificar indicação de cache.
5. Desativar a rede após carregar o catálogo; usar **Atualizar** e verificar fallback offline.
6. Tentar **Anunciar** sem login; confirmar que solicita autenticação.
7. Entrar com `emilys` / `emilyspass`; conferir **Perfil** e publicar anúncio local.
8. Fechar/reabrir e conferir restauração da sessão; pressionar **Sair**.
9. Testar câmera em aparelho físico via Expo Go.

**Atenção:** o código foi preparado para execução, mas testes manuais em dispositivo e rede precisam ser realizados antes de declarar a entrega validada.

## Repositório

Publicar a atualização no mesmo repositório: https://github.com/juliaaguiar1/reuse-mobile
