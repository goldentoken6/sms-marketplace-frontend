import { applyPagination } from 'src/utils/apply-pagination'
import { applySort } from 'src/utils/apply-sort'
import { deepCopy } from 'src/utils/deep-copy'
import { client } from './data'
import axios from 'axios'
import { SERVER_URL } from 'src/constants'

class ClientsApi {
  constructor () {
    this.clients = []
  }

  getClients = async (force, request = {}) => {
    console.log('getClients request >>> ', request)
    const { filters, page, rowsPerPage, sortBy, sortDir } = request
    if (force || this.clients.length == 0) {
      try {
        const response = await axios.get(`${SERVER_URL}/clients`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response.status === 200) {
          this.clients = response.data
          console.log('response.data >>>', response.data)
          console.log('concated clients >>>', this.clients)
        } else {
          // toast.error("Password Incorrect.");
        }
      } catch (err) {
        console.error('=========Error========', err)
        this.clients = []
      }
    }
    console.log('clients >>> ', this.clients)
    let data = deepCopy(this.clients)
    let count = data.length

    if (typeof filters !== 'undefined') {
      data = data.filter(client => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          let queryMatched = false
          const properties = ['name']

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

    if (typeof sortBy !== 'undefined' && typeof sortDir !== 'undefined') {
      data = applySort(data, sortBy, sortDir)
    }

    if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
      data = applyPagination(data, page, rowsPerPage)
    }

    return Promise.resolve({
      data,
      count
    })
  }

  getClient = async (clientId) => {
    try {
      const response = await axios.get(`${SERVER_URL}/client/${clientId}`, {
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

  deleteClients = async clientIdArray => {
    try {
      const response = await axios.delete(
        `${SERVER_URL}/deleteClients`,
        {
          data: {
            ids: JSON.stringify(clientIdArray)
          } 
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      if (response.status === 200) {
        clientIdArray.forEach(deleteId => {
          let index = this.clients.findIndex(element => element.id == deleteId);
          if (index > -1) {
            this.clients.splice(index, 1);
          }
        });
        console.log('after delete this.clients >>>', this.clients);
        return true;
      } else {
        // toast.error("Password Incorrect.");
      }
    } catch (err) {
      console.error('=========Error========', err)
    }
    return false
  }

  updateClient = async (clientId, clientData) => {
    try {
      const response = await axios.put(`${SERVER_URL}/client/${clientId}`, 
      {
        data: clientData
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 200) {
        return true;
      } else {
        // toast.error("Password Incorrect.");
      }
    } catch (err) {
      console.error('=========Error========', err)
    }
    return false;
    // return Promise.resolve(deepCopy(client))
  }
}

export const clientsApi = new ClientsApi()
