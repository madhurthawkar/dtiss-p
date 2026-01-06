import axios from 'axios'
import { config } from './config'


export async function register(firstName, lastName, email, phone, dob, password) {
  try {
    // url to send the request
    const url = `${config.server}/user/register`

    // create a body object
    const body = { firstName, lastName, email, phone, dob, password }

    // send POST request
    const response = await axios.post(url, body)

    // return response body
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}

export async function login(email, password) {
  try {
    // create url
    const url = `${config.server}/user/login`

    // create body
    const body = { email, password }

    // send the POST request
    const response = await axios.post(url, body)

    // return response body
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}

export const getAllUsers = (userId) => {
  return axios.get(`${config.server}/user/all?userId=${userId}`)
}

export const getProfile = (userId) => {
  return axios.get(`${config.server}/user/profile?userId=${userId}`)
}

export const updateProfile = (body) => {
  return axios.put(`${config.server}/user/profile`, body)
}

export const changePassword = (body) => {
  return axios.put(`${config.server}/user/change-password`, body)
}
