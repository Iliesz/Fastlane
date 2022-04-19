import { extendTheme } from "native-base"

export * from "./color"
export * from "./spacing"
export * from "./typography"
export * from "./timing"

export const theme = extendTheme({
  colors: {
    primary: {
      50: '#F87171',
      100: '#F87171',
      200: '#F87171',
      300: '#F87171',
      400: '#F87171',
      500: '#F87171',
      600: '#F87171',
      700: '#fca5a5',
      800: '#F87171',
      900: '#F87171',
    },
    bgLight: '#fef2f2',
    bgDark: '#18181b',
  },
  config: {
    initialColorMode: 'light',
  },
})
