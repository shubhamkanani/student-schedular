import axios from 'axios'
export const getStudentListById = (TeacherId) =>{
    return axios.get(`${process.env.REACT_APP_BASE_API_URL}/students/search/findByTeacherId?id=${TeacherId}`)
        .then(res =>{
            console.log(res.data);
            return res.data;
        })
}

export const getStudentList = (page,size) =>{
    return axios.get(`${process.env.REACT_APP_BASE_API_URL}/students?page=${page}&size=${size}`)
        .then(res =>{
            return res.data;
        })
}

export const getStudentListByFirstName = (name) =>{
    return axios.get(`${process.env.REACT_APP_BASE_API_URL}/students/search/findByFirstName?name=${name}`)
        .then(res =>{
            return res.data;
        })
}

export const getStudentListByLastName = (name) =>{
    return axios.get(`${process.env.REACT_APP_BASE_API_URL}/students/search/findByLastName?name=${name}`)
        .then(res =>{
            return res.data;
        })
}