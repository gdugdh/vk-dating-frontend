"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { vkBridge, VKUserInfo } from "@/lib/vk-bridge"

interface AuthContextType {
  user: VKUserInfo | null
  isLoading: boolean
  isVKEnvironment: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<VKUserInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isVKEnvironment, setIsVKEnvironment] = useState(false)

  useEffect(() => {
    const initVK = async () => {
      try {
        const isVK = vkBridge.isVKEnvironment()
        setIsVKEnvironment(isVK)

        if (isVK) {
          await vkBridge.init()
          const userInfo = await vkBridge.getUserInfo()

          if (userInfo) {
            console.log('VK User Info:', userInfo)
            console.log('User Name:', userInfo.first_name, userInfo.last_name)
            console.log('User Photo:', userInfo.photo_200)
            console.log('User City:', userInfo.city?.title)
            console.log('User Birth Date:', userInfo.bdate)
            setUser(userInfo)
          }
        }
      } catch (error) {
        console.error('VK initialization error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initVK()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, isVKEnvironment }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
