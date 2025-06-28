import React, { useEffect, useState } from "react";
import Card from "../component/Card";
import "./Menu.css";

const Menu = () => {
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("/api/displaydata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCategory(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="menu-page">
      <h2 className="menu-title">📋 Full Menu</h2>
      <div className="container">
        {foodCategory.length !== 0
          ? foodCategory.map((data) => {
              return (
                <div key={data._id} className="menu-section">
                  <h3 className="category-title">{data.CategoryName}</h3>
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

export default Menu;
