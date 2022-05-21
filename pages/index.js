/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Carousel, Col, Card, Row, Spinner } from "react-bootstrap";
import styles from "../styles/ProductCarousel.module.css";
import stylesIndex from "../styles/Home.module.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setupDB = async () => {
      const res = await fetch("api/connectDb");
      const data = await res.json();

      console.log("connected to DB");
    };

    const fetchProducts = async () => {
      const res = await fetch("api/products");
      const data = await res.json();

      setProducts(data);
    };

    setupDB();
    fetchProducts();

    setLoading(true);
  }, []);

  return (
    <div className={stylesIndex.app}>
      <Head>
        <title>E-Commerce</title>
      </Head>
      {loading ? (
        <div>
          <div>
            <Carousel fade variant="dark" className={stylesIndex.carouselBack}>
              {products.map((item, key) => (
                <Carousel.Item key={key}>
                  <img
                    className={`d-block w-100 ${styles.img} ${stylesIndex.carouselImg}`}
                    src={`${item.url}`}
                    alt="Awsome Shrit"
                  />
                  <Carousel.Caption>
                    <h3>
                      {item.name} - ₹{item.price.$numberDecimal}
                    </h3>
                    <p>{item.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className={stylesIndex.cardHolder}>
            <h1>Recommended Products</h1>
            <Row xs={1} md={4} className="g-4">
              {products.map((item, idx) => (
                <Col key={idx}>
                  <Card text="white" style={{ backgroundColor: "black" }}>
                    <Card.Img
                      variant="top"
                      src={item.url}
                      className={stylesIndex.cardImg}
                    />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>
                        Price - ₹{item.price.$numberDecimal}
                      </Card.Text>
                      <Card.Text>{item.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      ) : (
        <div className={stylesIndex.spinnerHolder}>
          <Spinner animation="border" variant="light" />
        </div>
      )}
    </div>
  );
}

export default Home;
