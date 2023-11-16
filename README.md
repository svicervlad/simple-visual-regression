# Quick and simple visual regression testing for your sites

This is a simple visual regression testing tool based on [Playwright](https://playwright.dev/).

## Installation

```bash
npm install
npx playwright install
```

## Usage

Choose needed for you testing browsers in [playwright.config.js](./playwright.config.js) projects section by uncommenting them.

If you do not know what links should be tested, you can use:

- `DOMAIN=<your_site_domain> npx playwright test init` command will generate `tests/links.json` file with all internal links from your home page.
- By sitemap.xml file from your site. Use [online converter](https://www.seowl.co/sitemap-extractor/) to convert it to list and [list to json](https://ytool.net/en/list2json/) to convert it to json. Create `tests/links.json` file and paste json there.
- You can also create `tests/links.json` file manually or use any other way to generate it.

**Note:** `tests/links.json` file should contain array of strings with links to test. Links should be relative to your site domain like `/about` or `/blog/post-1`.

Then run tests first time to collect expected screenshots:

```bash
DOMAIN=<your_site_domain> npx playwright test vr -u
```

Then run tests to compare actual screenshots with expected:

```bash
DOMAIN=<your_site_domain> npx playwright test vr
```

To show report in browser run:

```bash
npx playwright show-report
```

Actually you can get `playwright-report` folder with report and screenshots and open it in browser manually or serve it with any static server.
