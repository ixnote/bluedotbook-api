import { ExtractJwt, Strategy } from "passport-jwt";
import { UserModel } from "../models/user.model.js";

export default function (passport) {
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET,
        passReqToCallback: true,
      },
      function (req, jwtPayload, done) {
        return UserModel.findById(jwtPayload.id)
          .then((user) => {
            let details = user;
            if (user && user.blocked) {
              details = null;
            }
            req.user = details;
            return done(null, details);
          })
          .catch((err) => {
            return done(null, false, err);
          });
      }
    )
  );
}
