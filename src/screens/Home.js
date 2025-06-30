import "./Home.css";
import Card from "../component/Card";
import ImageCarousel from "../component/ImageCarousel";
import { useEffect, useState } from "react";

const Home = () => {
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // POST requires body
      });

      const data = await response.json();
      console.log("✅ foodItem:", data[0]);
      console.log("✅ foodCategory:", data[1]);

      setFoodItem(data[0] || []);
      setFoodCategory(data[1] || []);
    } catch (error) {
      console.error("❌ Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <ImageCarousel />

      <div className="container">
        {foodCategory.length > 0 ? (
          foodCategory.map((category) => (
            <div key={category._id}>
              <h3>{category.CategoryName}</h3>
              <hr />

              {console.log("🧪 Matching items for:", category.CategoryName)}
              <div className="d-flex flex-wrap justify-content-center">
                {foodItem
                  .filter(
                    (item) =>
                      item.CategoryName?.toLowerCase().trim() ===
                      category.CategoryName?.toLowerCase().trim()
                  )
                  .map((filteredItem) => (
                    <div key={filteredItem._id}>
                      <Card foodItem={filteredItem} />
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <h4>📭 No Categories Found</h4>
        )}
      </div>
    </div>
  );
};

export default Home;
