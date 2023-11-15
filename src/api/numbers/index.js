import { applyPagination } from 'src/utils/apply-pagination'
import { applySort } from 'src/utils/apply-sort'
import { deepCopy } from 'src/utils/deep-copy'
import { number, emails, invoices, logs } from './data'
import { SERVER_URL } from 'src/constants'
import axios from 'axios'

class NumbersApi {
  constructor () {
    this.numbers = []
  }

  getNumbers = async (force, userid, request = {}) => {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request
    
    if (force || this.numbers.length == 0) {
      try {
        const response = await axios.post(
          `${SERVER_URL}/numberquery`,
          {
            userid: userid
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        if (response.status === 200) {
          this.numbers = response.data
        } else {
        }
      } catch (err) {
        console.error('=========Error========', err)
        this.numbers = []
      }
    }

    let data = deepCopy(this.numbers)
    let count = data.length
    let unfiltered = 0;

    data.filter(number => {
      if (number['type'] == "") {
        unfiltered++;
      }
    });

    if (typeof filters !== 'undefined') {
      data = data.filter(number => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          let queryMatched = false
          const properties = ['number']

          properties.forEach(property => {
            if (
              number[property]
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

        if (typeof filters.subscribed !== 'undefined') {
          if (number.status !== 'subscribed') {
            return false
          }
        }

        if (typeof filters.unsubscribed !== 'undefined') {
          if (number.status !== 'unsubscribed') {
            return false
          }
        }

        if (typeof filters.mobile !== 'undefined') {
          if (number.type !== 'mobile') {
            return false
          }
        }

        if (typeof filters.landline !== 'undefined') {
          if (number.type !== 'landline') {
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
      count,
      unfiltered,
    })
  }

  filterNumbers = async (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${SERVER_URL}/filterNumbers`,
          {
            userid: userId
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        if (response.status === 200) {
          return resolve({
            success: true
          })
        } else {
          return reject(new Error('Filter failed'))
        }
      } catch (err) {
        console.error('=========Error========', err)
        return reject(new Error('Internal server error'))
      }
    });
  }

  getNumber (request) {
    return Promise.resolve(deepCopy(number))
  }

  submitNumber (request) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${SERVER_URL}/numbers`,
          {
            userid: request.id,
            numbers: request.numbers
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        if (response.status === 200) {
          resolve({
            result: 'OK'
          })
        } else {
          reject(new Error('Import number failed'))
        }
      } catch (err) {
        console.error(err)
        reject(new Error('Internal server error'))
      }
    })
  }

  checkDuplicate (request) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${SERVER_URL}/checkduplicate`,
          {
            userid: request.id,
            numbers: request.numbers
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        if (response.status === 200) {
          resolve(response.data)
        } else {
          reject(new Error('Import number failed'))
        }
      } catch (err) {
        console.error(err)
        reject(new Error('Internal server error'))
      }
    })
  }

  deleteNumber (request) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${SERVER_URL}/deleteNumber`,
          {
            userid: request.id,
            numberIds: request.numberIds
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        if (response.status === 200) {
          request.numberIds.forEach(numberId => {
            let index = this.numbers.findIndex(element => element.id == numberId);
            if (index > -1) {
              this.numbers.splice(index, 1);
            }
          });
          resolve({result: true})
        } else {
          reject(new Error('Import number failed'))
        }
      } catch (err) {
        console.error(err)
        reject(new Error('Internal server error'))
      }
    })
  }

}

export const numbersApi = new NumbersApi()
