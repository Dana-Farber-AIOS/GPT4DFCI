import { test, expect } from "@playwright/test";

test("enter clears input", async ({ page }) => {
    await page.goto("/");

    const PromptInput = await page.getByTestId("prompt-input");

    await PromptInput.click();
    await PromptInput.fill("Hello, world");
    await PromptInput.press("Enter");

    await expect(PromptInput).toBeEmpty();
});

test("shift enter creates a new line", async ({ page }) => {
    await page.goto("/");

    const PromptInput = await page.getByTestId("prompt-input");

    await PromptInput.click();
    await PromptInput.fill("Hello, world");
    await PromptInput.press("Shift+Enter");

    await expect(PromptInput).toHaveText("Hello, world\n");
});

test("new line expands input", async ({ page }) => {
    await page.goto("/");

    const PromptInput = await page.getByTestId("prompt-input");

    await PromptInput.click();
    await PromptInput.fill("Hello, world");
    await PromptInput.press("Shift+Enter");

    await expect(PromptInput).toHaveJSProperty("rows", 2);
});
