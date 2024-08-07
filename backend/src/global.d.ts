export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: string
            FR_RECOVER_URL?: string
            DB_HOST?: string
            DB_USERNAME?: string
            DB_PASSWORD?: string
            EMAIL_ADDRESS?: string
            EMAIL_PASSWORD?: string
        }
    }
}
