CREATE TABLE "project"(
  "id" Integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" Text,
  "time_added" Text
);

CREATE TABLE "task"(
  "id" Integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" Text,
  "project_id" Integer,
  "state_id" Integer DEFAULT 1,
  "priority" Real DEFAULT 50
);

CREATE TABLE "task_state"(
  "id" Integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" Text
);

CREATE TABLE "user"(
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

INSERT INTO project (id, name, time_added)
  VALUES
    (1, 'Photor', '2016-01-02 08:08:03'),
    (2, 'Athome', '2016-01-02 08:08:03'),
    (3, 'boda.one', '2016-01-02 08:08:03');

INSERT INTO task (name, project_id)
  VALUES
    ('Task 1', 1),
    ('TP 2', 2),
    ('TP 23', 2);

INSERT INTO user (name)
  VALUES
    ('Marian'),
    ('Katarina');
