import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { useAuth } from '../../AuthContext/AuthContext'
import './Comments.scss'
import { Button } from 'antd';
import { collection, query, where, getDocs, docs, doc, setDoc, addDoc, collectionGroup, serverTimestamp, onSnapshot, orderBy } from "firebase/firestore";
import { memo } from 'react';



const Comments = (props) => {
  const { productID } = props
  const { currentUser } = useAuth()
  const [willCmt, setWillCmt] = useState('')
  const [cmts, setCmts] = useState([])
  const [loading, setLoading] = useState(false)

  const handleCmt = async () => {
    setLoading(true)
    // await setDoc(doc(db, "products", `product-${productID}`, 'comments', currentUser?.displayName), {
    await addDoc(collection(db, "products", `product-${productID}`, 'comments'), {
      userName: currentUser?.displayName,
      comment: willCmt,
      avatarUser: currentUser?.photoURL,
      currentTime: serverTimestamp()
    });
    setLoading(false)


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







  return (
    <div className='cmt-container'>
      {currentUser &&
        <div className='will-cmt'>
          <div className='will-cmt'>
            <img src={currentUser.photoURL} alt="" />
          </div>
          <div>

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
          // console.log(detail.currentTime.toDate().toUTCString())
          return <div key={index} className='other-a-user-cmt'>

            <div className='other-user-cmt'>
              <img src={detail.avatarUser} alt="" />

            </div>
            <div className='content-other-cmt'>
              <div>
                <div>User: <strong>{currentUser?.displayName}</strong> </div>
                <div> </div>
              </div>
              <div>
                {detail.comment}
              </div>
            </div>
          </div>

        })}
      </div>
    </div>

  )
}

export default memo(Comments)