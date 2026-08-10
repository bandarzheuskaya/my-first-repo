// @ts-check
import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/LoginPage'
import {InventoryPage} from '../pages/InventoryPage'


test('Успешный логин', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');

  const title = await inventoryPage.getPageTitle()
  await expect(title).toBe('Products')
})