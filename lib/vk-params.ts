/**
 * Извлекает VK параметры из URL (query string или hash)
 * VK Mini App передает параметры типа vk_user_id, vk_app_id, sign и т.д.
 */
export function extractVKParams(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const params: Record<string, string> = {};

  // Проверяем query string (?vk_user_id=...)
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.forEach((value, key) => {
    if (key.startsWith("vk_") || key === "sign") {
      params[key] = value;
    }
  });

  // Проверяем hash (#vk_user_id=...)
  if (window.location.hash) {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    hashParams.forEach((value, key) => {
      if (key.startsWith("vk_") || key === "sign") {
        params[key] = value;
      }
    });
  }

  console.log("📋 Извлеченные VK параметры:", params);

  return params;
}

/**
 * Проверяет, есть ли VK параметры в URL
 */
export function hasVKParams(): boolean {
  const params = extractVKParams();
  return Object.keys(params).length > 0 && "vk_user_id" in params;
}

/**
 * Получает VK User ID из параметров
 */
export function getVKUserID(): number | null {
  const params = extractVKParams();
  const vkUserID = params["vk_user_id"];

  if (!vkUserID) return null;

  const id = parseInt(vkUserID, 10);
  return isNaN(id) ? null : id;
}
