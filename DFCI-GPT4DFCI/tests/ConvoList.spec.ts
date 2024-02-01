import { test, expect } from "@playwright/test";

test("new list item is created when prompt is submitted", async ({ page }) => {
    await page.goto("/");

    const countBefore = await page
        .getByTestId("convo-list")
        .getByRole("listitem")
        .count();

    console.log(`Count before ${countBefore}`);
    const PromptInput = await page.getByTestId("prompt-input");

    await PromptInput.click();
    await PromptInput.fill("Hello, world");
    await PromptInput.press("Enter");

    const countAfter = await page
        .getByTestId("convo-list")
        .getByRole("listitem")
        .count();

    await expect(countAfter).toBe(countBefore + 1);
});

// test("archive list item works", async ({ page }) => {
// });

// test("delete list item works", async ({ page }) => {
// });
