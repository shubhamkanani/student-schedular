import axios from 'axios'
export const getTeacherList = (page,size,sortName,sortType) =>{
    return axios.get(`http://tower.watu.fi:8080/teachers?page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res =>{
            return res.data;
        })
}

// export const getTeacherListByFirstName = (name) =>{
//     return axios.get(`http://tower.watu.fi:8080/teachers/search/findByFirstName?name=${name}`)
//         .then(res =>{
//             console.log("env : ", process.env.REACT_APP_BASE_API_URL)
//             return res.data;
//         })
// }

export const findTeacherListByFirstNameAndLastName = (firstName,lastName,sortName,sortType) =>{
    return axios.get(`http://tower.watu.fi:8080/teachers/search/findByFirstNameIgnoreCaseContainingOrLastNameIgnoreCaseContaining?firstName=${firstName}&lastName=${lastName}&sort=${sortName},${sortType}`)
        .then(res =>{
            return res.data;
        })
}
