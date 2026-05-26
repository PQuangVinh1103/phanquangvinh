# phanquangvinh.com

Personal website and blog for Phan Quang Vinh, built with Astro and Keystatic.

## Local development

Install dependencies:

```bash
npm install
```

Run the Astro dev server:

```bash
npm run dev
```

Open the website:

```text
http://127.0.0.1:4321/
```

Open Keystatic:

```text
http://127.0.0.1:4321/keystatic
```

## Blog workflow

Blog posts live in:

```text
src/content/posts
```

Keystatic is configured in local mode, so saving a post in the admin UI writes a `.mdoc` file into the repo. New uploaded cover images are stored in:

```text
public/images/blog
```

Only posts with this frontmatter are shown publicly:

```yaml
status: published
```

## Build

```bash
npm run build
```

The project uses the Vercel adapter because Keystatic needs server-side routes.

## Mirror to GitHub

Create an empty GitHub repo first, then add it as a second remote:

```bash
git remote add github https://github.com/YOUR_USERNAME/phanquangvinh.com.git
git push github main
```

After that, push to both GitLab and GitHub when needed:

```bash
git push origin main
git push github main
```

Or make GitHub the primary remote:

```bash
git remote set-url origin https://github.com/YOUR_USERNAME/phanquangvinh.com.git
git push -u origin main
```

If you want Keystatic editing on the deployed website, move or mirror the repo to GitHub and switch `keystatic.config.ts` from local storage to GitHub storage.
