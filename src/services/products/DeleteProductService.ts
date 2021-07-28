import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../../repositories/ProductsRepository"
import AppError from "src/errors/AppError";

interface IRequest {
  id: string
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository)

    const product = await productsRepository.findOne(id)

    if (!product) {
      throw new AppError('Produto não encontrado')
    }

    await productsRepository.remove(product)
  }
}

export default DeleteProductService