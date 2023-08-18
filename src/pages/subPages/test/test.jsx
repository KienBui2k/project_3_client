import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newcategoryActions } from "../../../stores/slices/newProduct";

const CategoryTestComponent = () => {
    const dispatch = useDispatch();

    const latestProducts = useSelector((store) => store.newcategoryStore);
    useEffect(() => {
        dispatch(newcategoryActions.findLatestProductsByCategory());
    }, []);

    console.log("latestProducts", latestProducts.data[0].products[0].name);

    return (
        <div>
            <h1>Category Test Component</h1>

            {/* Hiển thị danh sách sản phẩm mới nhất */}
            <h2>Latest Products</h2>
            {latestProducts?.data?.map((categoryProducts) => (
                <div key={categoryProducts?.category}>
                    <h3>{categoryProducts?.category}</h3>

                    <ul>
                        {categoryProducts.products.map((product) => (
                            <li key={product.id}>{product.title}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default CategoryTestComponent;
