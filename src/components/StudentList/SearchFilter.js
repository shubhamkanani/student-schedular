import React from 'react'
import { Form, Select, Input, Button } from 'antd'

const { Option } = Select;
const SearchFilter = ({changeInput,searchList}) => {

    return (
        <Form layout="inline">
            <Form.Item>
                <Input
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    onChange={changeInput}
                />
            </Form.Item>
            <Button onClick={searchList}> Search </Button>
        </Form>
    )
}

export default SearchFilter
