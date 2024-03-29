// conver all to esm import
import express from 'express'
import util from 'util'
import accounts from './accounts'
import cards1 from './cards-1'
import cards2 from './cards-2'
import cardReplaced from './card-replaced'
import userTier from './tier'
import familyRoute from './family'
import webhookRoute from './webhook'

const app = express()

app.use(
  express.json({
    verify: (req, _, buf) => {
      // @ts-expect-error
      req.rawBody = buf.toString()
    },
  }),
)

app.use('/api/family', familyRoute)

app.get('/api/user/transactions', function (req, res) {
  console.log('')
  console.log('-------- GET /user/transactions --------')
  console.log('request headers', req.headers)
  // Generate dates
  // Date one
  const dateOne = new Date()
  dateOne.setDate(dateOne.getDate() - 1)
  dateOne.setHours(9, 0, 0, 0)
  // Date two
  const dateTwo = new Date()
  dateTwo.setDate(dateTwo.getDate() - 1)
  dateTwo.setHours(11, 0, 0, 0)
  // Date three
  const dateThree = new Date()
  dateThree.setDate(dateThree.getDate() - 2)
  dateThree.setHours(6, 0, 0, 0)

  const response = {
    transactions: [
      {
        date: dateOne,
        merchant: 'Legitimate Business, Inc',
        amount: '$100.00',
      },
      {
        date: dateTwo,
        merchant: "Shady's iTunes Gift Card Shop",
        amount: '$420.00',
      },
      {
        date: dateThree,
        merchant: "Lucky's Lunch Laboratory",
        amount: '$24.71',
      },
    ],
  }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.post('/api/disputes/submit', function (req, res) {
  console.log(`-------- POST /disputes/submit --------`)
  console.log('request headers', req.headers)
  console.log(
    'request body',
    util.inspect(req.body, false, null, true /* enable colors */),
  )
  const response = { success: true }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.post('/api/user/email', function (req, res) {
  console.log(`-------- POST /user/email --------`)
  console.log('request headers', req.headers)
  console.log(
    'request body',
    util.inspect(req.body, false, null, true /* enable colors */),
  )
  const response = { success: true }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.get('/api/user', function (req, res) {
  console.log('')
  console.log('-------- GET /user --------')
  console.log('request headers', req.headers)
  const response = {
    user: {
      address: {
        city: 'string',
        country: 'string',
        line1: 'string',
        line2: 'string',
        location: {
          latitude: 0,
          longitude: 0,
        },
        state_province_region: 'string',
        zip_postal_code: 'string',
      },
      auto_billing: true,
      createdAtMs: 'string',
      dob: 'string',
      id: 'string',
      kyc_errors: ['INVALID_ERROR'],
      kyc_status: 'INVALID',
      legalName: {
        firstName: 'Paul',
        lastName: 'Lastname',
      },
      monitor_credit: true,
      nickname: 'string',
      picture_url: 'string',
      report_credit: true,
      shipping: {
        address: {
          city: 'Palo Alto',
          country: 'United States',
          line1: '120 Hawthorne Ave',
          line2: '',
          location: {
            latitude: 0,
            longitude: 0,
          },
          stateProvinceRegion: 'CA',
          zipPostalCode: '94301',
        },
        is_confirmed: true,
        is_validated: true,
      },
      ssn_on_file: 'INVALID_SSN_ON_FILE',
      updated_at_ms: 'string',
    },
  }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.post('/api/user/shipping-address', function (req, res) {
  console.log(`-------- POST /user/shipping-address --------`)
  console.log('request headers', req.headers)
  console.log(
    'request body',
    util.inspect(req.body, false, null, true /* enable colors */),
  )
  const response = { success: true }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.get('/api/user/orders', function (req, res) {
  console.log('')
  console.log('-------- GET /user/orders --------')
  console.log('request headers', req.headers)
  const response = {
    orders: [
      {
        id: '1',
        status: 'In transit',
        estimatedDeliveryDays: '3 days',
      },
    ],
  }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.get('/api/user/appointments', function (req, res) {
  console.log('')
  console.log('-------- GET /user/appointments --------')
  console.log('request headers', req.headers)
  const dateOne = new Date()
  dateOne.setDate(dateOne.getDate() + 1)
  dateOne.setHours(9, 0, 0, 0)
  const dateTwo = new Date()
  dateTwo.setDate(dateTwo.getDate() + 2)
  dateTwo.setHours(11, 0, 0, 0)
  const response = {
    availableSlots: [
      {
        id: '1',
        date: dateOne,
      },
      {
        id: '2',
        date: dateTwo,
      },
    ],
  }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.get('/api/tier/user-tier', function (req, res) {
  console.log('')
  console.log('-------- GET /tier/user-tier --------')
  console.log('request headers', req.headers)
  const response = userTier
  console.log(
    'request body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.post('/api/appointments', function (req, res) {
  console.log('-------- POST /appointments --------')
  console.log('request headers', req.headers)
  console.log(
    'request body',
    util.inspect(req.body, false, null, true /* enable colors */),
  )
  const response = { success: true }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.post('/api/card/replace', function (req, res) {
  console.log('-------- POST /card/replace --------')
  console.log('request headers', req.headers)
  console.log(
    'request body',
    util.inspect(req.body, false, null, true /* enable colors */),
  )
  const response = { success: true }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.post('/api/user', function (req, res) {
  console.log('-------- POST /user --------')
  console.log('request headers', req.headers)
  console.log(
    'request body',
    util.inspect(req.body, false, null, true /* enable colors */),
  )
  const response = {
    success: true,
    updatedShippingAddress: req.body.shippingAddress,
  }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.get('/api/profile', function (req, res) {
  console.log('')
  console.log('-------- GET /profile --------')
  console.log('request headers', req.headers)
  const response = {
    profile: {
      verifiedAliases: [
        {
          userId: 'u:123',
        },
        {
          phoneNumber: '16025559397',
        },
        {
          email: 'thisisme@mail.com',
        },
        {
          username: 'user123',
        },
      ],
      unverifiedAliases: [],
      groups: [],
      blocked: false,
      suspended: false,
      createdAtMs: '1707514571743',
    },
  }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.post('/api/auth/login', function (req, res) {
  console.log('-------- POST /auth/login --------')
  console.log('request headers', req.headers)
  console.log(
    'request body',
    util.inspect(req.body, false, null, true /* enable colors */),
  )
  const response = { accessToken: { value: 'this-is-the-final-auth-token!' } }
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.get('/api/account', function (req, res) {
  console.log('')
  console.log('-------- GET /account --------')
  console.log('request headers', req.headers)
  const response = accounts
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.get('/api/account/:primaryAccountId/card', function (req, res) {
  const primaryAccountId = req.params.primaryAccountId
  console.log('')
  console.log(`-------- GET /account/${primaryAccountId}/card --------`)
  console.log('request headers', req.headers)
  const response = primaryAccountId === 'account-0001' ? cards1 : cards2
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.post('/api/card/:cardId/replace/shipping', function (req, res) {
  const cardId = req.params.cardId
  console.log(`-------- POST /card/${cardId}/replace/shipping --------`)
  console.log('request headers', req.headers)
  console.log(
    'request body',
    util.inspect(req.body, false, null, true /* enable colors */),
  )
  const response = cardReplaced
  console.log(
    'response body',
    util.inspect(response, false, null, true /* enable colors */),
  )
  res.send(response)
})

app.use('/api/push', webhookRoute)

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})

module.exports = app
