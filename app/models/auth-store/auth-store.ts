import { types, flow } from "mobx-state-tree"
import auth from "@react-native-firebase/auth"

let authStateSubscriber = null

export const AuthStore = types
  .model("AuthStore", {
    isCheckingAuth: types.optional(types.boolean, true),
    isLoggingIn: types.optional(types.boolean, false),
    isLoggingOut: types.optional(types.boolean, false),
    isSendingPasswordReset: types.optional(types.boolean, false),
    isSigningUp: types.optional(types.boolean, false),
    email: types.maybeNull(types.string),
  })
  .actions((self) => {
    return {
      afterCreate: () => {
        if (authStateSubscriber) {
          return
        }
        authStateSubscriber = auth().onAuthStateChanged((user) => {
          if (user) {
            self.setUser(user)
          } else {
            self.clearUser()
          }
        })
        self.isCheckingAuth = false
      },

      beforeDestroy: () => {
        if (authStateSubscriber) {
          authStateSubscriber()
        }
      },

      setUser: (user) => {
        if (user && user.email) {
          self.email = user.email
        }
      },

      clearUser: () => {
        self.email = null
      },

      loginWithEmail: flow(function* loginWithEmail(email: string, password: string) {
        self.isLoggingIn = true
        try {
          yield auth().signInWithEmailAndPassword(email, password)
          console.log("User account signed in!")
        } catch (err) {
          console.error(err)
        } finally {
          self.isLoggingIn = false
        }
      }),

      signUpWithEmail: flow(function* signUpWithEmail(email: string, password: string) {
        self.isSigningUp = true
        try {
          yield auth().createUserWithEmailAndPassword(email, password)
          console.log("User account created & signed in!")
        } catch (err) {
          if (err.code === "auth/email-already-in-use") {
            console.log("That email address is already in use!")
          }

          if (err.code === "auth/invalid-email") {
            console.log("That email address is invalid!")
          }

          console.error(err)
        } finally {
          self.isSigningUp = false
        }
      }),

      sendPasswordReset: flow(function* sendPasswordReset(email: string) {
        self.isSendingPasswordReset = true
        try {
          yield auth().sendPasswordResetEmail(email)
          console.log("Password reset email sent!")
          return true
        } catch (err) {
          if (err.code === "auth/invalid-email") {
            console.log("That email address is invalid!")
          }

          console.error(err)
          return false
        } finally {
          self.isSendingPasswordReset = false
        }
      }),

      logout: flow(function* logout() {
        self.isLoggingOut = true
        try {
          yield auth().signOut()
          console.log("User signed out!")
          return true
        } catch (err) {
          console.error(err)
          return false
        } finally {
          self.isLoggingOut = false
        }
      }),
    }
  })
  .views((self) => {
    return {
      get isLoggedIn() {
        return !!self.email
      },
    }
  })
