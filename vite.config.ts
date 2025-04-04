import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs-extra';

// Copy markdown files to public directory
const copyMarkdownFiles = () => ({
  name: 'copy-markdown-files',
  buildStart() {
    const srcDir = path.resolve(__dirname, 'src/data/markdown');
    const destDir = path.resolve(__dirname, 'public/data/markdown');
    fs.ensureDirSync(destDir);
    fs.copySync(srcDir, destDir);
  }
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    copyMarkdownFiles()
  ].filter(Boolean),
  base: '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-slot']
        }
      }
    }
  },
  publicDir: 'public',
  assetsInclude: ['**/*.md']
}));
