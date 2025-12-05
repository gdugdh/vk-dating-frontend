import { apiClient } from "@/lib/api-client";

export interface VKAuthRequest {
  vk_params: Record<string, string>;
  access_token: string;
}

export interface VKAuthResponse {
  token: string;
  expires_at: number;
  user: {
    id: number;
    vk_id: number;
    name: string;
    photo: string;
    city?: string;
    gender: "male" | "female";
    birth_date: string;
    is_verified: boolean;
    is_online: boolean;
    created_at: string;
    updated_at: string;
  };
  is_new_user: boolean;
}

export class AuthService {
  /**
   * Авторизация через VK Mini App
   */
  async vkAuth(vkParams: Record<string, string>, accessToken: string): Promise<VKAuthResponse> {
    console.log("🔐 Отправка VK Auth запроса на бэкенд...");
    console.log("VK Params:", vkParams);
    console.log("Access Token:", accessToken.substring(0, 20) + "...");

    const requestData: VKAuthRequest = {
      vk_params: vkParams,
      access_token: accessToken,
    };

    const response = await apiClient.post<VKAuthResponse>("/auth/vk", requestData);

    // Сохраняем токен в localStorage
    apiClient.setAuthToken(response.token, response.expires_at);

    console.log("✅ VK Auth успешна!");
    console.log("User:", response.user);
    console.log("Is New User:", response.is_new_user);

    return response;
  }

  /**
   * Выход из системы
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      apiClient.clearAuthToken();
    }
  }

  /**
   * Получение текущего пользователя
   */
  async getMe(): Promise<any> {
    return apiClient.get("/me");
  }

  /**
   * Проверка авторизации
   */
  isAuthenticated(): boolean {
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    return token !== null && !apiClient.isTokenExpired();
  }
}

export const authService = new AuthService();
