const MOCK_PRODUCTS = [
  {
    id: "HGVPIN216",
    title: "High Garden Pinot Noir 2021",
    sku: "HGVPIN216",
    brand: "High Garden",
    subCategory: "Wine",
    segment: "Red",
    price: 279.06,
  },
  {
    id: "KOYBRUNV6",
    title: "Koyama Methode Brut Nature NV",
    sku: "KOYBRUNV6",
    brand: "Koyama Wines",
    subCategory: "Wine",
    segment: "Sparkling",
    price: 120.0,
  },
  {
    id: "KOYNR1837",
    title: "Koyama Riesling 2018",
    sku: "KOYNR1837",
    brand: "Koyama Wines",
    subCategory: "Wine",
    segment: "Port/Dessert",
    price: 215.04,
  },
  {
    id: "KOYRIE19",
    title: "Koyama Tussock Riesling 2019",
    sku: "KOYRIE19",
    brand: "Koyama Wines",
    subCategory: "Wine",
    segment: "White",
    price: 215.04,
  },
  {
    id: "LACBNATNV6",
    title: "Lacourte-Godbillon Brut Cru NV",
    sku: "LACBNATNV6",
    brand: "Lacourte-Godbillon",
    subCategory: "Wine",
    segment: "Sparkling",
    price: 409.32,
  },
];

const categories = [...new Set(MOCK_PRODUCTS.map(p => p.subCategory))];
const segments = [...new Set(MOCK_PRODUCTS.map(p => p.segment))];
const brands = [...new Set(MOCK_PRODUCTS.map(p => p.brand))];

export { categories, segments, brands };
export default MOCK_PRODUCTS;