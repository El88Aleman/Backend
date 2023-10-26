import passport from "passport";
import localStrategy from "passport-local";
import githubStrategy from "passport-github2";
import { config } from "./config.js";
import { createHash, isValidPassword } from "../utils.js";
import { sessionManagerService } from "../dao/index.js";

export const initializePassport = () => {
  // Signup
  passport.use(
    "signupLocalStrategy",
    new localStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },

      async (req, username, password, done) => {
        const { first_name, last_name, age, role } = req.body;

        try {
          const user = await sessionManagerService.loginUser(username);

          // Si no se completan los campos
          if (!first_name || !last_name || !age) {
            return done(null, false);
          }

          // Si el usuario ya está registrado
          if (user) {
            return done(null, false);
          }

          // Si el usuario no está registrado
          const newUser = {
            first_name,
            last_name,
            email: username,
            age,
            password: createHash(password),
            role: "usuario",
          };

          const createdUser = await sessionManagerService.registerUser(newUser);
          return done(null, createdUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Signup con GitHub
  passport.use(
    "signupGithubStrategy",
    new githubStrategy(
      {
        clientID: config.github.clientId,
        clientSecret: config.github.clientSecret,
        callbackURL: `http://localhost:8080/api/sessions${config.github.callbackUrl}`,
      },

      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await sessionManagerService.loginUser(profile.username);

          // Si el usuario ya está registrado
          if (user) {
            return done(null, user);
          }

          // Si el usuario no está registrado
          const newUser = {
            githubUser: true,
            githubName: profile._json.name,
            githubUsername: profile.username,
            role: "usuario",
          };

          const createdUser = await sessionManagerService.registerUser(newUser);
          return done(null, createdUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Login
  passport.use(
    "loginLocalStrategy",
    new localStrategy(
      {
        usernameField: "email",
      },

      async (username, password, done) => {
        try {
          const user = await sessionManagerService.loginUser(username);

          // Si el usuario no existe
          if (!user) {
            return done(null, false);
          }

          // Si la contraseña es incorrecta
          if (!isValidPassword(password, user)) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Serialización
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // Deserialización
  passport.deserializeUser(async (id, done) => {
    const user = await sessionManagerService.getUserById(id);
    done(null, user);
  });
};
