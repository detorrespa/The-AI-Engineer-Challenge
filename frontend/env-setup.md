# Configuración de Variables de Entorno

## Para pruebas locales

1. Crea un archivo `.env.local` en el directorio `frontend/`
2. Agrega la siguiente línea:

```bash
DEMO_OPENAI_API_KEY=sk-proj-tu_clave_aqui
```

3. Reemplaza `sk-proj-tu_clave_aqui` con tu clave real de OpenAI
4. Reinicia el servidor de desarrollo: `npm run dev`

## Para producción (Vercel)

1. Ve a Project Settings → Environment Variables
2. Agrega: `DEMO_OPENAI_API_KEY` = `<tu_clave>`
3. Deploy automático
