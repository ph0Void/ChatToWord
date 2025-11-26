# **Chat to Word**

Conversor que transforma respuestas (de chatbots como ChatGPT, Claude, Gemini, etc.) en contenido editable dentro de Microsoft Word mediante un Office Add-in (Task Pane).
Tiene soporte para tablas, bloques de código y fórmulas matemáticas.

## **Qué hace**

Pegar la respuesta de un chatbot en el panel y convertir tablas, código y fórmulas en contenido de Word.

## **Cómo usarlo**

### **1. Carga del complemento con Manifest**

1. Descargar el manifesto `manifest.xml` desde la carpeta `download/`.
2. Abre Microsoft Word.
3. Carga el complemento en Word
   - Abre Word y ve a "Insertar" > "Mis complementos" > "Administrar mis complementos" > "Cargar complemento sin empaquetar".
   - Selecciona el archivo `manifest.xml` en la carpeta del proyecto.

### **2. Instalación y ejecución local**

**Requisitos**:

- Node.js (v20+ recomendado) y npm.
- Docker y Docker Compose si vas a usar contenedores.
- Microsoft Word

**Pasos**

1. Clona el repositorio y abre la carpeta del proyecto.

```
git clone https://github.com/ph0Void/ChatToWord.git
```

2. Instala dependencias:

```
npm install
```

3. Genera e instala certificados de desarrollo (necesario para que Word confíe en `https://localhost:3000`):

```
npx office-addin-dev-certs install
```

4. Inicia y carga el complemento desde Word :

```
npm run start
```

### **3. Ejecutar con Docker**

**Requisitos**

- Tener instalado Docker desktop

El proyecto esta configurado para ejecutar el servidor de desarrollo y exponer el puerto `3000`.

**Pasos**

1. Asegúrate de tener los certificados de desarrollo en Windows (si no, genera con):

```
npx office-addin-dev-certs install
```

2. Comprueba que el directorio de certificados existe en Windows (ruta por defecto):

```
%USERPROFILE%\.office-addin-dev-certs
```

3. Inicia con Docker Compose:

```
# Reconstruir y levantar
docker-compose down
docker-compose up --build
```

4. Abre word y ejecuta el complemento

**Solución de problemas rápida**

- Si Word no carga la tarea, revisa certificados y que la URL `https://localhost:3000` sea accesible desde el host (no desde el contenedor). Si usas Docker y Word está en el host Windows, monta tus certificados locales como hace `docker-compose.yml`.
- Si el servidor en el contenedor intenta ejecutar `sudo` (error con `office-addin-dev-certs`), no intentes instalar dentro del contenedor: usa los certificados del host.
- Si el puerto 3000 está en uso en tu host, cambia `dev_server_port` en `package.json` o el mapeo de puertos en `docker-compose.yml`.

---

# IMPORTANTE

Si encuentras algun error por favor abre un issue en el repositorio o contactame directamente.
