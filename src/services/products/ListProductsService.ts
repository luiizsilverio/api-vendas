import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../../repositories/ProductsRepository"
import Product from "@/entities/Product";

class ListProductsService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository)

    const products = await productsRepository.find()

    return products
  }
}

export default ListProductsService