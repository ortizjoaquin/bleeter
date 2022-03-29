import axios from 'axios'
// import { acceptsEncodings } from 'express/lib/request'
const API_URL = '/api/bleeter/'
// Create new bleet
const createBleet = async (bleetData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL, bleetData, config)
  return response.data
}
const bleetService = {
  createBleet
}

export default bleetService