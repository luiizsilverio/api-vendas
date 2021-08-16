import { getCustomRepository } from "typeorm";

import { CustomersRepository } from "../../repositories/CustomersRepository"
import Customer from "../../entities/Customer"
import AppError from "../../errors/AppError"

interface IRequest {
  name: string
  email: string
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const repository = getCustomRepository(CustomersRepository)
    const emailExists = await repository.findByEmail(email)

    if (emailExists) {
      throw new AppError('E-mail já está sendo utilizado')
    }

    const customer = repository.create({
      name,
      email
    })

    const newCustomer = await repository.save(customer)
    return newCustomer
  }
}
export default CreateCustomerService