import { getCustomRepository } from "typeorm";
import { CustomersRepository } from "../../repositories/CustomersRepository"
import Customer from "../../entities/Customer";
import AppError from "../../errors/AppError";

class DeleteCustomerService {
  public async execute(id: string): Promise<void> {
    const repository = getCustomRepository(CustomersRepository)

    const customer = await repository.findById(id)

    if (!customer) {
      throw new AppError('Cliente não encontrado')
    }

    await repository.remove(customer)
  }
}

export default DeleteCustomerService