import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req, res) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.user,
    });
  } else {
    res.json({
      isLoggedIn: false,
      hasAccess: false,
      isAdmin: false,
      token: "",
      name: ""
    });
  }
}
