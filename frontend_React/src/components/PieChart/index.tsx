import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {useState, useEffect} from 'react';
import { CategoryDTO } from '../../models/Category';
import * as categoryService from '../../services/category-service';
import * as productService from '../../services/product-service';
import { ProductDTO } from '../../models/product';
import './styles.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {

  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const queryParams = {
    page: 0,
    name: "",
    size: Number.MAX_VALUE
  };

  const dataStock = {
    labels: categories.map(category => category.name).sort(),
    datasets: [
      {
        data: products.map(product => ({
          label: product.name,
          value: product.price,
        })),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    categoryService.findAllRequest()
      .then(response => {
        setCategories(response.data);
      });
  }, []);

  useEffect(() => {

    productService.findPageRequest(queryParams.page, queryParams.name, queryParams.size)
        .then(response => {
            const allProducts = response.data.content
            setProducts(allProducts);
        });
}, [queryParams.page, queryParams.name, queryParams.size]);

  return (
    <main className="admin-container">
      <div className="stock-container">
          <div className="graph-text">Products in stock</div>
          <div className="graph-container">
            <Pie data={dataStock} />
          </div>
      </div>
    </main>
  );
}

export default PieChart;
