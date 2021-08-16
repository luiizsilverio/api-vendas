import { getCustomRepository } from "typeorm";
import { CustomersRepository } from "../../repositories/CustomersRepository"
import Customer from "../../entities/Customer";
import AppError from "../../errors/AppError";

class ShowProfileService {
  public async execute(id: string): Promise<Customer> {
    const repository = getCustomRepository(CustomersRepository)

    const customer = await repository.findById(id)

    if (!customer) {
      throw new AppError('Cliente não encontrado')
    }

    return customer
  }
}

export default ShowProfileService