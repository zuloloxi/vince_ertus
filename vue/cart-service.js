/**
 * @file
 * Cart service - Handles products stored in the cart.
 */

class CartService {

  constructor() {
    this.productInfo = [];  // contenu du panier { product, quantity }
  }

  addProduct(product) {
    // Produit déjà présent ?
    const index = this.productInfo.findIndex(pInfo => pInfo.product.id === product.id)
    if (index !== -1) {   // produit trouvé, incrémente sa quantité
      this.productInfo[index] = {
        ...this.productInfo[index],
        quantity: this.productInfo[index].quantity + 1
      };
    } else {  // produit pas trouvé, ajoute-le au panier
      this.productInfo.push({ product, quantity: 1 });
    }
  }

  removeProduct(product) {
    const index = this.productInfo.findIndex(pInfo => pInfo.product.id === product.id)
    this.productInfo[index] = {
      ...this.productInfo[index],
      quantity: this.productInfo[index].quantity - 1
    };
    // Supprime les produits qui sont à zéro
    this.productInfo = this.productInfo.filter(pInfo => pInfo.quantity > 0);
  }

  get totalAmount() {  // getter
    return this.productInfo.reduce((acc, pInfo) => acc + pInfo.quantity * pInfo.product.price, 0);
    // let total = 0;
    // this.productInfo.forEach(pInfo => total = total + pInfo.quantity * pInfo.product.price);
    // return total;
  }

  get numProducts() {  // getter
    return this.productInfo.reduce((acc, pInfo) => acc + pInfo.quantity, 0);
  }

  getQuantityForProduct(productId) {
    const pInfo = this.productInfo.find(pInfo => pInfo.product.id === productId);
    return pInfo ? pInfo.quantity : 0;
  }

}

export default CartService
