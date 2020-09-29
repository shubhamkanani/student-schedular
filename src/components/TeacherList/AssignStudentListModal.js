import React from 'react'

function AssignStudentListModal() {
    const state = useSelector(Student);
    return (
        <React.Fragment>
            <Button onClick={()=>{console.log(state)}}>Assign Students</Button>
        </React.Fragment>
    )
}

export default AssignStudentListModal
