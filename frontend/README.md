# Matrix Terminal Frontend

Una interfaz de terminal estilo Matrix para chat con IA, construida con Next.js y styled-components.

## Características

- 🎨 **Interfaz estilo Matrix**: Texto verde sobre fondo negro con efectos visuales
- 💬 **Chat en tiempo real**: Streaming de respuestas desde el backend
- 🔐 **Configuración segura**: Almacenamiento local de API key
- ⌨️ **Controles de teclado**: ENTER para enviar, CTRL+C para limpiar
- 📱 **Responsive**: Funciona en diferentes tamaños de pantalla
- ⚡ **Performance**: Optimizado con Next.js 14

## Tecnologías

- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **styled-components** - Estilos CSS-in-JS
- **FastAPI** - Backend (puerto 8000)

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar en modo desarrollo:
```bash
npm run dev
```

3. Abrir [http://localhost:3000](http://localhost:3000)

## Configuración

### Backend
Asegúrate de que el backend FastAPI esté ejecutándose en `http://localhost:8000`:

```bash
cd ../api
pip install -r requirements.txt
python app.py
```

### API Key
1. Obtén tu API key de OpenAI en [platform.openai.com](https://platform.openai.com/api-keys)
2. Ingresa la clave en la pantalla de configuración inicial
3. La clave se almacena localmente y nunca se comparte

## Uso

### Controles
- **ENTER**: Enviar mensaje
- **SHIFT + ENTER**: Nueva línea
- **CTRL + C**: Limpiar input
- **ESC**: Salir (en desarrollo)

### Estructura del Proyecto

```
frontend/
├── app/
│   ├── components/
│   │   ├── Terminal.tsx          # Componente principal
│   │   ├── ChatMessage.tsx       # Mensajes individuales
│   │   ├── InputArea.tsx         # Área de entrada
│   │   └── MatrixBackground.tsx  # Fondo animado
│   ├── styles/
│   │   └── GlobalStyles.tsx      # Estilos globales
│   ├── lib/
│   │   └── registry.ts           # Configuración styled-components
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página principal
├── package.json
├── next.config.js
└── tsconfig.json
```

## API Integration

El frontend envía requests al endpoint `/api/chat` con la siguiente estructura JSON:

```json
{
  "developer_message": "Eres un asistente de IA útil y amigable...",
  "user_message": "Mensaje del usuario",
  "model": "gpt-4.1-mini",
  "api_key": "sk-proj-..."
}
```

Esto coincide exactamente con el modelo Pydantic `ChatRequest` del backend.

## Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run start` - Servidor de producción
- `npm run lint` - Verificar código

## Personalización

### Colores
Los colores principales están definidos en `GlobalStyles.tsx`:
- Verde Matrix: `#00ff00`
- Verde secundario: `#00cc00`
- Verde suave: `#00aa00`

### Fuentes
- Principal: `'Courier New', monospace`
- Tamaños: 12px, 14px, 16px, 18px, 24px, 28px

## Troubleshooting

### Error de conexión
- Verifica que el backend esté ejecutándose en puerto 8000
- Revisa la consola del navegador para errores CORS

### Problemas de API
- Verifica que tu API key sea válida
- Asegúrate de tener créditos en tu cuenta de OpenAI

### Problemas de estilos
- Verifica que styled-components esté configurado correctamente
- Revisa el archivo `registry.ts` y `next.config.js`

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la licencia MIT.