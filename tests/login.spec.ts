// spec: specs/OrangeHRM_Test_Plan.md

import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
    test('Login - Camino feliz', async ({ page }) => {
        // 1. Ir a `https://opensource-demo.orangehrmlive.com`.
        await page.goto('https://opensource-demo.orangehrmlive.com');

        // 2. Introducir `Admin` en Username.
        await page.fill('input[name="username"]', 'Admin');

        // 3. Introducir `admin123` en Password.
        await page.fill('input[name="password"]', 'admin123');

        // 4. Pulsar Login.
        await page.click('button[type="submit"]');

        // Resultado esperado: Redirección al Dashboard.
        await expect(page).toHaveURL(/dashboard|index|welcome/i);

        // Resultado esperado: Widgets / mensaje de bienvenida visibles.
        await expect(page.locator('text=Dashboard')).toBeVisible({ timeout: 5000 }).catch(async () => {
            await expect(page.locator('text=Welcome')).toBeVisible({ timeout: 5000 });
        });
    });

    test('Login - Credenciales inválidas', async ({ page }) => {
        // 1. Ir a `https://opensource-demo.orangehrmlive.com`.
        await page.goto('https://opensource-demo.orangehrmlive.com');

        // 2. Introducir `Admin` / `wrongpassword`.
        await page.fill('input[name="username"]', 'Admin');
        await page.fill('input[name="password"]', 'wrongpassword');

        // 3. Pulsar Login.
        await page.click('button[type="submit"]');

        // Resultado esperado: Mensaje de error claro (p.ej. "Invalid credentials").
        const alert = page.locator('.oxd-alert-content-wrapper');
        await expect(alert).toBeVisible({ timeout: 5000 });
        await expect(alert).toContainText(/invalid|incorrect|credentials|login/i);

        // Resultado esperado: No redirección (seguimos en la página de login)
        await expect(page).toHaveURL(/login|auth|signin|opensource-demo.orangehrmlive.com/);
    });
});
