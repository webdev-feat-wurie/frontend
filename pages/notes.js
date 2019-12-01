import React from "react";
import Link from "next/link";
import Router from "next/router";

import protectedComponent from "../components/protectedComponent";
import NoteService from "../services/note";
import { useInput } from "../hooks/input";

const NotesPage = ({ notes, auth }) => {
  const { value: note, bind: noteBind } = useInput("");

  const handleSubmit = async evt => {
    evt.preventDefault();
    await NoteService.postNote(auth.token, note);
    Router.reload();
  };

  return (
    <div>
      <h1>notes</h1>
      <Link href="/" as="/">
        <a>Home</a>
      </Link>
      <form onSubmit={handleSubmit}>
        <label>
          add new note : <input type="text" {...noteBind} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {notes.length > 0 ? (
        notes.map((element, index) => (
          <div key={`note-${index}`}>
            <h2>{`${element.note}`}</h2>
            <p>{`Created at: ${element.createdDate}`}</p>
          </div>
        ))
      ) : (
        <p>you have no note</p>
      )}
    </div>
  );
};

NotesPage.getInitialProps = async ctx => {
  const token = ctx.auth.token;
  const notes = await NoteService.fetchNotes(token);

  return { notes, auth: ctx.auth };
};

export default protectedComponent(NotesPage);
