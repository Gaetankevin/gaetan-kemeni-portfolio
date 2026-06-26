<!-- BEGIN:nextjs-agent-rules -->
# Agent instructions for SosJuristes

This project uses Next.js 16 with the App Router, React 19, TypeScript, and Tailwind CSS. Treat this as a modern Next.js setup and follow the current framework conventions rather than older patterns.

## Project guidance
- Keep changes small, focused, and aligned with the existing app structure in app/.
- Prefer Server Components by default; add "use client" only when interactivity is required.
- Use TypeScript for new code and keep props and state explicit.
- Prefer Tailwind utility classes for styling and keep UI accessible and responsive.
- Avoid introducing new dependencies unless the task explicitly requires it.
- Preserve existing behavior unless the task clearly asks for a change.

## Working rules
- Read the relevant Next.js guidance in node_modules/next/dist/docs/ before making changes that may affect routing, rendering, or app conventions.
- Favor minimal diffs and existing patterns over large rewrites.
- When the request is ambiguous, ask for clarification instead of guessing.
- Before finishing work, verify it with npm run lint and, when relevant, npm run build.
<!-- END:nextjs-agent-rules -->
