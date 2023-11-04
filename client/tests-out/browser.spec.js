"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
(0, test_1.test)("has title", async ({ page }) => {
    await page.goto("/");
    await (0, test_1.expect)(page).toHaveTitle(/MoneyBucket/);
});
(0, test_1.test)("has spending table", async ({ page }) => {
    await page.goto("/");
    await (0, test_1.expect)(page.getByRole("table", { name: "spending-table" })).toBeVisible();
});
//# sourceMappingURL=browser.spec.js.map