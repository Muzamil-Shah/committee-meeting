// env.d.ts
interface ImportMetaEnv {
    readonly VITE_USR_AUTH: string;
    // add more variables  here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  