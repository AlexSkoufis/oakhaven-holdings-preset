import { createContext, useContext, useLayoutEffect, useState, type ReactNode } from 'react'

export type HeaderTheme = 'dark' | 'light'

const Ctx = createContext<{ theme: HeaderTheme; setTheme: (t: HeaderTheme) => void }>({
  theme: 'light',
  setTheme: () => {},
})

export function HeaderThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<HeaderTheme>('light')
  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>
}

export const useHeaderTheme = () => useContext(Ctx)

/** Pages call this to declare whether their hero is dark (light text) or light. */
export function useHeroTheme(theme: HeaderTheme) {
  const { setTheme } = useHeaderTheme()
  useLayoutEffect(() => {
    setTheme(theme)
  }, [theme, setTheme])
}
