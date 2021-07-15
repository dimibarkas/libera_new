import CustomersDAO from "../../dao/CustomersDAO"
import { constants } from "http2"
import { isLoggedIn } from "../../utils/token"
import fs from "fs"
import crypto from "crypto"

const config = {}

if (!process.env.JWT_PRIVATE_KEY) {
  config.jwtPrivateKey = fs.readFileSync("private.pem")
} else {
  config.jwtPrivateKey = Buffer.from(process.env.JWT_PRIVATE_KEY, "base64")
}
config.jwtPublicKey = crypto.createPublicKey(config.jwtPrivateKey)

export default class CustomersController {
  static async apiGetCustomers(req, res, next) {
    //if user not registered
    //if there is no Authorization Header and the Token is not ok

    const CUSTOMERS_PER_PAGE = 20
    const {
      customerList,
      totalNumCustomers,
    } = await CustomersDAO.getCustomers()
    let response = {
      customers: customerList,
      page: 0,
      filters: {},
      entries_per_page: CUSTOMERS_PER_PAGE,
      total_results: totalNumCustomers,
    }
    res.json(response)
  }

  static async apiInsertCustomer(req, res, next) {
    try {
      const body = req.body
      let errors = {}
      if (body && body.name.length < 3) {
        errors.name = "The name of the article muste be at least 3 characters"
      }

      if (Object.keys(errors).length > 0) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          code: "INSERTION_FAILED",
          message: errors.name,
        })
        return
      }

      const response = await CustomersDAO.insertCustomer(body)
      if (!response) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          code: "CUSTOMER_ALREADY_EXISTS",
          message: `Insertion failed, customer with name ${body.name} already exist`,
        })
        return
      }
      res.status(constants.HTTP_STATUS_CREATED).json({
        code: "INSERTION_SUCCED",
        message: `${response.insertedCount} customer with name ${body.name} and id ${response.insertedId} inserted.`,
      })
    } catch (error) {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ error: error })
    }
  }

  static async apiGetCustomerById(req, res, next) {
    try {
      let id = req.params.id || {}
      let customer = await CustomersDAO.getCustomerById(id)
      if (!customer) {
        res.status(constants.HTTP_STATUS_NOT_FOUND).json({
          code: "CUSTOMER_NOT_FOUND",
          message: `Customer with id ${id} could not be found.`,
        })
        return
      }

      if (customer.error) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          code: "ID_INCORRECT",
          message: `Entered id ${id} was incorrect`,
        })
        return
      }

      res.status(constants.HTTP_STATUS_OK).json({
        _id: customer._id,
        name: customer.name,
        address: {
          street: customer.address.street,
          nr: customer.address.nr,
          zipcode: customer.address.zipcode,
          city: customer.address.city,
          country: customer.address.country,
        },
        phone: customer.phone,
      })
    } catch (error) {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ error: error })
    }
  }

  static async apiUpdateCustomerById(req, res, next) {
    try {
      let id = req.params.id || {}
      let body = req.body
      let errors = {}

      if (Object.keys(body).length === 0) {
        errors.name =
          "You have to specify a new or modified name for the article inside the body of your request."
      } else if (body && body.name?.length < 3) {
        errors.name = "The name of the article must be at least 3 characters."
      }
      if (id?.length !== 24) {
        errors.id = "An error occured with the id"
      }

      if (Object.keys(errors).length > 0) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          code: "PATCH_FAILED",
          message: errors,
        })
        return
      }

      const {
        matchedCount,
        modifiedCount,
      } = await CustomersDAO.updateCustomerById(id, body)

      if (matchedCount === 1 && modifiedCount === 0) {
        res.status(constants.HTTP_STATUS_NOT_MODIFIED).json({
          code: "CUSTOMER_NOT_MODIFIED",
          message: "Customer was found but not modified.",
        })
        return
      }

      if (!modifiedCount) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          code: "PATCH_FAILED",
          message: `No customer with id ${id} found.`,
        })
        return
      }

      res.status(constants.HTTP_STATUS_OK).json({
        code: "PATCH_SUCCED",
        message: `${modifiedCount} Object with id ${id} modified.`,
      })
    } catch (error) {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ error: error })
    }
  }

  static async apiDeleteCustomerById(req, res, next) {
    try {
      let id = req.params.id || {}
      let errors = {}
      if (id.length !== 24) {
        errors.id = "An error occured with the id"
      }
      if (Object.keys(errors).length > 0) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          code: "DELETION_FAILED",
          message: errors,
        })
        return
      }
      const response = await CustomersDAO.deleteCustomerById(id)

      if (response.deletedCount < 1) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          code: "DELETION_FAILED",
          message: `No Customer with id ${id} found.`,
        })
        return
      }

      res.status(constants.HTTP_STATUS_OK).json({
        code: "DELETION_SUCCED",
        message: `${response.deletedCount} Customer with id ${id} deleted.`,
      })
    } catch (error) {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ error: error })
    }
  }
}
