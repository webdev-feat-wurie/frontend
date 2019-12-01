import fetch from "isomorphic-unfetch";

const TODOS_SERVICE_URL =
  "http://localhost:21701" || process.env.TODOS_SERVICE_URL;

const fetchTodos = async jwtToken => {
  const authHeader = `Bearer ${jwtToken}`;
  const response = await fetch(`${TODOS_SERVICE_URL}/todos`, {
    headers: {
      Authorization: authHeader
    }
  });
  const json = await response.json();
  return json;
};

const postTodo = async (jwtToken, description, reminderDate) => {
  const authHeader = `Bearer ${jwtToken}`;
  const response = await fetch(`${TODOS_SERVICE_URL}/todos`, {
    method: "POST",
    headers: {
      Authorization: authHeader,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      description,
      reminder_date: reminderDate
    })
  });
  const json = await response.json();
  return json;
};

export default {
  fetchTodos,
  postTodo
};
