import React, { useContext } from "react";
import { BsSortNumericDown } from "react-icons/bs";
import { BsSortNumericDownAlt } from "react-icons/bs";
import { productsContext } from "../context/ProductsContext"

function Sort() {
    const { sortedMaxToMin, handleSort } = useContext(productsContext);
    return (
        <section>
            <p className="m-5">Ordenar por precio</p>
            {sortedMaxToMin? (
                <BsSortNumericDown 
                style={{ cursor: "pointer" }}
                onClick={handleSort}
                className="mx-auto m-5"
                />
            ):
            <BsSortNumericDownAlt 
            style={{ cursor: "pointer" }}
            onClick={handleSort}
            className="mx-auto m-5"
            />

            }
            
        </section>
    )
}

export default Sort