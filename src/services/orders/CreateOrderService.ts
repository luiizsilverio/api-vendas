import { getCustomRepository } from "typeorm";
import AppError from "../../errors/AppError";
import { ProductsRepository } from "../../repositories/ProductsRepository"
import { CustomersRepository } from "../../repositories/CustomersRepository";
import { OrdersRepository } from "../../repositories/OrdersRepository";
import Order from "../../entities/Order";

interface IProduct {
  id: string
  quantity: number
}

interface IRequest {
  customer_id: string
  products: IProduct[]
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersrepository = getCustomRepository(OrdersRepository)
    const customerRepository = getCustomRepository(CustomersRepository)
    const productsRepository = getCustomRepository(ProductsRepository)

    const customerExists = await customerRepository.findById(customer_id)

    if (!customerExists) {
      throw new AppError('Cliente não encontrado')
    }

    const productsExists = await productsRepository.findByIds(products)

    if (!productsExists.length) {
      throw new AppError('Produtos não encontrados')
    }

    if (productsExists.length < products.length) {
      throw new AppError('Um ou mais produto(s) não encontrado(s)')
    }

    const prodUnavailable = products.filter(
      product => {
        const prod = productsExists.filter(p => p.id === product.id)[0]
        return prod.quantity < product.quantity
      }
    )

    if (prodUnavailable.length > 0) {
      throw new AppError(`Produto ${prodUnavailable[0].id} com saldo insuficiente`)
    }

    const listProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productsExists.filter(p => p.id === product.id)[0].price
    }))

    const order = await ordersrepository.createOrder({
      customer: customerExists,
      products: listProducts
    })

    const { order_products } = order;

    const updatedProduct = order_products.map(
      product => ({
        id: product.id,
        quantity: productsExists
          .filter(p => p.id === product.id)[0].quantity - product.quantity
      })
    )

    await productsRepository.save(updatedProduct)

    return order
  }
}

export default CreateOrderService