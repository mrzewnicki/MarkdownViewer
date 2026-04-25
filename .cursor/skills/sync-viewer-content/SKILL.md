---
name: sync-viewer-content
description: >-
  Mirrors a local RPG markdown project into MarkdownViewer `content/<projectId>` using
  `viewer-link.json` under `.rpg-renderer`. Use when the user asks to update viewer
  content, sync the project to the viewer, refresh published content, or run a
  content sync from their RPG folder.
---

# Sync viewer content from a local project

## Scope

For `P:/MarkdownTool/MarkdownViewer` (or the workspace that contains `content/`).

## `viewer-link.json` format

In each project folder, optional file:

`content/<projectId>/.rpg-renderer/viewer-link.json`

```json
{
  "version": 1,
  "sourcePath": "C:/absolute/path/to/your/authoring/project-root"
}
```

- `sourcePath` must be the **folder** that corresponds to the viewer project (same tree as `content/<projectId>` after sync).
- Prefer **forward slashes** in JSON. It is the machine-specific folder where the user edits notes (often outside the repo).
- The committed template is `content/<projectId>/.rpg-renderer/viewer-link.json.example` — copy to `viewer-link.json` (gitignored) and set `sourcePath`. New projects: add the same pair under their `content/<id>/.rpg-renderer/`.

## Workflow (agent)

1. **Resolve the project**  
   - From the user request (e.g. "zombie"), or  
   - The only `content/*` project if unambiguous, or  
   - Ask which `projectId` to sync.

2. **Load the link**  
   - Read `content/<projectId>/.rpg-renderer/viewer-link.json`.  
   - If missing, copy `viewer-link.json.example` to `viewer-link.json`, set `sourcePath` from the user, then run the sync.  
   - If `sourcePath` is still a placeholder, stop and ask for the absolute path.

3. **Sync** (Windows)  
   - `dest` = absolute path to `MarkdownViewer/content/<projectId>` in the workspace.  
   - If `content/<projectId>/.rpg-renderer/viewer-link.json` already exists, read and keep its `sourcePath` in memory, or copy the file to a temp path. **`/MIR` deletes files that exist only under `dest`**, so it will remove `viewer-link.json` and `viewer-link.json.example` unless they also exist under `<sourcePath>`. After robocopy, if `viewer-link.json` is missing, write it back (same `sourcePath` as before, or from step 2).  
   - Run:

   ```text
   robocopy "<sourcePath>" "<dest>" /MIR /XD .git /R:2 /W:2
   ```

   - Robocopy exit codes 0–7 are success in practice; 8+ = failure.  
   - If `<dest>/.git` was copied (rare), delete that directory — viewer content must not include a nested `.git`.  
   - If the user is not on Windows, use `rsync -a --delete` with equivalent paths and exclude `.git`.

4. **Verify (optional but preferred)**  
   - From the MarkdownViewer repo: `npm run build`.

5. **Notes**  
   - Do not commit `viewer-link.json` (it is gitignored).  
   - WIP files (`*.wip.md` or paths under a `.wip` directory segment) are still excluded at viewer **build** time by `content-loader.ts`; the mirror is a full copy of the authoring tree.

## When the user has no `viewer-link.json` yet

Create `content/<projectId>/.rpg-renderer/viewer-link.json` with the path they provide, then sync. They can also duplicate `viewer-link.json.example` manually.
