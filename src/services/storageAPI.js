const CART_ITENS = 'cart_itens';

if (!JSON.parse(localStorage.getItem(CART_ITENS))) {
  localStorage.setItem(CART_ITENS, JSON.stringify([]));
}
const readCartIten = () => JSON.parse(localStorage.getItem(CART_ITENS));

const saveCartIten = (CartIten) => localStorage
  .setItem(CART_ITENS, JSON.stringify(CartIten));

export const getCartIten = () => readCartIten();

export const removeCartIten = (itemId) => {
  const cartItens = readCartIten();
  saveCartIten(cartItens.filter(({ id }) => id !== itemId));
};

export const addCartIten = (cartData) => {
  const cartItens = readCartIten();

  const check = cartItens.some((iten) => iten.id === cartData.id);

  if (check) {
    const newSavedItens = (cartItens.filter(({ id }) => id !== cartData.id));
    saveCartIten([...newSavedItens, cartData]);
  } else if (cartData) {
    saveCartIten([...cartItens, cartData]);
  }
};
