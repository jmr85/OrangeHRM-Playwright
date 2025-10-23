# OrangeHRM Demo — Plan de Pruebas

## Resumen ejecutivo

La aplicación OrangeHRM demo (https://opensource-demo.orangehrmlive.com) ofrece funciones básicas de gestión de recursos humanos: autenticación, panel (dashboard), PIM (empleados), administración de usuarios, ausencias (Leave), recruitment, reportes y utilidades. Este plan cubre flujos críticos, validaciones, edge-cases y criterios de aceptación pensados para pruebas manuales y de automatización con Playwright.

**Suposiciones**

- Estado inicial: sesión limpia / navegador vacío.
- Credenciales demo: Usuario `Admin`, contraseña `admin123`.
- URL base: https://opensource-demo.orangehrmlive.com

**Roles**

- Admin (acceso completo).
- Manager / Employee (cuando existan cuentas adicionales).

**Criterio general de éxito**

- Cada escenario pasa si los resultados esperados se cumplen sin errores visibles ni fallos funcionales.

---

## Estructura del documento por escenario

Cada escenario incluye:

- Precondición
- Pasos numerados
- Resultado(s) esperado(s)
- Criterio de éxito / fallo
- Casos borde / notas

---

## Escenarios de prueba

### 1. Login - Camino feliz

Precondición: Página de login abierta.
Pasos:

1. Ir a `https://opensource-demo.orangehrmlive.com`.
2. Introducir `Admin` en Username.
3. Introducir `admin123` en Password.
4. Pulsar Login.
   Resultados esperados:

- Redirección al Dashboard.
- Widgets / mensaje de bienvenida visibles.
  Criterio de éxito: Dashboard cargado correctamente en < 5s.

### 2. Login - Credenciales inválidas

Precondición: Página de login abierta.
Pasos:

1. Introducir `Admin` / `wrongpassword`.
2. Pulsar Login.
   Resultados esperados:

- Mensaje de error claro (p.ej. "Invalid credentials").
- No redirección.
  Criterio de éxito: Error mostrado y sin acceso.

### 3. Logout y protección de rutas

Precondición: Usuario autenticado.
Pasos:

1. Hacer logout desde el menú de usuario.
2. Intentar acceder a `/dashboard` sin autenticación.
   Resultados esperados:

- Redirección a login.
- Acceso protegido bloqueado.
  Criterio de éxito: Sesión invalidada efectivamente.

### 4. Navegación principal

Precondición: Usuario autenticado.
Pasos:

1. Navegar por los módulos: Dashboard, Admin, PIM, Leave, Time, Recruitment, Performance, Reports.
2. Comprobar títulos/breadcrumbs y que no aparezca 404.
   Resultados esperados:

- Cada módulo carga su vista.
  Criterio de éxito: Menú funcional y sin links rotos.

### 5. PIM - Crear nuevo empleado (happy path)

Precondición: Usuario con permisos PIM.
Pasos:

1. Ir a PIM → Add Employee.
2. Rellenar First Name, Last Name, Employee Id (o usar generado).
3. Guardar.
   Resultados esperados:

- Perfil creado y mostrado con los datos.
  Criterio de éxito: Búsqueda por nombre o ID devuelve el empleado.

### 6. PIM - Validaciones campos obligatorios

Precondición: Form Add Employee abierto.
Pasos:

1. Dejar First Name o Last Name vacío y pulsar Save.
   Resultados esperados:

- Mensajes de validación visibles.
- No creación del registro.
  Criterio de éxito: Validación en front y/o backend.

### 7. PIM - Subir fotografía de empleado

Precondición: Perfil de empleado abierto.
Pasos:

1. Seleccionar imagen JPEG/PNG y subir.
2. Guardar cambios.
   Resultados esperados:

- Imagen visible en el perfil y persistente tras refresh.
  Criterio de éxito: Imagen correctamente vinculada al empleado.
  Caso borde: archivo muy grande o formato inválido → mostrar error útil.

### 8. PIM - Buscar empleado y filtrar

Precondición: Empleados existentes.
Pasos:

1. Ir a Employee List.
2. Buscar por nombre parcial, ID y filtros (job, status).
   Resultados esperados:

- Resultados correctos y paginación si aplica.
  Criterio de éxito: Filtros combinados retornan el subconjunto esperado.

### 9. Admin - CRUD Usuarios

Precondición: Usuario admin.
Pasos:

1. Admin → User Management → Add.
2. Crear usuario con role, employee asociado y password.
3. Editar y desactivar/eliminar según permitidos.
   Resultados esperados:

- Usuario creado, editable y su estado cambia según acción.
  Criterio de éxito: Cambios reflejados en login (si aplica).

### 10. Leave - Solicitar permiso

Precondición: Usuario con permisos para solicitar leave.
Pasos:

1. Leave → Apply.
2. Introducir fechas válidas y motivo.
3. Enviar solicitud.
   Resultados esperados:

- Solicitud en estado "Pending" y visible al manager.
  Criterio de éxito: Solicitud aparece y notificación/cola del approver.

### 11. Leave - Aprobar/Denegar (manager)

Precondición: Solicitud pendiente creada.
Pasos:

1. Loguearse como manager.
2. Ir a Leave → Approvals / Leave List.
3. Aprobar o denegar la solicitud.
   Resultados esperados:

- Estado actualizado y visible por el empleado.
  Criterio de éxito: Persistencia del nuevo estado.

### 12. Recruitment - Añadir candidato y adjuntar CV

Precondición: Acceso al módulo Recruitment.
Pasos:

1. Recruitment → Candidates → Add Candidate.
2. Rellenar datos y adjuntar CV.
3. Guardar.
   Resultados esperados:

- Candidato listado y CV descargable.
  Criterio de éxito: Archivo adjunto accesible.

### 13. Reports - Generar y descargar

Precondición: Datos disponibles.
Pasos:

1. Reports → seleccionar reporte → Generate → Export (CSV/PDF).
2. Descargar archivo.
   Resultados esperados:

- Archivo descargado y legible.
  Criterio de éxito: Contenido coherente y formato correcto.

### 14. UI / Responsiveness

Precondición: App abierta.
Pasos:

1. Cambiar tamaño de ventana (desktop, tablet).
2. Comprobar que elementos no se corten y navegación se mantenga usable.
   Resultados esperados:

- Layout responsivo o legible en tamaños estándar.
  Criterio de éxito: Navegación legible y sin solapamientos.

### 15. Accesibilidad básica

Precondición: Página abierta.
Pasos:

1. Navegar únicamente con teclado (Tab, Enter).
2. Verificar labels y foco visible.
   Resultados esperados:

- Controles accesibles vía teclado con labels.
  Criterio de éxito: No inputs sin etiqueta y foco claro.

### 16. Manejo de errores de servidor

Precondición: Forzar error de backend (simulado).
Pasos:

1. Intentar guardar cambios mientras se simula 500/timeout.
   Resultados esperados:

- Mensaje de error amigable y posibilidad de reintento.
  Criterio de éxito: UI no se bloquea ni crash.

### 17. Persistencia y refresh

Precondición: Registro creado/actualizado.
Pasos:

1. Refresh de la página.
   Resultados esperados:

- Datos persistentes tras reload.
  Criterio de éxito: No pérdida de datos.

### 18. Seguridad básica

Precondición: Usuario autenticado.
Pasos:

1. Intentar acceder a endpoints protegidos con sesión inválida o token expirado.
   Resultados esperados:

- 401/403 y redirección a login si corresponde.
  Criterio de éxito: Recursos protegidos no accesibles sin auth.

---

## Mapeo recomendando para automatización (Playwright)

- `tests/login.spec.ts` — Login/Logout, credenciales inválidas.
- `tests/pim/add-employee.spec.ts` — Añadir/editar empleado, upload foto.
- `tests/admin/user-management.spec.ts` — CRUD usuarios.
- `tests/leave/apply-approve.spec.ts` — Solicitar y aprobar leave (varios roles).
- `tests/recruitment/add-candidate.spec.ts` — Añadir candidato.
- `tests/reports/export.spec.ts` — Generación y descarga de reportes.

---

## Ejemplo de test Playwright (skeleton)

Archivo sugerido: `tests/login.spec.ts`

```typescript
import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("login with valid credentials", async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com");
    await page.fill('input[name="username"]', "Admin");
    await page.fill('input[name="password"]', "admin123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/dashboard|index/);
    await expect(page.locator("text=Welcome")).toBeVisible();
  });

  test("login with invalid credentials shows error", async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com");
    await page.fill('input[name="username"]', "Admin");
    await page.fill('input[name="password"]', "wrongpassword");
    await page.click('button[type="submit"]');
    await expect(page.locator(".oxd-alert-content-wrapper")).toContainText(
      /invalid|incorrect/i
    );
  });
});
```

---

## Comandos (cmd.exe) para ejecutar

```cmd
:: ejecutar todos los tests
npx playwright test

:: ejecutar el test de login específico
npx playwright test tests\login.spec.ts

:: abrir el UI runner de Playwright
npx playwright test --ui
```

---

## Notas y siguientes pasos

- Si quieres, puedo generar automáticamente los archivos `specs/OrangeHRM_Test_Plan.md` y `tests/login.spec.ts` en tu proyecto y ejecutar los tests (si habilitas edición/terminal).
- Siguiente paso recomendado: crear fixtures para múltiples cuentas (manager/employee) si planeas probar workflows de aprobación.
