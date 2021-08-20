import { getCustomRepository } from "typeorm";
import { CustomersRepository } from "../../repositories/CustomersRepository"
import Customer from "src/entities/Customer";

interface IPaginateCustomer {
  from: number
  to: number
  per_page: number
  total: number
  current_page: number
  prev_page: number | null
  next_page: number | null
  data: Customer[]
}

class ListCustomerService {
  public async execute(): Promise<IPaginateCustomer> {
    const repository = getCustomRepository(CustomersRepository)

    // const customers = await repository.find()
    const customers = await repository.createQueryBuilder().paginate()

    return customers as IPaginateCustomer
  }
}

export default ListCustomerService