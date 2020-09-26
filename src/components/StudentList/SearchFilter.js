import React from 'react'
import { Form, Select, Input, Button } from 'antd'

const { Option } = Select;
const SearchFilter = ({changeInput,defultType,searchList}) => {

    return (
        <Form layout="inline">
            <Form.Item>
                <Select
                    defaultValue={defultType}
                    onChange={(val) =>
						changeInput({ target: { name: 'searchType', value: val } })
					}
                >
                    <Option value="firstName">First Name</Option>
                    <Option value="lastName">Last Name</Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Input
                    type="text"
                    placeholder="Enter Name"
                    name="searchValue"
                    onChange={changeInput}
                />
            </Form.Item>
            <Button onClick={searchList}> Search </Button>
        </Form>
    )
}

export default SearchFilter
