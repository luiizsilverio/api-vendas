import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../../repositories/ProductsRepository"
import Product from "src/entities/Product";
import AppError from "src/errors/AppError";

interface IRequest {
  name: string
  price: number
  quantity: number
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository)
    const productExists = await productsRepository.findByName(name)

    if (productExists) {
      throw new AppError('Já existe um produto com este nome')
    }

    const product = productsRepository.create({
      name,
      price,
      quantity
    })

    const newProduct = await productsRepository.save(product)

    return newProduct
  }
}
export default CreateProductService