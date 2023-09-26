import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/delete.svg';
import './styles.css';
import { useState, useEffect } from 'react';
import * as productService from '../../../services/product-service';
import { ProductDTO } from '../../../models/product';
import SearchBar from '../../../components/SearchBar';
import ButtonNextPage from '../../../components/ButtonNextPage';
import DialogInfo from '../../../components/DialogInfo';

type QueryParams = {
  page: number;
  name: string;
}

function ProductListing() {

  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    name: ""
  });
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {

    productService.findPageRequest(queryParams.page, queryParams.name)
        .then(response => {
            const nextPage = response.data.content
            setProducts(products.concat(nextPage));
            setIsLastPage(response.data.last);
        });
  }, [queryParams]);

  function handleSearch(searchText: string) {
    setProducts([]);
    setQueryParams({...queryParams, page: 0, name: searchText});
  }

  function handleNextPageClick() {
    setQueryParams({ ...queryParams, page: queryParams.page + 1 });
  }

  return (
    <main>
      <section id="product-listing-section" className="dsc-container">
        <h2 className="dsc-section-title dsc-mb20">Cadastro de produtos</h2>

        <div className="dsc-btn-page-container dsc-mb20">
          <div className="dsc-btn dsc-btn-white">Novo</div>
        </div>

        <SearchBar onSearch={handleSearch}/>

        <table className="dsc-table dsc-mb20 dsc-mt20">
          <thead>
            <tr>
              <th className="dsc-tb576">ID</th>
              <th></th>
              <th className="dsc-tb768">Preço</th>
              <th className="dsc-txt-left">Nome</th>
              <th></th>
              <th></th>  
            </tr>
          </thead>
          <tbody>
            {
              products.map(({name, id, imgUrl, price}) => (
                <tr key={id}>
                  <td className="dsc-tb576">{id}</td>
                  <td><img className="dsc-product-listing-image" src={imgUrl} alt="Computer" /></td>
                  <td className="dsc-tb768">R$ {price}</td>
                  <td className="dsc-txt-left">{name}</td>
                  <td><img className="dsc-product-listing-btn" src={editIcon} alt="Editar" /></td>
                  <td><img className="dsc-product-listing-btn" src={deleteIcon} alt="Deletar" /></td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {
          !isLastPage &&
          <ButtonNextPage onNextPage={handleNextPageClick}/>
        }
      </section>
      <DialogInfo />
    </main>
  );
}

export default ProductListing;
