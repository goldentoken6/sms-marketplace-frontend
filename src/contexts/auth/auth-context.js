import { createContext, useCallback, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { authApi } from "src/api/auth";

const STORAGE_KEY = "accessToken";

var ActionType;
(function (ActionType) {
  ActionType["INITIALIZE"] = "INITIALIZE";
  ActionType["SIGN_IN"] = "SIGN_IN";
  ActionType["SIGN_UP"] = "SIGN_UP";
  ActionType["SIGN_OUT"] = "SIGN_OUT";
})(ActionType || (ActionType = {}));

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  SIGN_IN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  SIGN_UP: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  SIGN_OUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({
  ...initialState,
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = window.sessionStorage.getItem(STORAGE_KEY);

      if (accessToken) {
        const user = await authApi.me({ accessToken });

        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: ActionType.INITIALIZE,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [dispatch]);

  useEffect(
    () => {
      initialize();
    },
    []
  );

  const signIn = useCallback(
    async (email, password) => {
      const { accessToken } = await authApi.signIn({ email, password });
      const user = await authApi.me({ accessToken });
      console.log(' >>> user >>> ', user);

      sessionStorage.setItem(STORAGE_KEY, accessToken);

      dispatch({
        type: ActionType.SIGN_IN,
        payload: {
          user,
        },
      });
    },
    [dispatch]
  );

  const signUp = useCallback(
    async (email, name, password) => {
      const { accessToken } = await authApi.signUp({ email, name, password });
      const user = await authApi.me({ accessToken });

      sessionStorage.setItem(STORAGE_KEY, accessToken);

      dispatch({
        type: ActionType.SIGN_UP,
        payload: {
          user,
        },
      });
    },
    [dispatch]
  );

  const signOut = useCallback(async () => {
    sessionStorage.removeItem(STORAGE_KEY);
    dispatch({ type: ActionType.SIGN_OUT });
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
