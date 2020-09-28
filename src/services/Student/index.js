import axios from 'axios'
export const getStudentListById = (TeacherId) =>{
    return axios.get(`http://tower.watu.fi:8080/students/search/findByTeacherId?id=${TeacherId}`)
        .then(res =>{
            console.log(res.data);
            return res.data;
        })
}

export const getStudentList = (page,size) =>{
    return axios.get(`http://tower.watu.fi:8080/students?page=${page}&size=${size}`)
        .then(res =>{
            return res.data;
        })
}

export const getStudentListByFirstName = (name) =>{
    return axios.get(`http://tower.watu.fi:8080/students/search/findByFirstName?name=${name}`)
        .then(res =>{
            return res.data;
        })
}

export const getStudentListByLastName = (name) =>{
    return axios.get(`http://tower.watu.fi:8080/students/search/findByLastName?name=${name}`)
        .then(res =>{
            return res.data;
        })
}