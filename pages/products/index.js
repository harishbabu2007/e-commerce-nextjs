import Head from "next/head";
import styles from "../../styles/ProductsIndex.module.css";
import { Button, Row, Col, Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import stylesIndex from "../../styles/Home.module.css";
import Link from "next/link";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterd, setFiltered] = useState([]);

  const FilterCategory = (category) => {
    setFiltered(
      products.filter((item) => {
        return item.category === category;
      })
    );
  };

  const Filters = (filter, asc) => {
    setFiltered(
      filterd.sort((a, b) => {
        if (filter == "Price") {
          if (asc) {
            return 1;
          }
          return b.price.$numberDecimal - a.price.$numberDecimal;
        } else if (filter == "Pur") {
          if (asc) {
            return a.purchases - b.purchases;
          }
          return b.purchases - a.purchases;
        }
      })
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("api/products");
      const data = await res.json();

      setProducts(data);
      setFiltered(data);

      console.log(data);
    };

    fetchProducts();
    setLoading(true);
  }, []);

  return (
    <div>
      <Head>
        <title>Products</title>
      </Head>
      <div className={styles.main}>
        <div className={styles.left}>
          <p>Categories</p>
          <div className={styles.btnHolder}>
            <Button
              variant="outline-light"
              onClick={() => FilterCategory("Clothing")}
            >
              Clothing
            </Button>
            <p></p>
            <Button
              variant="outline-light"
              onClick={() => FilterCategory("Electronics")}
            >
              Electronics
            </Button>
          </div>
        </div>
        <div className={styles.center}>
          <p>Products</p>
          {loading && (
            <Row xs={1} md={4} className="g-4">
              {filterd.map((item, idx) => (
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
                      <Link href="#">
                        <Button variant="outline-light"> Buy Product</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
        <div className={styles.right}>
          <p>Filters</p>
          <div className={styles.btnHolder}>
            <Button
              variant="outline-light"
              onClick={() => Filters("Price", false)}
            >
              Price - High To Low
            </Button>
            <p></p>
            <Button
              variant="outline-light"
              onClick={() => Filters("Price", true)}
            >
              Price - Low To High
            </Button>
          </div>
          <div className={styles.btnHolder}>
            <Button
              variant="outline-light"
              onClick={() => Filters("Pur", false)}
            >
              Rating - High To Low
            </Button>
            <p></p>
            <Button
              variant="outline-light"
              onClick={() => Filters("Pur", true)}
            >
              Rating - Low To High
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
