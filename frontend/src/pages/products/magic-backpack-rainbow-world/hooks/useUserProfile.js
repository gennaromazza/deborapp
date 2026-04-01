import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'magic-backpack-user'

export function loadUserProfile() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch (e) {
    console.warn('Failed to load user profile:', e)
  }
  return null
}

export function saveUserProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    window.dispatchEvent(new CustomEvent('profile-updated', { detail: profile }))
    return profile
  } catch (e) {
    console.warn('Failed to save user profile:', e)
    return profile
  }
}

export function clearUserProfile() {
  localStorage.removeItem(STORAGE_KEY)
}

export function useUserProfile() {
  const [profile, setProfile] = useState(() => loadUserProfile())

  useEffect(() => {
    const handleStorage = () => {
      setProfile(loadUserProfile())
    }
    const handleProfileUpdate = (e) => {
      setProfile(e.detail)
    }
    window.addEventListener('storage', handleStorage)
    window.addEventListener('profile-updated', handleProfileUpdate)
    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('profile-updated', handleProfileUpdate)
    }
  }, [])

  const updateProfile = useCallback((newData) => {
    const updated = { ...profile, ...newData }
    saveUserProfile(updated)
    setProfile(updated)
    return updated
  }, [profile])

  const resetProfile = useCallback(() => {
    clearUserProfile()
    setProfile(null)
  }, [])

  return { profile, updateProfile, resetProfile, isOnboarded: !!profile, refreshProfile: () => setProfile(loadUserProfile()) }
}
