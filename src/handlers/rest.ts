import express, {NextFunction, Request, Response} from "express"

import customers from "../services/customers"

const router = express.Router()

router.get("/customers-by-location", async(req: Request, res: Response, next: NextFunction) => {
  try {
    const customerList = await customers.getByLocation(req)
    return res.json(customerList)
  } catch(err) {
    return next(err)
  }
})

export default router
