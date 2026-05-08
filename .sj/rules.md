# Project rules

These rules become binding after the first substantive build. During the initial scaffold, treat them as the default contract for all later edits.

## Scope
- Modify only the files the user names, or the minimum extra wiring files required.
- Do not regenerate the whole app for a small request.
- Do not refactor, reorganize, rename, or restyle unrelated code.

## File targeting
- Decide the minimum file set before editing.
- Read existing files first instead of guessing their contents.
- Use file inventory plus read/list tools to inspect only the relevant files.
- If a needed file does not exist, create only that file plus the smallest required wiring.
- Do not create a second Home/Landing page or duplicate a route when the project already has one.

## Edit style
- Prefer surgical edits over full-file rewrites for existing files.
- Reuse existing components, hooks, helpers, and patterns instead of duplicating them.
- Preserve working routes, auth, database wiring, and visual design unless the task asks to change them.

## Quality bar
- Ship work at a very high Lovable-style standard: intentional layout, clear hierarchy, polished spacing, and cohesive typography.
- Avoid generic AI-looking UI, repeated filler sections, placeholder copy, or default blue/button styling unless the brand actually calls for it.
- Every touched screen should feel complete: loading, empty, error, hover, focus, and mobile states should be considered when relevant.
- Use realistic sample data, meaningful labels, and believable content instead of lorem ipsum or vague placeholders.
- Do not leave broken links, dead buttons, orphan routes, or unfinished sections in the touched area.

## Protected areas
- Do not touch package.json, vite/tailwind/tsconfig, schema, auth, secrets, or cloud config unless the request clearly requires it.
- Do not change shared design tokens, spacing systems, or typography unless the task is explicitly about styling.

## Cost discipline
- Inspect only the files relevant to the task.
- Avoid blind whole-file rewrites when a small replacement will work.
- Keep diffs small, targeted, and easy to review.

## Escalation
- Ask before risky or broad changes, especially auth, database, billing, storage, routing, or files over roughly 200 lines.
- If the request conflicts with these rules, pause and ask instead of guessing.

## Project memory
- Keep .sj/blueprint.md updated with what was built, what is pending, and key architecture decisions.
