/**
 * Módulo centralizado para integração com Twitch Helix API
 * Responsável por gerenciar autenticação e requisições aos endpoints públicos
 */

interface TwitchUser {
  id: string;
  login: string;
  display_name: string;
  profile_image_url: string;
  description: string;
}

interface TwitchStream {
  online: boolean;
  viewer_count: number;
  title: string;
  thumbnail_url: string;
  game_name: string;
}

interface TwitchFollowerRaw {
  from_id: string;
  from_login: string;
  from_name: string;
  followed_at: string;
}

interface TwitchFollower {
  user_id: string;
  user_login: string;
  user_name: string;
  followed_at: string;
}

interface TwitchErrorResponse {
  error: string;
  status: number;
  message: string;
}

/**
 * Obtém um token de acesso válido usando Client Credentials Flow
 * Se TWITCH_ACCESS_TOKEN estiver configurado, usa esse diretamente
 */
async function getAccessToken(): Promise<string> {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  const preConfiguredToken = process.env.TWITCH_ACCESS_TOKEN;

  // Se houver um token pré-configurado, use-o
  if (preConfiguredToken) {
    console.log("[Twitch] Usando token de acesso pré-configurado");
    return preConfiguredToken;
  }

  // Caso contrário, obtenha um novo via Client Credentials Flow
  if (!clientId || !clientSecret) {
    const errorMsg = "[Twitch] CLIENT_ID ou CLIENT_SECRET não configurados";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  try {
    console.log("[Twitch] Obtendo novo token via Client Credentials Flow...");
    const response = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Falha ao obter token: ${response.status} - ${errorData.message || response.statusText}`
      );
    }

    const data = (await response.json()) as { access_token: string };
    console.log("[Twitch] Token obtido com sucesso");
    return data.access_token;
  } catch (error) {
    const errorMsg = `[Twitch] Erro ao obter token de acesso: ${error instanceof Error ? error.message : String(error)}`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
}

/**
 * Faz uma requisição autenticada para a Twitch Helix API
 */
async function makeAuthenticatedRequest<T>(
  url: string,
  method: string = "GET"
): Promise<T> {
  const clientId = process.env.TWITCH_CLIENT_ID;

  if (!clientId) {
    throw new Error("[Twitch] CLIENT_ID não configurado");
  }

  try {
    const accessToken = await getAccessToken();

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-ID": clientId,
      },
    });

    // Tratamento específico para 401 (token expirado/inválido)
    if (response.status === 401) {
      const errorMsg = "[Twitch] Erro de autenticação (401) - Token inválido ou expirado";
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    if (!response.ok) {
      let errorMessage = response.statusText;
      try {
        const errorData = (await response.json()) as {
          error?: string;
          message?: string;
        };
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // se não houver body JSON, mantém statusText
      }
      throw new Error(
        `Erro na requisição Twitch: ${response.status} - ${errorMessage}`
      );
    }

    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    const errorMsg = `[Twitch] Erro na requisição autenticada: ${error instanceof Error ? error.message : String(error)}`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
}

/**
 * Busca dados públicos de um usuário Twitch
 * @param username - Nome de usuário Twitch (ex: "carolzyn")
 * @returns Dados do usuário ou erro
 */
export async function getUser(username: string): Promise<TwitchUser> {
  if (!username || typeof username !== "string") {
    throw new Error("Username inválido");
  }

  console.log(`[Twitch] Buscando dados do usuário: ${username}`);

  const url = new URL("https://api.twitch.tv/helix/users");
  url.searchParams.append("login", username.toLowerCase());

  const response = (await makeAuthenticatedRequest<{ data: TwitchUser[] }>(
    url.toString()
  )) as { data: TwitchUser[] };

  if (!response.data || response.data.length === 0) {
    throw new Error(`Usuário "${username}" não encontrado`);
  }

  const user = response.data[0];
  console.log(`[Twitch] Usuário encontrado: ${user.display_name} (ID: ${user.id})`);

  return user;
}

/**
 * Busca o status atual da stream de um usuário
 * Retorna online/offline, viewers, título, thumbnail, e nome do jogo
 * @param userLogin - Nome de usuário Twitch (ex: "carolzyn")
 * @returns Status da stream com fallback para offline
 */
export async function getStream(userLogin: string): Promise<TwitchStream> {
  try {
    if (!userLogin || typeof userLogin !== "string") {
      throw new Error("userLogin inválido");
    }

    console.log(`[Twitch] Buscando status da stream: ${userLogin}`);

    const url = new URL("https://api.twitch.tv/helix/streams");
    url.searchParams.append("user_login", userLogin.toLowerCase());

    const response = (await makeAuthenticatedRequest<{ data: unknown[] }>(
      url.toString()
    )) as { data: Array<{
      viewer_count: number;
      title: string;
      thumbnail_url: string;
      game_name: string;
    }> };

    // Fallback: stream offline
    if (!response.data || response.data.length === 0) {
      console.log(`[Twitch] ${userLogin} está offline`);
      return {
        online: false,
        viewer_count: 0,
        title: "",
        thumbnail_url: "",
        game_name: "",
      };
    }

    const stream = response.data[0];
    console.log(
      `[Twitch] Stream ativa: "${stream.title}" (${stream.viewer_count} viewers, jogo: ${stream.game_name})`
    );

    return {
      online: true,
      viewer_count: stream.viewer_count,
      title: stream.title,
      thumbnail_url: stream.thumbnail_url,
      game_name: stream.game_name,
    };
  } catch (error) {
    const errorMsg = `[Twitch] Erro ao buscar stream, retornando fallback offline: ${error instanceof Error ? error.message : String(error)}`;
    console.error(errorMsg);

    // Fallback: retorna offline em caso de erro
    return {
      online: false,
      viewer_count: 0,
      title: "",
      thumbnail_url: "",
      game_name: "",
    };
  }
}

export interface TwitchFollowerStats {
  totalFollowers: number;
  followers: TwitchFollower[];
}

export async function getFollowers(
  userLogin: string,
  limit: number = 10
): Promise<TwitchFollowerStats> {
  try {
    if (!userLogin || typeof userLogin !== "string") {
      throw new Error("userLogin inválido");
    }

    if (limit < 1 || limit > 100) {
      throw new Error("Limit deve estar entre 1 e 100");
    }

    console.log(`[Twitch] Buscando ${limit} seguidores recentes de: ${userLogin}`);

    const userUrl = new URL("https://api.twitch.tv/helix/users");
    userUrl.searchParams.append("login", userLogin.toLowerCase());

    const userResponse = (await makeAuthenticatedRequest<{ data: TwitchUser[] }>(
      userUrl.toString()
    )) as { data: TwitchUser[] };

    if (!userResponse.data || userResponse.data.length === 0) {
      throw new Error(`Usuário "${userLogin}" não encontrado`);
    }

    const userId = userResponse.data[0].id;
    console.log(`[Twitch] ID do usuário obtido: ${userId}`);

    const followersUrl = new URL("https://api.twitch.tv/helix/channels/followers");
    followersUrl.searchParams.append("broadcaster_id", userId);
    followersUrl.searchParams.append("first", limit.toString());

    const followersResponse = (await makeAuthenticatedRequest<{
      total: number;
      data: TwitchFollowerRaw[];
    }>(followersUrl.toString())) as {
      total: number;
      data: TwitchFollowerRaw[];
    };

    if (!followersResponse.data) {
      console.log(`[Twitch] Nenhum seguidor encontrado para ${userLogin}`);
      return {
        totalFollowers: followersResponse.total || 0,
        followers: [],
      };
    }

    const normalizedFollowers: TwitchFollower[] = followersResponse.data.map((follower) => ({
      user_id: follower.from_id,
      user_login: follower.from_login,
      user_name: follower.from_name,
      followed_at: follower.followed_at,
    }));

    console.log(
      `[Twitch] ${normalizedFollowers.length} seguidores recentes carregados com sucesso`
    );

    const sorted = normalizedFollowers.sort((a, b) => {
      return new Date(b.followed_at).getTime() - new Date(a.followed_at).getTime();
    });

    return {
      totalFollowers: followersResponse.total || 0,
      followers: sorted,
    };
  } catch (error) {
    const errorMsg = `[Twitch] Erro ao buscar seguidores: ${error instanceof Error ? error.message : String(error)}`;
    console.error(errorMsg);

    return {
      totalFollowers: 0,
      followers: [],
    };
  }
}

/**
 * Função auxiliar para testar a autenticação
 * Útil para verificar se as credenciais estão corretas
 */
export async function validateAuth(): Promise<{
  valid: boolean;
  message: string;
}> {
  try {
    console.log("[Twitch] Validando autenticação...");
    await getAccessToken();
    console.log("[Twitch] Autenticação válida ✓");
    return {
      valid: true,
      message: "Autenticação com Twitch API válida",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[Twitch] Falha na validação: ${message}`);
    return {
      valid: false,
      message,
    };
  }
}

/**
 * Busca os seguidores mais recentes de um canal
 * @param userLogin - Nome de usuário Twitch (ex: "carolzyn")
 * @param limit - Número de seguidores a retornar (máx 100)
 * @returns Array de seguidores recentes
 */
export async function getRecentFollowers(
  userLogin: string,
  limit: number = 10
): Promise<TwitchFollower[]> {
  try {
    if (!userLogin || typeof userLogin !== "string") {
      throw new Error("userLogin inválido");
    }

    if (limit < 1 || limit > 100) {
      throw new Error("Limit deve estar entre 1 e 100");
    }

    console.log(`[Twitch] Buscando ${limit} seguidores recentes de: ${userLogin}`);

    // Primeiro, obtém o ID do usuário
    const userUrl = new URL("https://api.twitch.tv/helix/users");
    userUrl.searchParams.append("login", userLogin.toLowerCase());

    const userResponse = (await makeAuthenticatedRequest<{ data: TwitchUser[] }>(
      userUrl.toString()
    )) as { data: TwitchUser[] };

    if (!userResponse.data || userResponse.data.length === 0) {
      throw new Error(`Usuário "${userLogin}" não encontrado`);
    }

    const userId = userResponse.data[0].id;
    console.log(`[Twitch] ID do usuário obtido: ${userId}`);

    // Agora busca os seguidores
    const followersUrl = new URL("https://api.twitch.tv/helix/channels/followers");
    followersUrl.searchParams.append("broadcaster_id", userId);
    followersUrl.searchParams.append("first", limit.toString());

    const followersResponse = (await makeAuthenticatedRequest<{ data: TwitchFollowerRaw[] }>(
      followersUrl.toString()
    )) as { data: TwitchFollowerRaw[] };

    if (!followersResponse.data || followersResponse.data.length === 0) {
      console.log(`[Twitch] Nenhum seguidor encontrado para ${userLogin}`);
      return [];
    }

    const normalizedFollowers: TwitchFollower[] = followersResponse.data.map((follower) => ({
      user_id: follower.from_id,
      user_login: follower.from_login,
      user_name: follower.from_name,
      followed_at: follower.followed_at,
    }));

    console.log(
      `[Twitch] ${normalizedFollowers.length} seguidores recentes carregados com sucesso`
    );

    const sorted = normalizedFollowers.sort((a, b) => {
      return new Date(b.followed_at).getTime() - new Date(a.followed_at).getTime();
    });

    return sorted;
  } catch (error) {
    const errorMsg = `[Twitch] Erro ao buscar seguidores: ${error instanceof Error ? error.message : String(error)}`;
    console.error(errorMsg);

    // Fallback: retorna array vazio
    return [];
  }
}

export type { TwitchUser, TwitchStream, TwitchFollower, TwitchErrorResponse };
