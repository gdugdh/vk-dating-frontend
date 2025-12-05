import bridge from '@vkontakte/vk-bridge';

export interface VKUserInfo {
  id: number;
  first_name: string;
  last_name: string;
  photo_100?: string;
  photo_200?: string;
  photo_max_orig?: string;
  city?: {
    id: number;
    title: string;
  };
  country?: {
    id: number;
    title: string;
  };
  bdate?: string;
  sex?: number; // 0 - not specified, 1 - female, 2 - male
  timezone?: number;
}

class VKBridge {
  private isInitialized = false;
  private userInfo: VKUserInfo | null = null;

  async init() {
    if (this.isInitialized) return;

    try {
      await bridge.send('VKWebAppInit');
      this.isInitialized = true;
      console.log('VK Bridge initialized successfully');
    } catch (error) {
      console.error('Failed to initialize VK Bridge:', error);
      throw error;
    }
  }

  async getUserInfo(): Promise<VKUserInfo | null> {
    if (this.userInfo) return this.userInfo;

    try {
      // VKWebAppGetUserInfo - получает данные пользователя без access_token
      const user = await bridge.send('VKWebAppGetUserInfo');
      this.userInfo = user as VKUserInfo;

      console.log('✅ VKWebAppGetUserInfo успешно получен:', this.userInfo);

      return this.userInfo;
    } catch (error) {
      console.error('❌ Failed to get user info:', error);
      return null;
    }
  }

  async getAuthToken(): Promise<string | null> {
    try {
      const data = await bridge.send('VKWebAppGetAuthToken', {
        app_id: parseInt(process.env.NEXT_PUBLIC_VK_APP_ID || '0'),
        scope: 'friends,photos'
      });
      return data.access_token;
    } catch (error) {
      console.error('Failed to get auth token:', error);
      return null;
    }
  }

  isVKEnvironment(): boolean {
    if (typeof window === 'undefined') return false;
    return window.location.search.includes('vk_') ||
           window.location.hash.includes('vk_');
  }
}

export const vkBridge = new VKBridge();
