import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import client from "../../apollo-client";
import { gql } from "@apollo/client";

export default withIronSessionApiRoute(async (req, res) => {
  
const { email, password } = await req.body;
  try {
    
    let data = await client.mutate({
            mutation: gql`
      mutation myMutation($email: String!, $password: String!){
            authenticateUserWithPassword(
              email: $email,
              password: $password){
          token,
          item{
            isAdmin,
            name
          }
        }
      }
      `,
      variables:{
        "email": email,
        "password": password
      }
    });
    var token = data.data.authenticateUserWithPassword.token;
    var person = data.data.authenticateUserWithPassword.item;
    const user = { isLoggedIn: true, hasAccess: false, isAdmin: person.isAdmin, token: token, name: person.name };
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}, sessionOptions);
