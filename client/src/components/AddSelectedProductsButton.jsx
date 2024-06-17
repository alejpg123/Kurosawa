import { useContext } from "react";
import { productsContext } from "../context/ProductsContext";
import { SelectAllRounded } from "@mui/icons-material";

function AddSelectedProductsButton() {
    const { addSelectedToCart, user, iniciaSesionAlert, selectedProducts, productsNotSelectedAlert } = useContext(productsContext);

    return (
        <button onClick={() => {
            if (!user) {
              iniciaSesionAlert();
            } else if (selectedProducts.length === 0) {
              productsNotSelectedAlert();
            } else {
              addSelectedToCart();
            }
          }}
            className="h-10 px-6 py-2 mt-2 text-white font-semibold rounded-md bg-custom-green-yellow hover:brightness-110">
            Agregar productos seleccionados
        </button>
    );
}

export default AddSelectedProductsButton;