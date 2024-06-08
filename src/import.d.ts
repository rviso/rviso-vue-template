declare module 'import-meta' {
  global {
   interface ImportMetaEnv {
      MODE: string
      VITE_APP_TITLE: string
      VITE_APP_SHORT_NAME: string
      VITE_APP_VERSION: string
      VITE_APP_AUTHOR: string
      VITE_APP_COPYRIGHT: string
      VITE_APP_DOMAIN: string
      VITE_APP_API: string
      VITE_APP_UPLOAD: string
      VITE_APP_DOWNLOAD: string
      VITE_APP_FULLSCREEN: string
      VITE_APP_LAYOUT: string
      VITE_APP_THEME: string
      VITE_APP_COLOR: string
      VITE_APP_TINYMCE: string
    }
    interface ImportMeta {
      readonly env: ImportMetaEnv
    }
  }
}
