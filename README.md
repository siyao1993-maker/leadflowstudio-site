# Leadflow Studio Website

Live website for **Leadflow Studio**: websites and leadflows for local businesses.

Production domain:

```text
https://leadflowstudio.tech
```

## Structure

```text
index.html          # homepage
bedankt.html        # thank-you page after form submission
404.html            # not-found page
robots.txt          # crawler instructions
sitemap.xml         # sitemap for search engines
demos/              # demo portfolio websites
```

## Deployment

This site is static HTML/CSS/JS and is designed for Cloudflare Pages.

Cloudflare Pages settings:

```text
Framework preset: None
Build command: leave empty
Build output directory: /
Root directory: /
```

## Contact form

The contact form currently submits through FormSubmit directly to:

```text
Siyao1993@gmail.com
```

On first submission, FormSubmit may send a confirmation email. Confirm it once, then future form submissions should be delivered normally.

## Local preview

From this folder:

```bash
python -m http.server 8080
```

Open:

```text
http://127.0.0.1:8080
```

## Cloudflare Workers & Pages Git deployment

Cloudflare's newer dashboard may create a **Worker with Assets** instead of the old separate Pages flow. That is OK for this static website.

Use these settings:

```text
Repository: siyao1993-maker/leadflowstudio-site
Branch: main
Build command: leave empty, or use: echo "No build needed"
Deploy command: npx wrangler deploy
Root directory: /
```

The `wrangler.toml` file tells Cloudflare to deploy the repository root as static assets.

