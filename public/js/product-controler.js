let category = [];
const unique = (value, index, self) => {
  return self.indexOf(value) === index;
}

products.forEach(product => {
  let filtered = product.kategori.charAt(0).toUpperCase() + product.kategori.substring(1);
  category.push(filtered);
})

category = category.filter(unique);
category = category.sort()