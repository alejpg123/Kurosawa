import React, { useContext } from "react";
import { BsSortNumericDown } from "react-icons/bs";
import { BsSortNumericDownAlt } from "react-icons/bs";
import { productsContext } from "../context/ProductsContext"

function Sort() {
    const { sortedMaxToMin, handleSort } = useContext(productsContext);
    return (
        <section>
            {sortedMaxToMin? (
                <BsSortNumericDown 
                style={{ cursor: "pointer" }}
                onClick={handleSort}
                />
            ):
            <BsSortNumericDownAlt 
            style={{ cursor: "pointer" }}
            onClick={handleSort}
            />

            }
            
        </section>
    )
}

export default Sort