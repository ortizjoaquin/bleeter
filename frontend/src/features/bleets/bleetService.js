import axios from 'axios'
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

// Get all bleets
const getAllBleets = async () => {
  const response = await axios.get(API_URL)
  return response.data
}
//Delete bleet
const deleteBleet = async (bleetId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(API_URL + bleetId, config)
  return response.data
}

const bleetService = {
  createBleet,
  getAllBleets,
  deleteBleet
}


export default bleetService