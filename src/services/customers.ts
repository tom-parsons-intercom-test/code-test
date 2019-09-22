
import {Request} from "express"

import {filterByRadius, sortCustomers} from "./utils"
import {getCustomersFromWeb, getCustomersFromLocal} from "./getCustomers"
import {Customer, CustomerField, DataSrc, OrderDir} from "./types"

const DEFAULT_LAT = 53.339428
const DEFAULT_LNG = -6.257664
const DEFAULT_MAX_RADIUS = 100
const DEFAULT_ORDER_BY = CustomerField.user_id
const DEFAULT_ORDER_DIR = OrderDir.asc

interface CustomerService {
  getByLocation: (req: LocationCustomerRequest) => Promise<Customer[]>
}

interface RequestParams {
  centerLat?: number,
  centerLng?: number,
  dataSrc?: DataSrc,
  maxRadius?: number,
  orderBy?: CustomerField,
  orderDir?: OrderDir
}

interface LocationCustomerRequest extends Request {
  query: RequestParams
}

const handleData = (customers: Customer[], query: RequestParams): Customer[] => {
  const filteredCustomers = filterByRadius(
    customers,
    query.centerLat || DEFAULT_LAT,
    query.centerLng || DEFAULT_LNG,
    query.maxRadius || DEFAULT_MAX_RADIUS
  )

  const sortedCustomers = sortCustomers(
    filteredCustomers,
    query.orderBy || DEFAULT_ORDER_BY,
    query.orderDir || DEFAULT_ORDER_DIR
  )

  return sortedCustomers
}

const service: CustomerService = {
  getByLocation: ({query}) => {
    if (query.dataSrc === DataSrc.web) {
      return getCustomersFromWeb("https://s3.amazonaws.com/intercom-take-home-test/customers.txt")
        .then((customers: Customer[]) => handleData(customers, query))
    }

    return getCustomersFromLocal("src/static/customers.txt")
      .then((customers: Customer[]) => handleData(customers, query))
  }
}

export default service
