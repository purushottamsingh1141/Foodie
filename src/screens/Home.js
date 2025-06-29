import "./Home.css";
import Card from "../component/Card";
import ImageCarousel from "../component/ImageCarousel";
import { useEffect, useState } from "react";

const Home = () => {
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/foodData`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCategory(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <ImageCarousel />
      <div className="container">
        {foodCategory.length !== 0
          ? foodCategory.map((data) => {
              return (
                <div key={data._id}>
                  <h3>{data.CategoryName}</h3>
                  <hr />
                  <div className="d-flex flex-wrap justify-content-center">
                    {foodItem.length !== 0 ? (
                      foodItem
                        .filter(
                          (item) => item.CategoryName === data.CategoryName
                        )
                        .map((filterItems) => (
                          <div key={filterItems._id}>
                            <Card foodItem={filterItems} />
                          </div>
                        ))
                    ) : (
                      <div>No Such Data Found</div>
                    )}
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Home;
