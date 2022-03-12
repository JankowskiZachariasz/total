import { useEffect, useState  } from "react";
import Router from "next/router";
import useSWR from "swr";
import fetchJson from "./fetchJson";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR("/api/user", fetchJson,);// { refreshInterval: 30*1000 });
  //const [isOnlineState, setIsOnlineState] = useState(isOnline);

  let token = null;
  try { token = user.token; } catch(e){}
  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    try { token = user.token; } catch(e){}
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      //Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);
  
  
  return { user, mutateUser, token};
}
