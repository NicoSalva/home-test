import { test, expect } from '@playwright/test';
import SearchPage from '../pages/search.page';

test.describe('Search Tests', () => {
    let searchPage;

    test.beforeEach(async ({ page }) => {
        searchPage = new SearchPage(page);
        await searchPage.navigate();
    });

    test('TEST09 - Search Success', async ({ page }) => {
        const searchWord = 'pepperoni';
        await searchPage.performSearch(searchWord);

        const resultText = await searchPage.waitForFinalResult();
        expect(resultText).toBe(`Found one result for ${searchWord}`);
    });

    test('TEST10 - Search Empty', async ({ page }) => {
        await searchPage.performSearch('');
        const resultText = await searchPage.waitForFinalResult();
        expect(resultText).toBe('Please provide a search word.');
    });
});
