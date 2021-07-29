import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../../repositories/ProductsRepository"
import Product from "../../entities/Product"
import AppError from "../../errors/AppError"

interface IRequest {
  id: string
  name: string
  price: number
  quantity: number
}

class UpdateProductService {
  public async execute(data: IRequest): Promise<Product> {
    const { id, name, price, quantity } = data
    const productsRepository = getCustomRepository(ProductsRepository)

    const product = await productsRepository.findOne(id)

    if (!product) {
      throw new AppError('Produto não encontrado')
    }

    const productExists = await productsRepository.findByName(name)

    if (productExists) {
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