# Matrix Terminal Frontend

Una interfaz de terminal estilo Matrix para chat con IA, construida con Next.js y styled-components.

## Características

- 🎨 **Interfaz estilo Matrix**: Texto verde sobre fondo negro con efectos visuales
- 💬 **Chat en tiempo real**: Streaming de respuestas desde el backend
- ⌨️ **Atajos de teclado**: ENTER para enviar, SHIFT+ENTER para nueva línea
- 🌊 **Efectos visuales**: Lluvia de Matrix en el fondo
- 📱 **Responsive**: Funciona en diferentes tamaños de pantalla
- ⚡ **Performance**: Optimizado con Next.js 14

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar en modo desarrollo:
```bash
npm run dev
```

3. Abrir [http://localhost:3000](http://localhost:3000) en tu navegador

## Configuración

El frontend está configurado para conectarse al backend FastAPI en `http://localhost:8000`. Asegúrate de que el backend esté ejecutándose antes de usar el frontend.

### Variables de Entorno

Crea un archivo `.env.local` en el directorio `frontend/` con la siguiente configuración:

```bash
# OpenAI API Key - Reemplaza con tu clave real
NEXT_PUBLIC_OPENAI_API_KEY=sk-proj-tu-clave-aqui

# Backend URL
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

**Importante:** Reemplaza `sk-proj-tu-clave-aqui` con tu clave real de OpenAI API.

## Scripts Disponibles

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Construir para producción
- `npm run start` - Ejecutar en modo producción
- `npm run lint` - Ejecutar linter

## Estructura del Proyecto

```
frontend/
├── app/
│   ├── components/
│   │   ├── Terminal.tsx          # Componente principal
│   │   ├── ChatMessage.tsx       # Mensajes del chat
│   │   ├── InputArea.tsx         # Área de entrada
│   │   └── MatrixBackground.tsx  # Efectos de fondo
│   ├── lib/
│   │   └── registry.tsx          # Registro de styled-components
│   ├── styles/
│   │   └── GlobalStyles.tsx      # Estilos globales
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página principal
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md
```

## Tecnologías Utilizadas

- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **styled-components** - CSS-in-JS
- **React Hooks** - Estado y efectos

## API Endpoints

El frontend se conecta a los siguientes endpoints del backend:

- `POST /api/chat` - Enviar mensaje y recibir respuesta streaming
- `GET /health` - Verificar estado del servidor

## Atajos de Teclado

- `ENTER` - Enviar mensaje
- `SHIFT + ENTER` - Nueva línea
- `CTRL + C` - Limpiar entrada

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request