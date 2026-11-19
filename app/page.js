"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "taskly-tasks-v1";

export default function Home() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setTasks(JSON.parse(saved));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, loaded]);

  const remaining = tasks.filter((task) => !task.completed).length;
  const completed = tasks.length - remaining;

  const visibleTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((task) => !task.completed);
    if (filter === "completed") return tasks.filter((task) => task.completed);
    return tasks;
  }, [tasks, filter]);

  function addTask(event) {
    event.preventDefault();
    const trimmed = taskText.trim();
    if (!trimmed) return;

    setTasks((current) => [
      { id: `${Date.now()}-${Math.random()}`, text: trimmed, completed: false },
      ...current
    ]);
    setTaskText("");
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  function clearCompleted() {
    setTasks((current) => current.filter((task) => !task.completed));
  }

  return (
    <main className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="app-card" aria-label="To-do list">
        <header className="header">
          <div className="brand-row">
            <div className="brand-icon" aria-hidden="true">✓</div>
            <span className="brand-name">taskly</span>
            <span className="brand-tag">YOUR DAILY PLANNER</span>
          </div>
          <div className="intro">
            <p className="eyebrow">A LITTLE PROGRESS, EVERY DAY</p>
            <h1>Make today <span>count.</span></h1>
            <p className="subtitle">Keep your tasks in one place and get things done.</p>
          </div>
        </header>

        <form className="task-form" onSubmit={addTask}>
          <label className="sr-only" htmlFor="new-task">Add a task</label>
          <span className="input-plus" aria-hidden="true">＋</span>
          <input
            id="new-task"
            value={taskText}
            onChange={(event) => setTaskText(event.target.value)}
            placeholder="What needs to get done?"
            maxLength={120}
          />
          <button className="add-button" type="submit" disabled={!taskText.trim()}>
            Add task <span aria-hidden="true">↗</span>
          </button>
        </form>

        <div className="stats-row">
          <div className="stat">
            <span className="stat-number">{remaining}</span>
            <span className="stat-label">To do</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">{completed}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="progress-wrap">
            <div className="progress-copy">
              <span>Daily progress</span>
              <strong>{tasks.length ? Math.round((completed / tasks.length) * 100) : 0}%</strong>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${tasks.length ? (completed / tasks.length) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>

        <div className="list-heading">
          <h2>Your tasks <span>{tasks.length}</span></h2>
          <div className="filters" role="group" aria-label="Filter tasks">
            {[
              ["all", "All"],
              ["active", "Active"],
              ["completed", "Done"]
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={`filter-button ${filter === value ? "selected" : ""}`}
                onClick={() => setFilter(value)}
                aria-pressed={filter === value}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="task-list">
          {!loaded ? (
            <div className="empty-state"><span className="empty-icon">⌛</span><p>Loading your tasks…</p></div>
          ) : visibleTasks.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">{filter === "completed" ? "✦" : "☀"}</span>
              <h3>{filter === "completed" ? "Nothing completed yet" : filter === "active" ? "All caught up!" : "Your list is fresh"}</h3>
              <p>{filter === "active" ? "You have no pending tasks. Nice work." : "Add a task above and it will show up here."}</p>
            </div>
          ) : (
            visibleTasks.map((task) => (
              <article className={`task-item ${task.completed ? "is-complete" : ""}`} key={task.id}>
                <button
                  type="button"
                  className="check-button"
                  onClick={() => toggleTask(task.id)}
                  aria-label={task.completed ? `Mark ${task.text} as active` : `Complete ${task.text}`}
                  aria-pressed={task.completed}
                >
                  {task.completed ? "✓" : ""}
                </button>
                <span className="task-text">{task.text}</span>
                <span className="task-status">{task.completed ? "DONE" : "TASK"}</span>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.text}`}
                  title="Delete task"
                >
                  ×
                </button>
              </article>
            ))
          )}
        </div>

        <footer className="footer">
          <span>Made for focused days <span className="heart">♥</span></span>
          {completed > 0 && (
            <button type="button" className="clear-button" onClick={clearCompleted}>
              Clear completed
            </button>
          )}
        </footer>
      </section>
      <p className="page-note">Your tasks are saved in this browser automatically.</p>
    </main>
  );
}
