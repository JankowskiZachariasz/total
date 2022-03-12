// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
export const sessionOptions = {
  password: '-- EXAMPLE COOKIE SECRET; CHANGE ME --',
  cookieName: "iron-session/examples/next.js",
  cookieOptions: {
    secure: false,
  },
};
