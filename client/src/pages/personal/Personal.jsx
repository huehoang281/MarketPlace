import React, {useState, useContext, useEffect} from 'react'
import styles from "./Personal.module.css"
import TopBar from "../../components/topbar/TopBar"
import Footer from "../../components/footer/Footer"
import Card from '../../components/card/Card'
import { AuthContext } from '../../context/AuthContext'
import axios from "axios"

export default function Personal() {
    const PF = process.env.REACT_APP_IMAGES
    const [toggle, setToggle] = useState(1)
    const [cardsOnSale, setCardsOnSale] = useState([])
    const [cardsLiked, setCardsLiked] = useState([])
    const handleToggle = (index) => {
        setToggle(index)
    }
    const {user} = useContext(AuthContext)
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios("http://localhost:8000/api/product/profile/" + user._id)
            setCardsOnSale(res.data)
        }
        fetchProducts()
    }, [user])
    useEffect (() => {
        const userId = user._id
        const fetchProducts = async () => {
            const res = await axios("http://localhost:8000/api/product/profile/liked/" + userId)
            setCardsLiked(res.data)
        }
        fetchProducts()
    } , [user])
  return (
    <div className='container'>
        <TopBar />
        <div className={styles.personal}>
            <div className={styles.wrapper}>
                <img className={styles.imgBackground} src={user.coverAvatar === "" ? PF + "noCoverAvatar.jpg" : user.coverAvatar} alt="" />
                <div className={styles.infoBox}>
                    <div className={styles.avatarBox}>
                        <img className={styles.avatar} src={user.avatar === "" ? PF + "noAvatar.png" : user.avatar} alt="" />
                        <i className={`${styles.stick} fa fa-check`}></i>
                    </div>
                    <div className={styles.subInfo}>
                        <div className={styles.name}>{user.username}</div>
                        <div className={styles.subName}>{`@${user.username}`}</div>
                        <div className={styles.addInfo}>
                            <div className={styles.addWal}>DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME</div>
                            <button className={styles.copy}>Copy</button>
                        </div>
                    </div>
                    <div className={styles.follow}>
                        <div className={styles.followCount}>{user.followers.length} followers</div>
                        <button className='btn'>Follow</button>
                    </div>
                </div>
            </div>
            <div className={styles.bottomWrapper}>
                <div className={styles.buttonTabs}>
                    <button className={toggle === 1 ? `${styles.btn} ${styles.activeBtn}` : `${styles.btn}`} onClick={() => handleToggle(1)}>On Sale</button>
                    <button className={toggle === 2 ? `${styles.btn} ${styles.activeBtn}` : `${styles.btn}`} onClick={() => handleToggle(2)}>Created</button>
                    <button className={toggle === 3 ? `${styles.btn} ${styles.activeBtn}` : `${styles.btn}`} onClick={() => handleToggle(3)}>Liked</button>
                </div>
                <div className={styles.contentTabs}>
                    <div className={toggle === 1 ? `${styles.content} ${styles.activeContent}` : `${styles.content}`} onClick={() => handleToggle(1)}>
                        {cardsOnSale.map((card) => (
                            <Card key={card._id} card={card}/>
                        ))}
                    </div>
                    <div className={toggle === 2 ? `${styles.content} ${styles.activeContent}` : `${styles.content}`} onClick={() => handleToggle(2)}>
                        {cardsOnSale.map((card) => (
                            <Card key={card._id} card={card}/>
                        ))}
                    </div>
                    <div className={toggle === 3 ? `${styles.content} ${styles.activeContent}` : `${styles.content}`} onClick={() => handleToggle(3)}>
                        {cardsLiked.map((card) => (
                            <Card key={card._id} card={card}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}
