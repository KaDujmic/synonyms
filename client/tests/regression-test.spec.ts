import { test, expect } from '@playwright/test';

test.describe('Page Flow Regression Test', () => {
  test('should add synonym to existing word', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('http://localhost:5173');
    
    // Search for "s" and focus on input field
    await page.fill('#search-bar-input', 's');
    await page.focus('#search-bar-input');
    
    // Wait for search results dropdown to appear and click the first result
    await page.waitForSelector('.search-bar-results');
    const firstResult = await page.locator('.search-result-item').first();
    await firstResult.click();
    
    // Verify the URL contains the clicked word
    await page.waitForURL(/\/synonym\/[^\/]+$/);
    const currentUrl = page.url();
    expect(currentUrl).toContain('/synonym/');
    
    // Click on synonym-card__synonyms-add
    await page.click('.synonym-card__synonyms-add');
    
    // Type "test 123" in the synonym-card__synonyms-input-field
    await page.fill('.synonym-card__synonyms-input-field input[type="text"]', 'test 123');
    
    // Click SAVE in synonym-card__synonyms-actions
    await page.click('.synonym-card__synonyms-actions button:has-text("SAVE")');
    
    // Verify the synonym was added (optional verification)
    await page.waitForTimeout(1000); // Wait for any async operations
  });

  test('should create a new word with synonyms', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('http://localhost:5173');
    
    // Search for "test" and click search
    await page.fill('#search-bar-input', 'test');
    await page.click('button:has-text("Search")');
    
    // Wait for navigation to create page (404 is expected when word doesn't exist)
    await page.waitForURL(/\/synonym\/create\?word=test$/);
    
    // Verify the word input field has the value "test"
    await expect(page.locator('.create-synonym-page__word-input')).toHaveValue('test');

    // Find suggest-field__input-field and type wellhellothere
    await page.fill('.suggest-field__input-field input[type="text"]', 'wellhellothere');
    
    // Click on create-synonym-page__add-synonym-btn
    await page.click('.create-synonym-page__add-synonym-btn');
    
    // Verify that a new create-synonym-page__synonym-item appears in the list
    await page.waitForSelector('.create-synonym-page__synonym-item');
    const synonymItem = await page.locator('.create-synonym-page__synonym-item').last();
    await expect(synonymItem.getByText('wellhellothere')).toBeVisible();
    
    // Click on suggest-field__input-field and type satisfied
    await page.click('.suggest-field__input-field input[type="text"]');
    await page.fill('.suggest-field__input-field input[type="text"]', 'satisfied');
    
    // Wait for suggestions and click the first one
    await page.waitForSelector('.suggest-field__suggestions');
    const firstSuggestion = await page.locator('.suggest-field__suggestion').first();
    await firstSuggestion.click();
    
    // Check if satisfied is visible
    await expect(page.getByText('satisfied')).toBeVisible();

    // Click save button
    await page.click('.create-synonym-page__save-btn');

    await page.waitForTimeout(1000);

    // Wait for redirect to /synonym/test
    await page.waitForURL(/\/synonym\/test$/);

    // Verify the word input field has the value "test"
    await expect(page.locator('.synonym-card__title')).toContainText('test');

  });

  test('should test homepage features', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('http://localhost:5173');
    
    // Test Random Discovery - click the SVG in the h3 containing "Random Discovery"
    const randomDiscoveryH3 = page.locator('.home-page__features .feature h3').filter({ hasText: 'Random Discovery' });
    const randomDiscoverySvg = randomDiscoveryH3.locator('svg');
    
    // Save the initial random word title
    const initialWord = await page.locator('.synonym-card__title').textContent();
    await randomDiscoverySvg.click();
    await page.waitForTimeout(1000);
    const newWord = await page.locator('.synonym-card__title').textContent();
    expect(newWord).not.toBe(initialWord);
        
    // Test Smart Search - should focus the search bar
    const smartSearchH3 = page.locator('.home-page__features .feature h3').filter({ hasText: 'Smart Search' });
    const smartSearchSvg = smartSearchH3.locator('svg');
    await smartSearchSvg.click();
    
    // Verify search bar is focused
    await expect(page.locator('#search-bar-input')).toBeFocused();
    
    // Test Add Your Own - should redirect to create page
    const addYourOwnH3 = page.locator('.home-page__features .feature h3').filter({ hasText: 'Add Your Own' });
    const addYourOwnSvg = addYourOwnH3.locator('svg');
    await addYourOwnSvg.click();
    
    // Verify redirect to create page
    await page.waitForURL(/\/synonym\/create$/);
  });
});
