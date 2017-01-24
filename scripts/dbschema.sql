CREATE TABLE "project"(
  "id" Integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" Text,
  "time_added" Text
);

CREATE TABLE "task"(
  "id" Integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" Text,
  "project_id" Integer,
  "state_id" Integer,
  "priority" Real
);

CREATE TABLE "task_state"(
  "id" Integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" Text
);

INSERT INTO task_state (id, name)
  VALUES
    (1, 'todo'),
    (2, 'in-progress'),
    (3, 'blocked'),
    (4, 'postponed'),
    (5, 'done');
