import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../../repositories/ProductsRepository"
import Product from "src/entities/Product";
import AppError from "src/errors/AppError";

interface IRequest {
  id: string
  name: string
  price: number
  quantity: number
}

class UpdateProductService {
  public async execute(data: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository)
    const { id, name, price, quantity } = data

    const productExists = await productsRepository.findOne(id)

    if (!productExists) {
      throw new AppError('Produto não encontrado')
    }

    const product = await productsRepository.findByName(name)

    if (product) {
      throw new AppError('Já existe um produto com este nome')
    }

    product.name = name
    product.price = price
    product.quantity = quantity

    const newProd = await productsRepository.save(product)

    return newProd
  }
}

export default UpdateProductService