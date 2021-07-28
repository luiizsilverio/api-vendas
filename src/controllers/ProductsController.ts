import { Request, Response } from 'express'
import ShowProductService from 'src/services/products/ShowProductService'
import ListProductsService from 'src/services/products/ListProductsService'
import CreateProductService from 'src/services/products/CreateProductService'
import UpdateProductService from 'src/services/products/UpdateProductService'
import DeleteProductService from 'src/services/products/DeleteProductService'

export default class ProductsController {
  public async index(req: Request, resp: Response): Promise<Response> {
    const listProducts = new ListProductsService()
    const products = await listProducts.execute()

    return resp.json(products)
  }

  public async show(req: Request, resp: Response): Promise<Response> {
    const { id } = req.params

    const showProduct = new ShowProductService()
    const product = await showProduct.execute({ id })

    return resp.json(product)
  }

  public async create(req: Request, resp: Response): Promise<Response> {
    const { name, price, quantity } = req.body

    const createProduct = new CreateProductService()

    const product = await createProduct.execute({
      name,
      price,
      quantity
    })

    return resp.json(product)
  }

  public async update(req: Request, resp: Response): Promise<Response> {
    const { id } = req.params
    const { name, price, quantity } = req.body

    const updateProduct = new UpdateProductService()

    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity
    })

    return resp.json(product)
  }

  public async delete(req: Request, resp: Response): Promise<Response> {
    const { id } = req.params

    const deleteProduct = new DeleteProductService()

    await deleteProduct.execute({ id })

    return resp.json([])
  }
}