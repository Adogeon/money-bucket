import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localfiles:5173/");

  await expect(page).toHaveTitle(/MoneyBucket/);
});

test("has spending table", async ({ page }) => {
  await page.goto("http://localfiles:5173");

  await expect(page.getByRole("table", { name: "spending-table" })).toBeVisible;
});
