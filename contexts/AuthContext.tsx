"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { vkBridge, VKUserInfo } from "@/lib/vk-bridge";
import { authService, VKAuthResponse } from "@/services/auth.service";
import { extractVKParams } from "@/lib/vk-params";

interface AuthContextType {
  user: VKUserInfo | null;
  backendUser: VKAuthResponse["user"] | null;
  accessToken: string | null;
  tokenScope: string | null;
  isLoading: boolean;
  isVKEnvironment: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<VKUserInfo | null>(null);
  const [backendUser, setBackendUser] = useState<VKAuthResponse["user"] | null>(
    null,
  );
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [tokenScope, setTokenScope] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVKEnvironment, setIsVKEnvironment] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initVK = async () => {
      try {
        const isVK = vkBridge.isVKEnvironment();
        setIsVKEnvironment(isVK);

        if (isVK) {
          await vkBridge.init();

          // 1. Получаем информацию о пользователе
          const userInfo = await vkBridge.getUserInfo();

          if (userInfo) {
            console.log("VK User Info:", userInfo);
            console.log("User Name:", userInfo.first_name, userInfo.last_name);
            console.log("User Photo:", userInfo.photo_200);
            console.log("User City:", userInfo.city?.title);
            console.log("User Birth Date:", userInfo.bdate);
            setUser(userInfo);
          }

          // 2. Получаем токен доступа VK
          let vkAccessToken: string;
          try {
            const tokenData = await vkBridge.getAuthToken();

            if (tokenData) {
              console.log("✅ VK Access Token получен");
              console.log("Token Scope:", tokenData.scope);
              vkAccessToken = tokenData.token;
              setTokenScope(tokenData.scope);
            } else {
              throw new Error("No token data received");
            }
          } catch (tokenError) {
            console.error(
              "❌ Пользователь отказал в доступе или произошла ошибка:",
              tokenError,
            );
            // Перенаправляем на страницу отказа в доступе
            router.push("/access-denied");
            return;
          }

          // 3. Извлекаем VK параметры из URL
          const vkParams = extractVKParams();

          if (!vkParams || Object.keys(vkParams).length === 0) {
            console.error("❌ VK параметры не найдены в URL");
            return;
          }

          // 4. Отправляем запрос на бэкенд для авторизации
          try {
            console.log("🚀 Отправка запроса на бэкенд /auth/vk...");
            const authResponse = await authService.vkAuth(
              vkParams,
              vkAccessToken,
            );

            // Токен уже сохранен в authService.vkAuth()
            setBackendUser(authResponse.user);
            setAccessToken(authResponse.token);

            console.log("✅ Бэкенд авторизация успешна!");
            console.log("Backend User:", authResponse.user);
          } catch (backendError) {
            console.error("❌ Ошибка авторизации на бэкенде:", backendError);
            // Можно показать ошибку пользователю
          }
        }
      } catch (error) {
        console.error("VK initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initVK();
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        backendUser,
        accessToken,
        tokenScope,
        isLoading,
        isVKEnvironment,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
