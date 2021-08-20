import { getCustomRepository } from "typeorm";
import AppError from "../../errors/AppError";
import { OrdersRepository } from "../../repositories/OrdersRepository";
import Order from "../../entities/Order";

class ShowOrderService {
  public async execute(id: string): Promise<Order> {
    const repository = getCustomRepository(OrdersRepository)

    const order = await repository.findById(id)

    if (!order) {
      throw new AppError('Pedido não encontrado')
    }

    return order
  }
}

export default ShowOrderService