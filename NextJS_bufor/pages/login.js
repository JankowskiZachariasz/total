import React, { useEffect, useState } from "react";
import Login_Old_project from "../components/pages/Login";
import useUser from "../lib/useUser";

export default function Login(props) {

  const { user, mutateUser } = useUser();

  return (
    <div>
      <Login_Old_project 
      user={user}
      mutateUser={mutateUser}
      updateHistory={props.updateHistory}
      ></Login_Old_project>
    </div>
  );
}


