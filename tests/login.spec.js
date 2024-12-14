import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login.page';

test.describe('Login Tests', () => {
    test('TEST01 - Login Success', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigate();

        await loginPage.login('johndoe19', 'supersecret');

        const welcomeMessage = await loginPage.getWelcomeMessage();
        expect(welcomeMessage).toContain('johndoe19');
    });

    test('TEST02 - Login Failure A - Incorrect Credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
      
        await loginPage.navigate();
      
        await loginPage.login('wronguser', 'wrongpassword');
      
        const errorMessage = await loginPage.returnLoginMessage('Wrong credentials');
        expect(errorMessage).toBe('WRONG CREDENTIALS');
      });

      test('TEST03 - Login Failure B - Blank Username and Password', async ({ page }) => {
        const loginPage = new LoginPage(page);
      
        await loginPage.navigate();
      
        await loginPage.login('', '');
      
        const errorMessage = await loginPage.returnLoginMessage('Fields can not be empty');
        expect(errorMessage).toBe('FIELDS CAN NOT BE EMPTY');
      });

    
});

