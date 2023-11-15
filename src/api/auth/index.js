import { wait } from 'src/utils/wait'
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { SERVER_URL } from 'src/constants';

const STORAGE_KEY = 'users'

// NOTE: We use sessionStorage since memory storage is lost after page reload.
//  This should be replaced with a server call that returns DB persisted data.

const getPersistedUsers = () => {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY)

    if (!data) {
      return null
    }

    return JSON.parse(data)
  } catch (err) {
    console.error(err)
    return []
  }
}

const persistUser = user => {
  try {
    const data = JSON.stringify(user)
    sessionStorage.setItem(STORAGE_KEY, data)
  } catch (err) {
    console.error(err)
  }
}

class AuthApi {
  async signIn (request) {
    const { email, password } = request

    await wait(500)

    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${SERVER_URL}/login`,
          {
            email: request.email,
            pwd: request.password
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        console.log('login response >>> ', response.data);

        if(response.status === 200)
        {
          const token = response.data.token;
          resolve({
            accessToken: token
          })
        } else {
          reject(new Error('Login failed'))
        }
        // Merge static users (data file) with persisted users (browser storage)

        // Find the user
        // const user = mergedUsers.find((user) => user.email === email);

        // if (!user || (user.password !== password)) {
        //   reject(new Error('Please check your email and password'));
        //   return;
        // }

        // // Create the access token
        // const accessToken = sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        /*resolve({
          accessToken:
            'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJFbWFpbCI6InRlc3RAZ21haWwuY29tIiwiSXNzdWVyIjoiSXNzdWVyIiwiZXhwIjoxNjc5NzUxNjY1LCJpYXQiOjE2Nzg4ODc2NjV9.QHvX6LWsCVeQYJKqEb2044aEbQZnva0GyTy_EKrrFTM'
        })*/
      } catch (err) {
        console.error('[Auth Api]: ', err)
        reject(new Error('Internal server error'))
      }
    })
  }

  async signUp (request) {
    const { email, name, password } = request

    await wait(1000)

    return new Promise((resolve, reject) => {
      try {
        // Check if a user already exists
        // let user = mergedUsers.find((user) => user.email === email);
        // if (user) {
        //   reject(new Error('User already exists'));
        //   return;
        // }
        // user = {
        //   id: createResourceId(),
        //   avatar: undefined,
        //   email,
        //   name,
        //   password,
        //   plan: 'Standard'
        // };
        // persistUser(user);
        // const accessToken = sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        // resolve({ accessToken });
      } catch (err) {
        console.error('[Auth Api]: ', err)
        reject(new Error('Internal server error'))
      }
    })
  }

  me (request) {
    const { accessToken } = request

    return new Promise((resolve, reject) => {
      try {
        // Decode access token
        const decodedToken = jwt_decode(accessToken)
        console.log(' >>> decodeToken >>> ', decodedToken);
        // // Find the user
        const { email, role, name, id, smsCost } = decodedToken;
        resolve({
          email: email,
          role: role,
          name: name, 
          id: id,
          smsCost: smsCost
        });
      } catch (err) {
        console.error('[Auth Api]: ', err)
        reject(new Error('Internal server error'))
      }
    })
  }
}

export const authApi = new AuthApi()
