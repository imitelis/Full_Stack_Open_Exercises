import axios from 'axios'

import { asObject } from '../reducers/anecdoteReducer'

const baseUrl = process.env.REACT_APP_API_URL;

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = asObject(content)
    const response = await axios.post(baseUrl, object)
    return response.data
}

const voteFor = async (id, votedObject) => {
    const voteUrl = `${baseUrl}/${id}`
    const newObject = { content: votedObject.content, id: votedObject.id, votes: votedObject.votes + 1 }
    const request = axios.put(voteUrl, newObject)
    return request.then((response) => {
        return response.data
      }
    )
}

const deleteOne = async (id) => {
    const deleteUrl = `${baseUrl}/${id}`
    const request = axios.delete(deleteUrl);
    return request.then((response) => {
        return response.data;
    });
}

const anecdoteService = { getAll, createNew, voteFor, deleteOne }

export default anecdoteService