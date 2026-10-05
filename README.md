# Naomi Moua — Financial Analysis Website

This folder contains the complete GitHub Pages website for the financial analysis project.

## Files

- `index.html` — website structure and all four tabs/pages
- `style.css` — design and responsive layout
- `script.js` — navigation and financial calculations

## Financial calculations

1. Holding-Period Return
   - HPR = (Ending Price − Beginning Price + Dividends) / Beginning Price

2. Annualized Return
   - Annualized Return = (1 + HPR)^(1 / Years) − 1

3. Volatility / Sample Standard Deviation
   - Sample SD = sqrt[Σ(x − mean)^2 / (n − 1)]
   - Optional annualization assumes monthly input observations and multiplies by sqrt(12).

4. Sharpe Ratio
   - Sharpe Ratio = (Portfolio Return − Risk-Free Rate) / Portfolio Volatility

## GitHub Pages setup

1. Create a GitHub repository. A good repository name is:
   `naomi-moua-financial-analysis`

2. Upload `index.html`, `style.css`, and `script.js` to the repository's main branch.

3. Open the repository's **Settings → Pages**.

4. Under **Build and deployment**, choose:
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/ (root)`

5. Save and wait for GitHub Pages to publish.

Your URL will normally be:
`https://YOUR-GITHUB-USERNAME.github.io/naomi-moua-financial-analysis/`

## Before submitting

- Replace the placeholder contact text with your school email if required.
- Test every calculator using the examples shown on the Financial Analysis page.
- Open the published URL in a private/incognito browser window to confirm it works without being logged into GitHub.
- Keep copies/screenshots of your AI development conversations for the required AI-prompts PDF.
