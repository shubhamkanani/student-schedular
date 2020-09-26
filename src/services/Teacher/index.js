import axios from 'axios'
export const getTeacherList = (page,size) =>{
    return axios.get(`${process.env.REACT_APP_BASE_API_URL}/teachers?page=${page}&size=${size}`)
        .then(res =>{
            return res.data;
        })
}

export const getTeacherListByFirstName = (name) =>{
    return axios.get(`${process.env.REACT_APP_BASE_API_URL}/teachers/search/findByFirstName?name=${name}`)
        .then(res =>{
            console.log("env : ", process.env.REACT_APP_BASE_API_URL)
            return res.data;
        })
}

export const getTeacherListByLastName = (name) =>{
    return axios.get(`${process.env.REACT_APP_BASE_API_URL}/teachers/search/findByLastName?name=${name}`)
        .then(res =>{
            return res.data;
        })
}