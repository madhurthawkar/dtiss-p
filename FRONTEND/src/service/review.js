import axios from "axios"
import { config } from "./config"

export const addReview = (body) => {
    return axios.post(`${config.server}/review/add`, body)
}

export const getMyReview = (userId) => {
    return axios.get(`${config.server}/review/my?userId=${userId}`)
}

export const getAllReviews = () => {
    return axios.get(`${config.server}/review/all`)
}

export const deleteReview = (reviewId, userId) => {
  return axios.delete(`${config.server}/review/${reviewId}?userId=${userId}`)
}

export const getReviewById = (id) => {
  return axios.get(`${config.server}/review/${id}`)
}

export const updateReview = (reviewId, body) => {
  return axios.put(`${config.server}/review/${reviewId}`, body)
}

export const shareReview = (body) => {
  return axios.post(`${config.server}/review/share`, body)
}

export const getSharedReview = (reviewId) => {
  return axios.get(`${config.server}/review/share/${reviewId}`)
}

export const getSharedWithMe = (userId) => {
  return axios.get(
    `${config.server}/review/shared-with-me?userId=${userId}`
  )
}
