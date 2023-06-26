import React, { useEffect, useState } from "react";
import styles from "./HotCollections.module.css";
import axios from "axios";

export default function HotCollections() {
  const PF = process.env.REACT_APP_IMAGES
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
        const res = await axios("http://localhost:8000/api/product/")
        setProducts(res.data)
    }
    fetchProducts()
}, [])
  return (
    <div className={styles.hotcollections}>
      {console.log(products)}
      <h2 className="mainTitle">Hot Collections</h2>
      <div className="line"></div>
      {products.map((item) => (
        <div key={item._id} className={styles.wrapper}>
            <div className={styles.hotItem}>
              <div className={styles.topHotItem}>
                <img
                  className={styles.img}
                  src={PF + item.photo}
                  alt=""
                />
              </div>
              <div className={styles.midHotItem}>
                <div className={styles.avatar}>
                  <img
                    className={styles.avatarImg}
                    src={item.owner.avatar}
                    alt=""
                  />
                  <i className={`fa-solid fa-circle-check ${styles.stick}`}></i>
                </div>
              </div>
              <div className={styles.bottomHotItem}>
                <div className="name">Patternlicious</div>
                <div className="subName">ERC-61</div>
              </div>
            </div>
          </div>
      ))}
    </div>
  );
}
