import { Request, Response } from 'express'
import UpdateCustomerService from '../services/customers/UpdateCustomerService'
import CreateCustomerService from '../services/customers/CreateCustomerService'
import ListCustomerService from '../services/customers/ListCustomerService'
import ShowCustomerService from '../services/customers/ShowCustomerService'
import DeleteCustomerService from '../services/customers/DeleteCustomerService'

export default class CustomersController {
  public async index(req: Request, resp: Response): Promise<Response> {
    const listCustomers = new ListCustomerService()
    const customers = await listCustomers.execute()

    return resp.json(customers)
  }

  public async show(req: Request, resp: Response): Promise<Response> {
    const { id } = req.params

    const showCustomer = new ShowCustomerService()
    const customer = await showCustomer.execute(id)

    return resp.json(customer)
  }

  public async create(req: Request, resp: Response): Promise<Response> {
    const { name, email } = req.body

    const createCustomer = new CreateCustomerService()

    const customer = await createCustomer.execute({
      name,
      email
    })

    return resp.json(customer)
  }

  public async update(req: Request, resp: Response): Promise<Response> {
    const { id } = req.params
    const { name, email } = req.body

    const updateCustomer = new UpdateCustomerService()

    const customer = await updateCustomer.execute({
      id,
      name,
      email
    })

    return resp.json(customer)
  }

  public async delete(req: Request, resp: Response): Promise<Response> {
    const { id } = req.params

    const deleteCustomer = new DeleteCustomerService()

    await deleteCustomer.execute(id)

    return resp.json([])
  }
}