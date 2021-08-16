import { getCustomRepository } from "typeorm";
import { compare, hash } from 'bcryptjs'
import { CustomersRepository } from "../../repositories/CustomersRepository"
import Customer from "../../entities/Customer";
import AppError from "../../errors/AppError";

interface IRequest {
  id: string
  name: string
  email: string
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const repository = getCustomRepository(CustomersRepository)

    const customer = await repository.findById(id)

    if (!customer) {
      throw new AppError('Cliente não encontrado')
    }

    const customerExists = await repository.findByEmail(email)

    if (customerExists && email !== customerExists.email) {
      throw new AppError('Já existe um cliente com esse e-mail')
    }

    customer.name = name
    customer.email = email

    const newCustomer = await repository.save(customer)
    return newCustomer
  }
}

export default UpdateCustomerService