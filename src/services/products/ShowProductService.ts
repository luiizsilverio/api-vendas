import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../../repositories/ProductsRepository"
import Product from "../../entities/Product"
import AppError from "../../errors/AppError"

interface IRequest {
  id: string
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository)

    const product = await productsRepository.findOne(id)

    if (!product) {
      throw new AppError('Produto não encontrado')
    }

    return product
  }
}

export default ShowProductService