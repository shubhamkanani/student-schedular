import React from 'react'
import { Form, Select, Input, Button } from 'antd'

const { Option } = Select;
const SearchFilter = ({changeInput,defultType,searchList}) => {
    const onKeyEnter = (e) => {
        //alert("not enter")
        if(e.keyCode == 13){
            searchList();
        }
    }
    return (
        <Form layout="inline">
            <Form.Item>
                <Input
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    onKeyDown={onKeyEnter}
                    onChange={changeInput}
                    
                />
            </Form.Item>
            <Button onClick={searchList}> Search </Button>
        </Form>
    )
}

export default SearchFilter
