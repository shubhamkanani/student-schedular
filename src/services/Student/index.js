import axios from 'axios'
export const getStudentListById = (TeacherId) =>{
    return axios.get(`http://tower.watu.fi:8080/students/search/findByTeacherId?id=${TeacherId}`)
        .then(res =>{
            console.log(res.data);
            return res.data;
        })
        .catch(err =>{
            alert(err.message);
        })
}

export const getStudentList = (page,size,sortName,sortType) =>{
    return axios.get(`http://tower.watu.fi:8080/students?page=${page}&size=${size}&sort=${sortName}&${sortName}.dir=${sortType}`)
        .then(res =>{
            return res.data;
        })
        .catch(err =>{
            alert(err.message);
        })
}

export const getStudentDetail = (studentId) =>{
    return axios.get(`http://tower.watu.fi:8080/students/${studentId}`)
        .then(res =>{
            return res.data;
        })
        .catch(err =>{
            alert(err.message);
        })
}

export const findStudentListByFirstNameAndLastName = (firstName,lastName) =>{
    return axios.get(`http://tower.watu.fi:8080/students/search/findByFirstNameIgnoreCaseContainingOrLastNameIgnoreCaseContaining?firstName=${firstName}&lastName=${lastName}`)
        .then(res =>{
            return res.data;
        })
        .catch(err =>{
            alert(err.message);
        })
}

export const assignStudentlistToTeacher = (teacherId,studentIds) =>{
    return axios.get(`http://tower.watu.fi:8080/plan/${teacherId}/${studentIds}`)
        .then(res =>{
            return res.data;
        })
        .catch(err =>{
            alert(err.message);
        })
}