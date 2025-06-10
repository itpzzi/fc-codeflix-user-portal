declare namespace NodeJS {
  export interface ProcessEnv {
    KEYCLOAK_CLIENT_ID: string
    KEYCLOAK_CLIENT_SECRET: string
    KEYCLOAK_ISSUER: string
    KEYCLOAK_BASE_URL: string
    NEXTAUTH_SECRET: string
    NEXTAUTH_URL: string
  }
}