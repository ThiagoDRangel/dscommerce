import { Link, useParams } from 'react-router-dom';
import IFormData from '../../../../interfaces/IFormData';
import * as forms from '../../../../utils/forms';
import * as productService from '../../../../services/product-service';
import * as categoryService from '../../../../services/category-service';
import { useEffect, useState } from 'react';
import FormInput from '../../../../components/FormInput';
import './styles.css';
import FormTextArea from '../../../../components/FormTextArea';
import { CategoryDTO } from '../../../../models/Category';
import FormSelect from '../../../../components/FormSelect';

function ProductForm() {

  const params = useParams();
  const isEditing = params.productId !== 'create';
  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  const [formData, setFormData] = useState<IFormData>({
    name: {
      value: "",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Nome",
      validation: function(value: string) {
        return /^[a-zA-Z0-9 ]{3,80}$/.test(value);
      },
      message: "O nome deve ter entre 3 e 80 caracteres",
    },
    price: {
      value: 0,
      id: "price",
      name: "price",
      type: "number",
      placeholder: "Preço",
      validation: function(value: any) {
        return Number(value) > 0;
      },
      message: "O preço deve ser maior que zero",
    },
    imgUrl: {
      value: "",
      id: "imgUrl",
      name: "imgUrl",
      type: "text",
      placeholder: "Imagem",
    },
    description: {
      value: "",
      id: "description",
      name: "description",
      type: "text",
      placeholder: "Descrição",
      validation: function(value: string) {
        return /^[a-zA-Z0-9 ]{10,}$/.test(value);
      },
      message: "A descrição deve ter no mínimo 10 caracteres",
    },
    categories: {
      value: [],
      id: "categories",
      name: "categories",
      placeholder: "Categorias",
      validation: function(value: CategoryDTO[]) {
        return value.length > 0;
      },
      message: "Selecione pelo menos uma categoria",
    },
  });

  useEffect(() => {
    categoryService.findAllRequest()
      .then(response => {
        setCategories(response.data);
      })
  }, [])

  useEffect(() => {

    if (isEditing) {
      productService.findById(Number(params.productId))
        .then(response => {
          const newFormData = forms.updateAll(formData, response.data)
          setFormData(newFormData);
        })
    }
  }, []);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const result = forms.updateAndValidate(formData, name, value);
    setFormData(result);
  }

  function handleTurnDirty(name: string) {
    const newFormData = forms.dirtyAndValidate(formData, name);
    setFormData(newFormData);
  }

  return (
    <main>
      <section id="product-form-section" className="dsc-container">
        <div className="dsc-product-form-container">
          <form className="dsc-card dsc-form">
            <h2>Dados do produto</h2>
            <div className="dsc-form-controls-container">
              <div>
                <FormInput
                  { ...formData.name}
                  className="dsc-form-control"
                  onChange={handleInputChange}
                  onTurnDirty={handleTurnDirty}
                />
                <div className="dsc-form-error">{formData.name.message}</div>
              </div>
              <div>
                <FormInput
                    { ...formData.price}
                    className="dsc-form-control"
                    onChange={handleInputChange}
                    onTurnDirty={handleTurnDirty}
                />
                <div className="dsc-form-error">{formData.price.message}</div>
              </div>
              <div>
                <FormInput
                    { ...formData.imgUrl}
                    className="dsc-form-control"
                    onChange={handleInputChange}
                    onTurnDirty={handleTurnDirty}
                  />
              </div>
              <div>
                <FormSelect
                  { ...formData.categories}
                  className="dsc-form-control"
                  options={categories}
                  onChange={(obj: any) =>{
                    const newFormData = forms.updateAndValidate(formData, 'categories', obj);
                    setFormData(newFormData);
                  }}
                  onTurnDirty={handleTurnDirty}
                  isMulti
                  getOptionLabel={(obj: any) => obj.name}
                  getOptionValue={(obj: any) => String(obj.id)}
                />
              </div>
              <div className="dsc-form-error">{formData.categories.message}</div>
              <div>
                <FormTextArea
                  { ...formData.description}
                  className="dsc-form-control dsc-textarea"
                  onChange={handleInputChange}
                  onTurnDirty={handleTurnDirty}
                />
                <div className="dsc-form-error">{formData.description.message}</div>
              </div>
            </div>

            <div className="dsc-product-form-buttons">
              <Link to="/admin/products">
                <button type="reset" className="dsc-btn dsc-btn-white">Cancelar</button>
              </Link>
              <button type="submit" className="dsc-btn dsc-btn-blue">Salvar</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default ProductForm;
