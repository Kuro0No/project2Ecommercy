import React from 'react';
import './Setting.scss'
import { Link, Routes, Route } from 'react-router-dom';
import Avatar from './Avatar';
import DisplayName from './DisplayName';
import Password from './Password';
import { PictureOutlined, EditOutlined, LockOutlined } from '@ant-design/icons';
import NotFound from '../NotFound/NotFound';

const Setting = () => {
    return <div className='d-flex container-setting'>
        <div className='col-3 '>
            <div>
                <ul>
                    <li>
                        <div className='setting-left-group'>

                            <PictureOutlined />
                            <Link to='updateava'>Update Avatar</Link>
                        </div>
                    </li>
                    <li>
                        <div className='setting-left-group'>

                            <EditOutlined />
                            <Link to='updatedisplayname'>Change Display Name</Link>
                        </div>
                    </li>
                    <li>
                        <div className='setting-left-group'>

                            <LockOutlined />
                            <Link to='updatepassword'>Change Your Password</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div className='col-9'>
            <Routes>
                <Route path='updateava' element={<Avatar />} />
                <Route path='updatedisplayname' element={<DisplayName />} />
                <Route path='updatepassword' element={<Password />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    </div>;
};

export default Setting;
