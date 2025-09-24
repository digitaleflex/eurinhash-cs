"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex items-center justify-center w-11 h-11 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      style={{
        minHeight: '44px',
        minWidth: '44px'
      }}
    >
      <Sun className="h-5 w-5 text-gray-800 dark:text-gray-200 block dark:hidden" />
      <Moon className="h-5 w-5 text-gray-800 dark:text-gray-200 hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}