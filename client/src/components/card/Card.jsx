import React, { useEffect, useState } from 'react'
import styles from "./Card.module.css"
import axios from 'axios'

export default function Card({card}) {
  const PF = process.env.REACT_APP_IMAGES
  return (
        <div className={styles.wrapper}>
            <div className={styles.box}>
              <div className="avatarBox">
                <img
                  className="avatar"
                  src={card.author?.avatar}
                  alt=""
                />
                <i className={`fa fa-check stick`}></i>
              </div>
              <div className={styles.clockdown}>00d 00h 00m 00s</div>
              <div className={styles.img}>
                <img
                  className={styles.imgNFT}
                  src={PF + card?.photo}
                  alt=""
                />
              </div>
              <div className={styles.bottomBoxItem}>
                <div className={styles.title}>{card.title}</div>
                <div className={styles.priceBox}>
                  <div className={styles.price}>{card.price ? card.price : "0.5ETH"}</div>
                  <div className={styles.quantity}>1/20</div>
                </div>
                <div className={styles.actions}>
                  <div className={styles.place}>Buy Now</div>
                  <div className={styles.like}>
                    <i className={`fa-solid fa-heart ${styles.heart}`}></i>
                    <span>{card.like.length}</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
  )
}
