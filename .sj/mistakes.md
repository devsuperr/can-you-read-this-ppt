# Known mistakes to avoid

Studio Jungle reads this before every build/edit. Add recurring project-specific failures here so the AI does not repeat them.

## Routing and pages
- Do not create duplicate Home, Landing, Login, Signup, or Not Found pages when one already exists.
- Do not claim a page exists or is wired without checking the file and router/App entry.
- When adding a route, update the router/App file and any relevant nav/CTA links in the same change.

## Build failures seen often
- Do not put unescaped apostrophes inside single-quoted TypeScript strings; use double quotes or template literals.
- Do not use Node-only imports such as `path` or `__dirname` in Vite browser config unless the project already supports it.
- Do not create local imports without also emitting the imported files.
- Do not use Tailwind dynamic class names that the compiler cannot see.

## Product behavior
- Do not say “done” unless code changed or you verified the requested behavior already exists.
- Do not push database/schema/auth/cloud changes unless the user explicitly selected or requested them.
- Do not rebuild from scratch for a small edit; inspect and patch the relevant surface only.
