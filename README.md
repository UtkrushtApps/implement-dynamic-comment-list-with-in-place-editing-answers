1. **Prepare the State**: Set up React `useState` hooks for the project list, the id of the project being edited (`editingId`), the current input value (`editName`), and the error message (`error`).
2. **Edit Initiation**: When 'Edit' is clicked, set `editingId` to the project's id, `editName` to its current name, and clear errors.
3. **Input Focus**: Use a `ref` and `useEffect` so the input field is focused and text selected when switching to edit mode.
4. **Edit Field & Validation**:
   - Show an input in place of the name only for the project being edited. 
   - On every change, validate for empty and duplicate names (case-insensitive, excluding currently edited project). Display error text below the input as needed.
5. **Keyboard Handling**: 
   - On `Enter`, attempt to save if valid (empty or duplicate errors block save).
   - On `Escape`, cancel and restore the original name.
6. **Blur Handling**: On blur, save if valid. (Do not save if error exists.)
7. **Commit Edit**: Update the relevant project name in local component state when saving. Only allow updating if the name is not empty and unique (case-insensitive).
8. **Button State**: Only one project can be edited at a time, so disable all other 'Edit' buttons while editing.
9. **No External Disruptions**: All logic is self-contained, so the rest of the dashboard continues operating as before.