import React from 'react'
import { Form, Select, Input, Button } from 'antd'

const { Option } = Select;
const SearchFilter = ({changeInput,defultType,searchList}) => {

    return (
        <Form layout="inline">
            <Form.Item label="Name">
                <Input
                    type="text"
                    placeholder="Enter First Name"
                    name="name"
                    onChange={changeInput}
                />
            </Form.Item>
            <Button onClick={searchList}> Search </Button>
        </Form>
    )
}

export default SearchFilter
