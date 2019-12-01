import React from "react";
import Link from "next/link";
import Router from "next/router";

import protectedComponent from "../components/protectedComponent";
import TodoService from "../services/todo";
import { useInput } from "../hooks/input";

const TodosPage = ({ todos, auth }) => {
  const { value: description, bind: descriptionBind } = useInput("");
  const { value: reminderDate, bind: reminderDateBind } = useInput(
    new Date().toISOString().slice(0, 10)
  );

  const handleSubmit = async evt => {
    evt.preventDefault();
    await TodoService.postTodo(
      auth.token,
      description,
      new Date(reminderDate).toISOString().slice(0, 10)
    );
    Router.reload();
  };

  return (
    <div>
      <h1>todos</h1>
      <Link href="/" as="/">
        <a>home</a>
      </Link>
      <form onSubmit={handleSubmit}>
        <label>
          description : <input type="text" {...descriptionBind} />
        </label>
        <br />
        <label>
          remind date : <input type="date" {...reminderDateBind} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
      {todos.length > 0 ? (
        todos.map((element, index) => (
          <div key={`note-${index}`}>
            <h2>{`${element.description}`}</h2>
            <p>{`at ${element.reminderDate}`}</p>
            <p>{`Created at: ${element.createdDate}`}</p>
          </div>
        ))
      ) : (
        <p>you have no note</p>
      )}
    </div>
  );
};

TodosPage.getInitialProps = async ctx => {
  const token = ctx.auth.token;
  const todos = await TodoService.fetchTodos(token);

  return { todos, auth: ctx.auth };
};

export default protectedComponent(TodosPage);
