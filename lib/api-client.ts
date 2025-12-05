const API_BASE_URL = "https://urban-match.work.gd/api/v2";

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response?: any
  ) {
    super(message);
    this.name = "APIError";
  }
}

export class APIClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const defaultHeaders: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Add auth token if exists
    const authToken = this.getAuthToken();
    if (authToken) {
      defaultHeaders["Authorization"] = `Bearer ${authToken}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    console.log(`🌐 API Request: ${options.method || "GET"} ${endpoint}`);

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        let errorData;

        try {
          errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // Response is not JSON
        }

        console.error(`❌ API Error: ${errorMessage}`, errorData);
        throw new APIError(errorMessage, response.status, errorData);
      }

      const data = await response.json();
      console.log(`✅ API Response:`, data);

      return data as T;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }

      console.error(`❌ Network Error:`, error);
      throw new APIError(
        "Ошибка соединения с сервером",
        0,
        error
      );
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }

  // Auth token management
  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  }

  setAuthToken(token: string, expiresAt: number): void {
    if (typeof window === "undefined") return;
    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_token_expires_at", expiresAt.toString());
    console.log("🔐 Auth token saved to localStorage");
  }

  clearAuthToken(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_token_expires_at");
    console.log("🔓 Auth token cleared from localStorage");
  }

  isTokenExpired(): boolean {
    if (typeof window === "undefined") return true;

    const expiresAt = localStorage.getItem("auth_token_expires_at");
    if (!expiresAt) return true;

    const expiryTime = parseInt(expiresAt, 10);
    return Date.now() / 1000 > expiryTime;
  }
}

export const apiClient = new APIClient();
