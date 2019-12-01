import React from "react";
import Link from "next/link";

import protectedComponent from "../components/protectedComponent";

function IndexPage(props) {
  return (
    <div>
      <h1>hello</h1>
      <Link href="/notes" as="/notes">
        <a>Notes</a>
      </Link>
      <br />
      <Link href="/todos" as="/todos">
        <a>Todos</a>
      </Link>
    </div>
  );
}

export default protectedComponent(IndexPage);
