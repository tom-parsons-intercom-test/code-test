import {Customer, CustomerField, OrderDir} from "./types"

const degreeToRadius = (deg: number): number => {
  return deg * (Math.PI/180)
}

const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const earthRadius = 6371
  const radiusLat = degreeToRadius(lat2 - lat1)
  const radiusLon = degreeToRadius(lon2 - lon1)
  const a = Math.sin(radiusLat/2) * Math.sin(radiusLat/2) +
            Math.cos(degreeToRadius(lat1)) * Math.cos(degreeToRadius(lat2)) *
            Math.sin(radiusLon/2) * Math.sin(radiusLon/2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return earthRadius * c
}

export const filterByRadius = (customers: Customer[], centerLat: number, centerLng: number, maxRadius: number): Customer[] => {
  return customers.filter(customer => {
    const distance = getDistanceFromLatLonInKm(centerLat, centerLng, customer.latitude, customer.longitude)
    // @todo if we wanted radius on the user object, we would need to add it here
    return distance < maxRadius
  })
}

export const sortCustomers = (customers: Customer[], orderBy: CustomerField, orderDir: OrderDir): Customer[] => {
  if (!Object.values(CustomerField).includes(orderBy)) {
    throw TypeError("invalid order by")
  }

  return customers.sort((a, b) => {
    if (orderDir === OrderDir.desc) {
      return (`${b[orderBy]}`).localeCompare(`${a[orderBy]}`)
    }

    return (`${a[orderBy]}`).localeCompare(`${b[orderBy]}`)
  })
}
