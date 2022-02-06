import { LogoutOutlined, SettingOutlined, SearchOutlined, HomeOutlined, ShopOutlined, ContactsOutlined, CloseOutlined } from '@ant-design/icons';
import './Modal.scss'
import { Link } from 'react-router-dom';
import { Input } from 'antd';


const Modal = ({ setOpenActive, openActive }) => {
    const { Search } = Input;

    return <div className={`modal-container ${openActive ? 'modal-container-active' : ''}`}>
        <div className='active-container'>
            <ul>
                <li className='active-li-modal-group'>
                    <Link onClick={() => setOpenActive(false)} to='/'>
                        Home
                        <HomeOutlined />
                    </Link>

                </li>
                <li className='active-li-modal-group'>
                    <Link onClick={() => setOpenActive(false)} to='/product'>
                        Shop Now!
                        <ShopOutlined />
                    </Link>
                </li>

                <li className='active-li-modal-group'>
                    <Link onClick={() => setOpenActive(false)} to='/contact'>
                        Contact Us.
                        <ContactsOutlined />
                    </Link>

                </li>
                <li className='active-li-modal-group input-search-modal'>
                    <Search placeholder="Search smt..." enterButton />

                </li>
            </ul>
        </div>
    </div>;
};

export default Modal;
