import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/delete.svg';
import './styles.css';
import { useState, useEffect } from 'react';
import * as productService from '../../../services/product-service';
import { ProductDTO } from '../../../models/product';
import SearchBar from '../../../components/SearchBar';
import ButtonNextPage from '../../../components/ButtonNextPage';
import DialogInfo from '../../../components/DialogInfo';
import DialogConfirmation from '../../../components/DialogConfirmation';

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
  const [dialogInfoData, setDialogInfoData] = useState({
    visible: false,
    message: "Success!"
  });
  const [dialogDeleteData, setDialogDeleteData] = useState({
    id: 0,
    visible: false,
    message: "Delete product?"
  });

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

  function handleDialogInfoClose() {
    setDialogInfoData({ ...dialogInfoData, visible: false });
  }

  function handleDeleteClick(productId: number) {
    setDialogDeleteData({ ...dialogDeleteData, id: productId, visible: true });
  }

  function handleDialogConfirmationAnswer(answer: boolean, productId: number) {
    if (answer) {
      productService.deleteById(productId)
        .then(() => {
          setProducts([]);
          setQueryParams({ ...queryParams, page: 0 });
        })
        .catch(error => {
          setDialogInfoData({
            visible: true,
            message: error.response.data.error
          });
        })
    }
    setDialogDeleteData({ ...dialogDeleteData, visible: false });
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
                  <td><img className="dsc-product-listing-btn" src={deleteIcon} alt="Deletar" onClick={() => handleDeleteClick(id)}/></td>
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
      {
        dialogInfoData.visible &&
        <DialogInfo
          message={dialogInfoData.message}
          onDialogClose={handleDialogInfoClose} />
      }
       {
        dialogDeleteData.visible &&
        <DialogConfirmation
          id={dialogDeleteData.id}
          message={dialogDeleteData.message}
          onDialogAnswer={handleDialogConfirmationAnswer} />
      }
    </main>
  );
}

export default ProductListing;