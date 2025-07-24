import React, { useState, useRef, useEffect } from "react";

// Dummy initial projects for demonstration
const initialProjects = [
  { id: 1, name: "Website Redesign" },
  { id: 2, name: "Marketing Q3" },
  { id: 3, name: "Mobile App" }
];

export default function ProjectList() {
  const [projects, setProjects] = useState(initialProjects);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  // Focus input when entering edit mode
  useEffect(() => {
    if (editingId !== null && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingId]);

  // Handle 'Edit' click
  const startEditing = (project) => {
    setEditingId(project.id);
    setEditName(project.name);
    setError("");
  };

  // Validate for duplicates (case-insensitive, excluding the currently edited project)
  const isDuplicate = (name) => {
    return (
      projects.filter(
        (p) =>
          p.id !== editingId && p.name.trim().toLowerCase() === name.trim().toLowerCase()
      ).length > 0
    );
  };

  // Commit name change
  const saveEdit = () => {
    const trimmed = editName.trim();
    if (!trimmed) {
      setError("Project name cannot be empty.");
      return false;
    }
    if (isDuplicate(trimmed)) {
      setError("Project name must be unique.");
      return false;
    }
    setProjects((prev) =>
      prev.map((p) => (p.id === editingId ? { ...p, name: trimmed } : p))
    );
    setEditingId(null);
    setEditName("");
    setError("");
    return true;
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setError("");
  };

  // Handle key events while editing
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveEdit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
  };

  // Real-time validation on name change
  const handleEditChange = (e) => {
    const val = e.target.value;
    setEditName(val);
    // Immediate validation feedback
    if (!val.trim()) {
      setError("Project name cannot be empty.");
    } else if (isDuplicate(val)) {
      setError("Project name must be unique.");
    } else {
      setError("");
    }
  };

  // Handle blur (save if valid)
  const handleInputBlur = () => {
    // Only save if not already showing an error
    if (!error) {
      saveEdit();
    }
  };

  return (
    <div>
      <h2>Projects</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {projects.map((project) => (
          <li
            key={project.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            {editingId === project.id ? (
              <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={editName}
                  onChange={handleEditChange}
                  onKeyDown={handleInputKeyDown}
                  onBlur={handleInputBlur}
                  aria-label="Edit project name"
                  style={{
                    padding: "4px 8px",
                    border: error ? "1px solid red" : "1px solid #ccc",
                    borderRadius: 4,
                    fontSize: 16,
                  }}
                  maxLength={50}
                />
                {error && (
                  <span style={{ color: "red", marginTop: 2, fontSize: 13 }}>
                    {error}
                  </span>
                )}
              </div>
            ) : (
              <>
                <span style={{ flex: 1, fontSize: 17 }}>{project.name}</span>
                <button
                  onClick={() => startEditing(project)}
                  style={{
                    marginLeft: 8,
                    fontSize: 15,
                    padding: "2px 10px",
                    cursor: "pointer"
                  }}
                  aria-label={`Edit project name for "${project.name}"`}
                  disabled={editingId !== null}
                >
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
