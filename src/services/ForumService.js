import axios from 'axios';

const BASE_URL = 'http://localhost:61202';

// Questions API
const getQuestions = () => axios.get(`${BASE_URL}/questions`);
const getQuestionById = (id) => axios.get(`${BASE_URL}/questions/${id}`);
const createQuestion = (question) => axios.post(`${BASE_URL}/questions`, question);
const updateQuestion = (id, question) => axios.put(`${BASE_URL}/questions/${id}`, question);
const deleteQuestion = (id) => axios.delete(`${BASE_URL}/questions/${id}`);
const updateQuestionPartial = (id, fields) => axios.patch(`${BASE_URL}/questions/${id}`, fields);

// Comments API
const getComments = () => axios.get(`${BASE_URL}/comments`);
const getCommentById = (id) => axios.get(`${BASE_URL}/comments/${id}`);
const createComment = (comment) => axios.post(`${BASE_URL}/comments`, comment);
const updateComment = (id, comment) => axios.put(`${BASE_URL}/comments/${id}`, comment);
const deleteComment = (id) => axios.delete(`${BASE_URL}/comments/${id}`);
const updateCommentPartial = (id, fields) => axios.patch(`${BASE_URL}/comments/${id}`, fields);

export {
    getQuestions, getQuestionById, createQuestion, updateQuestion,
    deleteQuestion, updateQuestionPartial, getComments, getCommentById,
    createComment, updateComment, deleteComment, updateCommentPartial
};