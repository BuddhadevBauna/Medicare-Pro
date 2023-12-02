import React, { useState } from "react";
import styles from "./SingleProduct.module.css";
import { Link } from "react-router-dom";
import heart from "../images/heart-regular.svg";
import heartSolid from "../images/heart-solid (1).svg";

const SingleProduct = ({ data }) => {

  const [heartImg, setHeartImg] = useState(heart);
  function handleHeartImgChange(event) {
    if (heartImg === heart) {
      setHeartImg(heartSolid);

    }
    else {
      setHeartImg(heart);
    }
  }
  return (

    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Link to={`/products/${data.id}`}>
          <img
            className={styles.cardImg}
            src={data.images[0]}
            alt="Lab test_image"
          />
        </Link>
        <img className={styles.heartImg} src={heartImg} onClick={(event) => handleHeartImgChange(event)} alt="heart" />
        <div className={styles.compare}>
          <input type="checkbox" id="compare" />
          <label htmlFor="compare">Add for Compare</label>
        </div>
      </div>
      <div className={styles.detailsContainer}>
        <Link to={`/products/${data.id}`}>
          <h2 className={styles.name}>{data.title}</h2>
          <div className={styles.ratingContainer}>
            <button className={styles.rating}>{data.rating.toFixed(1)} ⭐</button>
            <p>232 Ratings & 124 Reviews</p>
          </div>
          <p>{data.description}</p>
        </Link>
      </div>

      <div className={styles.priceContainer}>
        <p className={styles.bestPrice}>

          <span>
            ₹
            {Math.round(
              data.price - data.price * data.discountPercentage * 0.01
            ) * 80}
          </span>
        </p>
        <p></p>
        <p className={styles.mrpPrice}>
          <span className={styles.mrp}>₹{Math.round(data.price) * 80}</span><span className={styles.discountPercentage}>{Math.round(data.discountPercentage)}%</span>
        </p>
      </div>

    </div>

  );
};

export default SingleProduct;
