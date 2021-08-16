import { getCustomRepository } from "typeorm";
import { CustomersRepository } from "../../repositories/CustomersRepository"
import Customer from "src/entities/Customer";

class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const repository = getCustomRepository(CustomersRepository)

    const customers = await repository.find()

    return customers
  }
}

export default ListCustomerService