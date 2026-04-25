---
name: add-viewer-project
description: Add a new project to the MarkdownViewer app by creating a content folder with markdown files and optional renderer config. Use when the user asks to add a project, create a new project in the viewer, set up a new content folder, or configure a new project for MarkdownViewer.
---
# Add Viewer Project

## Scope

Use for `P:/MarkdownTool/MarkdownViewer` when the user wants a new project visible in the viewer.

## Workflow

1. **Create the project folder**

   ```
   content/<project-id>/
   ```

   - `project-id` becomes the URL slug and display title (e.g. `my-campaign` → `My Campaign`)
   - Use lowercase kebab-case

2. **Add markdown files**

   Drop `.md`, `.markdown`, or `.mdx` files anywhere inside the folder.  
   Subdirectories are fine — they appear as folders in the sidebar file tree.

3. **(Optional) Add renderer config**

   Create `content/<project-id>/.rpg-renderer/config.json` to override defaults.  
   Only include keys you want to change — the rest merge from `DEFAULT_RPG_CONFIG` in `src/types.ts`.

   Commonly customized fields:

   ```json
   {
     "version": 1,
     "entityTypes": {
       "npc":      { "label": "NPC",      "color": "#6366f1", "icon": "user" },
       "location": { "label": "Location", "color": "#0ea5e9", "icon": "map-pin" }
     },
     "preview": {
       "theme": "dark"
     },
     "renderer": {
       "wikiLinks": true,
       "highlightCode": true
     }
   }
   ```

   Available icon keys: `user`, `map-pin`, `shield`, `package`, `skull`, `scroll`, `biohazard`, `atom`, `info`, `alert`, `flame`, `book`, `flag`

4. **Restart dev server or rebuild**

   Projects are discovered via eager Vite globs at build time — no code changes needed.

   - Dev: restart `npm run dev`
   - Production: run `npm run build`

## Result

The project appears in the home page list and sidebar automatically.
