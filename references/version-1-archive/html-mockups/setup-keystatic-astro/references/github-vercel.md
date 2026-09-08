# GitHub and Vercel Keystatic Reference

Use this reference when the user wants GitHub mirroring, production `/keystatic`, or Vercel deployment.

## GitHub Mirror

Check remotes:

```bash
git remote -v
```

Add GitHub as a second remote:

```bash
git remote add github https://github.com/OWNER/REPO.git
git push github main
```

If `git push` cannot prompt for credentials in the current execution environment, instruct the user to run it in their terminal and use:

- Username: their GitHub username
- Password: a GitHub PAT

On macOS, save credentials:

```bash
git config --global credential.helper osxkeychain
```

If Terminal cannot read a project under `Documents`, either grant Full Disk Access or move/copy the repo to `~/Projects`.

## Production Authoring Mode

Local mode:

```ts
storage: { kind: 'local' }
```

Use local mode for writing posts at `http://127.0.0.1:4321/keystatic`. It writes files into the working tree and then the author commits/pushes.

GitHub mode:

```ts
storage: {
  kind: 'github',
  repo: 'OWNER/REPO',
}
```

Use GitHub mode when the deployed `/keystatic` should let authorized users write posts back to GitHub. Users must authenticate with GitHub and have write access to the repo. Do not present production `/keystatic` as public editing.

## Vercel

Use `@astrojs/vercel` with:

```js
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [react(), markdoc(), keystatic()],
});
```

Connect the GitHub repo to Vercel. Build command is:

```bash
npm run build
```

For GitHub mode, configure the Keystatic GitHub app/OAuth values as environment variables in Vercel according to the current Keystatic docs. Browse official Keystatic docs before filling exact variable names because this integration can change.

## Access Control

For a personal site, prefer this progression:

1. Local mode while the site is being built.
2. GitHub mode once the GitHub repo and Vercel deploy are stable.
3. Add Vercel Deployment Protection or another access layer if `/keystatic` should not be publicly visible.
