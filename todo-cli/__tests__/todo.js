const todoList = require('../todo.js'); // Adjust the path if necessary

const formattedDate = (d) => {
  return d.toISOString().split('T')[0];
};

var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(new Date(new Date().setDate(dateToday.getDate() - 1))); // Define yesterday
const tomorrow = formattedDate(new Date(new Date().setDate(dateToday.getDate() + 1))); // Define tomorrow

test('creates a new todo', () => {
  const todos = todoList();
  const todoItem = { title: 'New Todo', dueDate: today, completed: false };
  todos.add(todoItem);
  expect(todos.all.length).toBe(1);
  expect(todos.all[0].title).toBe('New Todo');
});

test('marks a todo as completed', () => {
  const todos = todoList();
  todos.add({ title: 'Complete me', dueDate: today, completed: false });
  todos.markAsComplete(0);
  expect(todos.all[0].completed).toBe(true);
});

test('retrieves overdue items', () => {
  const todos = todoList();
  todos.add({ title: 'Overdue Todo', dueDate: yesterday, completed: false });
  const overdueTodos = todos.overdue();
  expect(overdueTodos.length).toBe(1);
  expect(overdueTodos[0].title).toBe('Overdue Todo');
});

test('retrieves due today items', () => {
  const todos = todoList();
  // Only add one todo item for this test
  todos.add({ title: 'Today’s Todo', dueDate: today, completed: false });
  const dueTodayTodos = todos.dueToday();
  expect(dueTodayTodos.length).toBe(1); // Expecting only the one we just added
  expect(dueTodayTodos[0].title).toBe('Today’s Todo');
});

test('retrieves due later items', () => {
  const todos = todoList();
  todos.add({ title: 'Due Later Todo', dueDate: tomorrow, completed: false });
  const dueLaterTodos = todos.dueLater();
  expect(dueLaterTodos.length).toBe(1);
  expect(dueLaterTodos[0].title).toBe('Due Later Todo');
});
