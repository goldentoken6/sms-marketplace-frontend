import { applyPagination } from 'src/utils/apply-pagination'
import { applySort } from 'src/utils/apply-sort'
import { deepCopy } from 'src/utils/deep-copy'
import axios from 'axios'
import { SERVER_URL } from 'src/constants'

class SMSApi {
  constructor () {
    this.sms = []
    this.admin_sms = []
  }

  getSMS = async (force, client_id, request = {}) => {
    console.log('getSMS request >>> ', request)
    const { filters, page, rowsPerPage } = request
    if (force || this.sms.length == 0) {
      try {
        const response = await axios.get(`${SERVER_URL}/sms/${client_id}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response.status === 200) {
          this.sms = response.data
        } else {
          // toast.error("Password Incorrect.");
        }
      } catch (err) {
        console.error('=========Error========', err)
        this.sms = []
      }
    }
    let data = deepCopy(this.sms)
    let count = data.length

    if (typeof filters !== 'undefined') {
      data = data.filter(client => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          let queryMatched = false
          const properties = ['content']

          properties.forEach(property => {
            if (
              client[property]
                .toLowerCase()
                .includes(filters.query.toLowerCase())
            ) {
              queryMatched = true
            }
          })

          if (!queryMatched) {
            return false
          }
        }

        return true
      })
      count = data.length
    }

    if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
      data = applyPagination(data, page, rowsPerPage)
    }

    return Promise.resolve({
      data,
      count
    })
  }

  getAllSMS = async (force, request = {}) => {
    console.log('getSMS request >>> ', request)
    const { filters, page, rowsPerPage } = request
    if (force || this.admin_sms.length == 0) {
      try {
        const response = await axios.get(`${SERVER_URL}/allsms`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response.status === 200) {
          this.admin_sms = response.data
        } else {
          // toast.error("Password Incorrect.");
        }
      } catch (err) {
        console.error('=========Error========', err)
        this.admin_sms = []
      }
    }
    let data = deepCopy(this.admin_sms)
    let count = data.length

    if (typeof filters !== 'undefined') {
      data = data.filter(client => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          let queryMatched = false
          const properties = ['content']

          properties.forEach(property => {
            if (
              client[property]
                .toLowerCase()
                .includes(filters.query.toLowerCase())
            ) {
              queryMatched = true
            }
          })

          if (!queryMatched) {
            return false
          }
        }

        return true
      })
      count = data.length
    }

    if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
      data = applyPagination(data, page, rowsPerPage)
    }

    return Promise.resolve({
      data,
      count
    })
  }


  getSMSEntry = async (smsId) => {
    try {
      const response = await axios.get(`${SERVER_URL}/sms_history/${smsId}`, {
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
    // return Promise.resolve(deepCopy(client))
  }

  getSMSAnalytics = async (client_id) => {
    try {
      const response = await axios.get(`${SERVER_URL}/sms_analytics/${client_id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 200) {
        return deepCopy(response.data);
      } else {
        // toast.error("Password Incorrect.");
      }
    } catch (err) {
      console.error('=========Error========', err)
    }
    return null;
    // return Promise.resolve(deepCopy(client))
  }

  getAdminSMSAnalytics = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/sms_analytics`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 200) {
        return deepCopy(response.data);
      } else {
        // toast.error("Password Incorrect.");
      }
    } catch (err) {
      console.error('=========Error========', err)
    }
    return null;
    // return Promise.resolve(deepCopy(client))
  }

  deleteSMSHistory = async (client_id, histories) => {
    try {
      const response = await axios.post(`${SERVER_URL}/deletesms`, 
      {
        userid: client_id, 
        histories: histories
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 200) {
        histories.forEach(smsid => {
          let index = this.sms.findIndex(element => element.id == smsid);
          if (index > -1) {
            this.sms.splice(index, 1);
          }
        });
        return true;
      } else {
        // toast.error("Password Incorrect.");
      }
    } catch (err) {
      console.error('=========Error========', err)
    }
    return null;
    // return Promise.resolve(deepCopy(client))
  }

}

export const smsApi = new SMSApi()
