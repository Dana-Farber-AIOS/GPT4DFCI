import { test, expect } from "@playwright/test";

test("page has GPT4DFCI in title", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/GPT4DFCI/);
});

test("landing display appears on page load", async ({ page }) => {
    await page.goto("/");

    const LandingDisplay = await page.getByTestId("landing-display");

    await expect(LandingDisplay).toBeVisible();
});
