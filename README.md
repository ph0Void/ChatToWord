# Chat to Word

Complemento de Microsoft Word que convierte respuestas de chatbots (ChatGPT, Claude, Gemini, etc.) en contenido **totalmente editable** dentro de Word.  
Soporta tablas, bloques de código y fórmulas matemáticas.

[![Ver video en YouTube](https://img.youtube.com/vi/WNjaBso8L8o/0.jpg)](https://youtu.be/-bGVBzOoCq0)

---

## 🎯 Características

- Pega directamente las respuestas de cualquier chatbot.
- Convierte:
  - **Tablas** → Tablas nativas de Word.
  - **Bloques de código** → Texto monoespaciado con formato.
  - **Fórmulas matemáticas** → Ecuaciones editables en Word (cuando están correctamente marcadas).
- Funciona en:
  - **Word en la Web**
  - **Word de Escritorio** (Windows)

---

## 📸 Capturas de pantalla

**Word en la Web**

![Chat to Word en Word Web](https://github.com/user-attachments/assets/70cd09f1-6c6d-4c89-ae81-3500d86f7b81)

**Word de Escritorio**

![Chat to Word en Word Escritorio](https://github.com/user-attachments/assets/70a53edf-d790-4893-8680-3afa0f231ed7)

---

## 🚀 Qué hace

1. Copias la respuesta de tu chatbot (ChatGPT, Claude, Gemini, etc.).
2. La pegas en el panel del complemento dentro de Word.
3. El complemento:
   - Detecta tablas, bloques de código y fórmulas.
   - Los convierte a elementos nativos de Microsoft Word.
4. Obtienes un documento listo para editar, formatear o imprimir.

---

## 🧩 Cargar el complemento con el manifest

Si solo quieres probar el complemento rápidamente en Word:

1. Descarga el archivo `manifest.xml` desde la carpeta `download/` del repositorio:  
   👉 [Descargar manifest.xml](https://github.com/ph0Void/ChatToWord/blob/ffe9aee6117b7f3b978f58d92c10cc0a6112c08f/download/manifest.xml)

2. Abre **Microsoft Word**.

3. Carga el complemento:
   - Ve a **Insertar** → **Mis complementos** → **Administrar mis complementos**.
   - Elige **Cargar complemento sin empaquetar**.
   - Selecciona el archivo `manifest.xml` que descargaste.

4. Abre el panel de tareas del complemento y pega el contenido de tu chatbot.

---

## 💻 Instalación y ejecución local (desarrollo)

### Requisitos

- [Node.js](https://nodejs.org/) (recomendado v20+)
- npm (incluido con Node.js)
- Microsoft Word (Web o Escritorio)

### Pasos

1. Clona este repositorio:

   ```bash
   git clone https://github.com/ph0Void/ChatToWord.git
   cd ChatToWord
   ```

2. Instala dependencias:

   ```bash
   npm install
   ```

3. Genera e instala los certificados de desarrollo (para que Word confíe en `https://localhost:3000`):

   ```bash
   npx office-addin-dev-certs install
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run start
   ```

5. Automaticamente se abrira word para poder probar el complemento

---

## 🐳 Ejecutar con Docker

El proyecto está configurado para ejecutar el servidor de desarrollo en un contenedor y exponer el puerto `3000`.

### Requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop) instalado
- Certificados de desarrollo generados en tu máquina Windows

### Pasos

1. Asegúrate de tener los certificados de desarrollo en Windows (si no, ejecútalo en **el host**, no en el contenedor):

   ```bash
   npx office-addin-dev-certs install
   ```

2. Comprueba que el directorio de certificados existe (ruta por defecto):

   ```text
   %USERPROFILE%\.office-addin-dev-certs
   ```

3. Levanta los contenedores:

   ```bash
   # Detener si ya hay algo levantado
   docker-compose down

   # Reconstruir y levantar
   docker-compose up --build
   ```

4. Abre Word en tu equipo y carga/ejecuta el complemento (usando el `manifest.xml`).

---

## 🛠️ Solución rápida de problemas

- **El panel del complemento no carga o aparece en blanco**
  - Comprueba que `https://localhost:3000` es accesible desde el host.
  - Revisa que el servidor (local o en Docker) está en ejecución.

- **Problemas con certificados / Word no confía en la URL**
  - Vuelve a ejecutar:
    ```bash
    npx office-addin-dev-certs install
    ```
  - Asegúrate de que los certificados se instalaron para el usuario actual.

- **Usando Docker: error con `sudo` o certificados dentro del contenedor**
  - No intentes instalar certificados dentro del contenedor.
  - Usa los certificados generados en el host y mapeados vía `docker-compose.yml`.

- **Puerto 3000 en uso**
  - Cambia `dev_server_port` en `package.json` **o**
  - Ajusta el mapeo de puertos en `docker-compose.yml`.

---

## 📣 Soporte

Si encuentras algún error, tienes dudas o sugerencias:

- Abre un **issue** en el repositorio de GitHub.
- O contáctame directamente.

```

```
