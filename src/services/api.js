export async function getCategories() {
  try {
    const url = 'https://api.mercadolibre.com/sites/MLB/categories';
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  try {
    const link = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
    const response = await fetch(link);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
