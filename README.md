# Sistema POS (Punto de Venta) 🛒

Un sistema de punto de venta completo, moderno y escalable diseñado para escritorio (Electron) y adaptado para la web. Incluye gestión de inventario, ventas en tiempo real, reportes y administración de usuarios.

>[!NOTE]
> **Versión Demo Web**: Esta versión desplegada utiliza un "Modo Demo" especial que simula el backend (Node.js/SQLite) directamente en el navegador, permitiendo explorar todas las funcionalidades sin necesidad de instalación.

🔗 **[Ver Demo en Vivo](https://spiderybook7.github.io/sistema-pos/)**

## ✨ Características Principales

*   **Punto de Venta (POS)**: Interfaz ágil para cajeros, escaneo de productos (simulado) y generación de tickets.
*   **Gestión de Inventario**: Control de stock en tiempo real con alertas de bajo inventario.
*   **Reportes Financieros**: Visualización de ingresos, ventas diarias y métricas clave.
*   **Autenticación JWT**: Sistema seguro de login y roles de usuario (Admin/Cajero).
*   **Modo Oscuro/Claro**: Interfaz adaptable a la preferencia del usuario.
*   **Arquitectura Híbrida**: Código base compartido para Web (React) y Desktop (Electron).

## 🛠️ Tecnologías Utilizadas

*   **Frontend**: React 19, Vite, CSS Modules (Diseño responsivo y moderno).
*   **Backend (Original)**: Node.js, Express, SQLite, JWT.
*   **Desktop Wrapper**: Electron.
*   **Estado & Hooks**: Context API (`useAuth`, `useToast`), Custom Hooks.

## 🚀 Instalación (Versión Full Stack Local)

Para ejecutar la versión completa con backend y base de datos:

1.  **Clonar repositorio**:
    ```bash
    git clone https://github.com/SpideryBook7/sistema-pos.git
    cd sistema-pos
    ```

2.  **Backend**:
    ```bash
    cd backend
    npm install
    npm run dev
    ```

3.  **Frontend**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

## 📸 Capturas

*(Aquí se agregarán capturas de pantalla del sistema)*

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

---
Desarrollado con ❤️ por SpideryBook7.
