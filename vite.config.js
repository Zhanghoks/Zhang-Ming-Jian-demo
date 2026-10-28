import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The site is published as a GitHub project page, so it is served from a
// repository subpath. Override BASE_PATH to publish from a domain root.
const deploymentBase = process.env.BASE_PATH ?? '/squrvebridge-live-demo/'

export default defineConfig({
  base: deploymentBase,
  plugins: [react()],
})
