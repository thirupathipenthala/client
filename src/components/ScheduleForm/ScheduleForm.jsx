import React, { useState } from 'react';
import { Form, DatePicker } from 'element-react';
const ScheduleForm = (props) => {
    const [formData, updateForm] = useState({});
    return <>
        <div className="schedule-form">
            <Form>
                <Form.Item>
                    <DatePicker
                        isShowTime={true}
                        value={formData.date}
                        placeholder="Pick a day"
                        onChange={date=>{
                            console.debug('DatePicker1 changed: ', date)
                            updateForm({...formData, date})
                        }}
                        disabledDate={time=>time.getTime() < Date.now()}
                        />
                </Form.Item>
            </Form>
        </div>
    </>
}

export default ScheduleForm