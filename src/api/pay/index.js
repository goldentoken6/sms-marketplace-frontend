import { applyPagination } from 'src/utils/apply-pagination'
import { applySort } from 'src/utils/apply-sort'
import { deepCopy } from 'src/utils/deep-copy'
import axios from 'axios'
import { SERVER_URL } from 'src/constants'

class PayApi {
  constructor () {
    this.pay = []
    this.admin_pay = []
  }

  // getPayHistory = async (force, client_id, request = {}) => {
  //   console.log('getSMS request >>> ', request)
  //   const { filters, page, rowsPerPage } = request
  //   if (force || this.pay.length == 0) {
  //     try {
  //       const response = await axios.get(`${SERVER_URL}/sms/${client_id}`, {
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       })

  //       if (response.status === 200) {
  //         this.pay = response.data
  //       } else {
  //         // toast.error("Password Incorrect.");
  //       }
  //     } catch (err) {
  //       console.error('=========Error========', err)
  //       this.pay = []
  //     }
  //   }
  //   let data = deepCopy(this.pay)
  //   let count = data.length

  //   if (typeof filters !== 'undefined') {
  //     data = data.filter(client => {
  //       if (typeof filters.query !== 'undefined' && filters.query !== '') {
  //         let queryMatched = false
  //         const properties = ['content']

  //         properties.forEach(property => {
  //           if (
  //             client[property]
  //               .toLowerCase()
  //               .includes(filters.query.toLowerCase())
  //           ) {
  //             queryMatched = true
  //           }
  //         })

  //         if (!queryMatched) {
  //           return false
  //         }
  //       }

  //       return true
  //     })
  //     count = data.length
  //   }

  //   if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
  //     data = applyPagination(data, page, rowsPerPage)
  //   }

  //   return Promise.resolve({
  //     data,
  //     count
  //   })
  // }

  getAllPay = async (force, request = {}) => {
    const { filters, page, rowsPerPage } = request
    if (force || this.admin_pay.length == 0) {
      try {
        const response = await axios.get(`${SERVER_URL}/pay_history`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response.status === 200) {
          this.admin_pay = response.data
        } else {
          // toast.error("Password Incorrect.");
        }
      } catch (err) {
        console.error('=========Error========', err)
        this.admin_pay = []
      }
    }
    let data = deepCopy(this.admin_pay)
    let count = data.length

    if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
      data = applyPagination(data, page, rowsPerPage)
    }

    return Promise.resolve({
      data,
      count
    })
  }

}

export const payApi = new PayApi()
