import { deepCopy } from 'src/utils/deep-copy'
import axios from 'axios'
import { SERVER_URL } from 'src/constants'

class SettingsApi {
  constructor () {
  }

  getSettings = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/settings`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 200) {
        return deepCopy(response.data[0]);
      } else {
        // toast.error("Password Incorrect.");
      }
    } catch (err) {
      console.error('=========Error========', err)
    }
    return null;
  }

  setSettings = async (settings) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${SERVER_URL}/settings`, 
          {
            sms_cost: settings.sms_cost
          },
          {  
            headers: {
              'Content-Type': 'application/json'
            }
          })
        if (response.status === 200) {
          resolve({
            result: 'ok'
          })
        } else {
          // toast.error("Password Incorrect.");
          reject(new Error('Update setting failed'))
        }
      } catch (err) {
        console.error('=========Error========', err)
        reject(new Error('Internal server error'))
      }
    });
  }
}

export const settingsApi = new SettingsApi()
