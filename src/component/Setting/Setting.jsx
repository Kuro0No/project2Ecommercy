import React, { useContext, useEffect, useState } from 'react';
import './Setting.scss'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import { useAuth } from '../../AuthContext/AuthContext';
import { toast } from 'react-toastify';
import { dbContext } from '../../DbContext/dbContext';




const Setting = ({setAvatarUser}) => {
    const { currentUser, upload } = useAuth()
    const { currentUserCart } = useContext(dbContext)

    //active click tab
    const [active1, setActive1] = useState(false)
    const [active2, setActive2] = useState(false)
    const [active3, setActive3] = useState(false)

    // Display Name
    const [displayNameValue, setdisplayNameValue] = useState()
    const [passwordValue, setpasswordValue] = useState()
    const [confirmPasswordValue, setconfirmPasswordValue] = useState()

    // Change password
    const [currentPassword, setCurrentPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [confirmNewPassword, setConfirmNewPassword] = useState()


    //loading
    const [loading, setLoading] = useState(false)
    // photoUrl
    const [photoURL, setPhotoURL] = useState('https://www.nicepng.com/png/detail/207-2071257_computer-icons-avatar-youtube-download-share-icon-icone.png')
    const [photo, setPhoto] = useState(null)
    const handleChangeAva = (e) => {

        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)
        setPhoto(file)


    }
   

    const handleConfirmAva = async () => {
        upload(photo, currentUser)
        setAvatarUser(photo?.preview)
        toast.success('Update successfully', {
            autoClose: 1500,
        });

    }

    const handleClick = (id) => {
        if (id === 1) {
            setActive1(true)
            setActive2(false)
            setActive3(false)
        } if (id === 2) {
            setActive2(true)
            setActive1(false)
            setActive3(false)
        } if (id === 3) {
            setActive3(true)
            setActive1(false)
            setActive2(false)
        }

    }
    useEffect(() => {
        if (currentUser?.displayName) {
            setdisplayNameValue(currentUser.displayName)
        }

    }, [currentUser])

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(photoURL?.preview)
        }
    }, [photoURL])

    const onFinish = async () => {
        setLoading(true)
        if (passwordValue !== confirmPasswordValue) {
            toast.warn('Password and Confirm password do not match!', {
                autoClose: 1500,
            });
        }
        if (passwordValue !== currentUserCart.passwordUser) {
            toast.warn('Wrong password!', {
                autoClose: 1500,
            });

        }

        if (passwordValue === confirmPasswordValue && passwordValue === currentUserCart.passwordUser) {

            await currentUser.updateProfile({ displayName: displayNameValue })
            toast.success('Update Succesfully', {
                autoClose: 1500,
            });
            setpasswordValue('')
            setconfirmPasswordValue('')
        }
        setLoading(false)
    }
    const onFinishNewPass = async () => {
        setLoading(true)
        if (newPassword !== confirmNewPassword) {
            toast.warn('Password and Confirm password do not match!', {
                autoClose: 1500,
            });
        }
        if (currentPassword !== currentUserCart.passwordUser) {
            toast.warn('Wrong password!', {
                autoClose: 1500,
            });

        }

        if (newPassword === confirmNewPassword && currentPassword === currentUserCart.passwordUser) {
            currentUser.updateProfile({ passwordUser: newPassword })
            await currentUser.updatePassword(newPassword)
            toast.success('Update Succesfully', {
                autoClose: 1500,
            });
            setpasswordValue('')
            setconfirmPasswordValue('')
        }
        setLoading(false)
    }



    return <div className=' container-setting'>
        <div className='title-setting'><h3>
            General Account Settings
        </h3></div>

        <div className='setting-group' >
            {active1 ?
                <div className='setting-group-child active1'  >

                    <div className='title-option-setting col-sm-3 col-2'>Name</div>
                    <div className='title-update-displayname col-sm-9 col-10'>

                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}

                        >
                            <div className='d-flex'>
                                <strong className='title-name'>Your name.</strong>
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your Username!' }]}
                                    valuePropName
                                >
                                    <Input onChange={(e) => setdisplayNameValue(e.target.value)} value={displayNameValue} prefix={<UserOutlined className="site-form-item-icon" />} />
                                </Form.Item>
                            </div>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: passwordValue, }]}
                                valuePropName
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                    value={passwordValue}
                                    onChange={e => setpasswordValue(e.target.value)}

                                />
                            </Form.Item>
                            <Form.Item
                                name="confirmPassword"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                                valuePropName
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Confirm password"
                                    value={confirmPasswordValue}
                                    onChange={e => setconfirmPasswordValue(e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button loading={loading} disabled={loading} type="primary submitUpdateName" htmlType="submit" className="login-form-button">
                                    Confirm
                                </Button>

                            </Form.Item>
                        </Form>
                        <div onClick={() => setActive1(false)}>
                            <Button type="primary" danger>
                                Close
                            </Button>
                        </div>
                    </div>
                </div>


                :
                <div className='setting-group-child' onClick={() => handleClick(1)} >

                    <div className='title-option-setting col-sm-3 col-2'>Name</div>
                    <div className='title-option-content col-sm-9 col-10' >
                        <div className='description-setting' >{currentUser?.displayName}</div>
                        <div className='title-option-action'>Edit</div>


                    </div>
                </div>

            }


        </div>
        {active2 ?
            <div>
                <div className='setting-group' >
                    <div className='setting-group-child' >
                        <div className='title-option-setting col-2 col-sm-3'>Avatar</div>
                        <div className='title-option-content-ava col-sm-9 col-10'>
                            <img src={photo ? photo.preview : currentUser?.photoURL || `https://www.nicepng.com/png/detail/207-2071257_computer-icons-avatar-youtube-download-share-icon-icone.png`} alt="" />
                            <div>

                                <div>
                                    <input onChange={handleChangeAva} type="file" id='updateAva' hidden />
                                    <label className='button-updateAva btn btn-light' htmlFor="updateAva">
                                        <span>Update Avatar</span>
                                        <div className='icon-update-avatar'>

                                            <UploadOutlined />
                                        </div>
                                    </label>


                                </div>
                                <button className=' btn btn-primary' style={{ cursor: 'pointer' }} disabled={!photo} onClick={handleConfirmAva}>
                                    Confirm
                                </button>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            :
            <div onClick={() => handleClick(2)} className='setting-group' >
                <div className='setting-group-child' >
                    <div className='title-option-setting col-sm-3 col-2'>Avatar</div>
                    <div className='title-option-content col-sm-9 col-10'>
                        <div className='description-setting' >Update your Avatar.</div>
                        <div className='title-option-action'>Edit</div>

                    </div>

                </div>
            </div>
        }
        {active3 ?
            <>
                <div className='setting-group' >
                    <div className='setting-group-child active3' >
                        <div className='title-option-setting  col-sm-3 col-2'>Password</div>

                        <div className='field-change-pass '>
                            <div className='title-option-content-new-pass'>
                                <div className='description-setting description-new text-center' > Change your password.</div>

                                <div className='description-setting description-new-pass' >It's a good idea to use a strong password that you're not using elsewhere</div>

                            </div>
                            <Form onFinish={onFinishNewPass}>
                                <Form.Item
                                    name="currentPassword"
                                    rules={[{ required: true, message: passwordValue, }]}
                                    valuePropName
                                >
                                    <Input
                                        prefix={<EditOutlined />}
                                        type="password"
                                        placeholder="Current password"
                                        value={currentPassword}
                                        onChange={e => setCurrentPassword(e.target.value)}
                                        allowClear

                                    />
                                </Form.Item>
                                <Form.Item
                                    name="newPassword"
                                    rules={[{ required: true, message: 'Please input your Password!' }]}
                                    valuePropName
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Confirm password"
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}
                                        allowClear
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="confirmNewPassword"
                                    rules={[{ required: true, message: 'Please input your Password!' }]}
                                    valuePropName
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Confirm New Password"
                                        value={confirmNewPassword}
                                        onChange={e => setConfirmNewPassword(e.target.value)}
                                        allowClear

                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button loading={loading} disabled={loading} type="primary submitUpdateName" htmlType="submit" className="login-form-button">
                                        Confirm
                                    </Button>

                                </Form.Item>
                                <div onClick={() => setActive3(false)}>
                                    <Button type="primary" danger>
                                        Close
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </>
            :
            <div onClick={() => handleClick(3)} className='setting-group' >
                <div className='setting-group-child' >
                    <div className='title-option-setting col-sm-3 col-2'>Password</div>
                    <div className='title-option-content col-sm-9 col-10'>

                        <div className='description-setting ' >Change your password? Click here!</div>
                        <div className='title-option-action'>Edit</div>
                    </div>

                </div>
            </div>}

    </div>;
};

export default Setting;
