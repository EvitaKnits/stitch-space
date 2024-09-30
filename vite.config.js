import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        setupFiles: './src/setupTests.js',
        globals: true,
        env: {
            // This variable prevents tests using development data
            VITE_TEST_VAR: true,
        },
    },
})
