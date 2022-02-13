import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { useAuth } from '../../AuthContext/AuthContext'
import './Comments.scss'
import { collection, query, where, getDocs, docs, doc, deleteDoc, setDoc, addDoc, collectionGroup, serverTimestamp, onSnapshot, orderBy, updateDoc } from "firebase/firestore";
import { memo } from 'react';
import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import moment from 'moment';



const Comments = (props) => {
  const { productID } = props
  const { currentUser } = useAuth()
  const [willCmt, setWillCmt] = useState('')
  const [cmts, setCmts] = useState([])
  const [loading, setLoading] = useState(false)

  const [showMoreText, setShowMoreText] = useState(true)

  const handleCmt = async () => {
    setLoading(true)
    // await setDoc(doc(db, "products", `product-${productID}`, 'comments', currentUser?.displayName), {
    if (willCmt !== '') {
      await addDoc(collection(db, "products", `product-${productID}`, 'comments'), {
        userName: currentUser?.displayName,
        comment: willCmt,
        avatarUser: currentUser?.photoURL,
        currentTime: serverTimestamp(),
        userUID: currentUser?.uid
      });
    }
    setLoading(false)
    setWillCmt('')
  }




  useEffect(async () => {
    const cmtsRef = query(collection(db, 'products', `product-${productID}`, 'comments'), orderBy('currentTime', 'desc'))

    const unsub = onSnapshot(cmtsRef,
      (querySnapshot) => {
        setCmts(querySnapshot.docs) // lấy sự thay đổi. Còn lấy data thì 
        // querySnapshot.docs.map(doc => { console.log(doc.data())})
      })

    return () => {
      unsub()
    }
  }, [productID, db])



  ////drop DOWN

  const menu = (cmt) => {
    return <Menu >
      <Menu.Item onClick={() => handleDeleteCmt(cmt)} key="2" >
        Delete
      </Menu.Item>

    </Menu>
  }
  const handleDeleteCmt = async (cmt) => {
    const cmtsRef = query(doc(db, 'products', `product-${productID}`, 'comments', cmt.id))

    await deleteDoc(cmtsRef);

  }

  const showMoreHandle = () => {
    setShowMoreText(!showMoreText)
  }


  return (
    <div className='cmt-container'>
      {!currentUser && <div className='will-cmt needCmt '>
        You need to login to comment
      </div>}

      {currentUser &&
        <div className='will-cmt'>
          <div className='will-cmt-2'>
            <img src={currentUser.photoURL} alt="" />
          </div>
          <div className='text-area-cmt'>

            <div >
              <textarea className='will-my-cmt' value={willCmt} onChange={(e) => setWillCmt(e.target.value)} name="" id="" ></textarea>
            </div>

            <Button loading={loading} disabled={loading} onClick={handleCmt} type="primary" shape="round" >
              Send
            </Button>
          </div>
        </div>

      }
      <div className='other-cmt'>
        {cmts.map((cmt, index) => {
          const detail = cmt.data()
          const limitText = detail.comment ? detail.comment.slice(0, 100) : detail.comment


          return <div key={index} className='other-a-user-cmt'>

            <div className='other-user-cmt'>
              <img src={detail.avatarUser} alt="" />

            </div>
            <div className='content-other-cmt'>
              <div >
                <div className='d-flex justify-content-between pb-2 align-items-center'>
                  <div className='d-flex nameAndTime'>

                    <div className='pe-2'> <strong>{detail.userName}</strong> </div>
                    <div>
                      {detail.currentTime && moment(detail.currentTime.toDate()).fromNow()}
                    </div>
                  </div>

                  {detail.userUID == currentUser?.uid &&

                    <Dropdown trigger={['click']} overlay={menu(cmt)}>
                      <Button icon={<i className="bi bi-three-dots"></i>}>

                      </Button>
                    </Dropdown>
                  }
                </div>
                <div> </div>
              </div>
              <div className='text-cmt'>
                <span>{showMoreText ? limitText : detail.comment}</span>

                {detail.comment.length > 100 && <div className='show-more-less' onClick={showMoreHandle}>
                  {showMoreText ? 'Show more' : 'Show Less'}
                </div>}
              </div>
            </div>
          </div>

        })}
      </div>
    </div>

  )
}

export default memo(Comments)