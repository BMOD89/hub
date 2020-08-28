import feathersClient, { makeServicePlugin, BaseModel } from '../../feathers-client'

class Incident extends BaseModel {
  constructor(data, options) {
    super(data, options)
  }

  static modelName = 'Incident'

  static instanceDefaults() {
    return {
      time: new Date(),
      sender: '',
      ref: '',
      caller_name: '',
      caller_number: '',
      reason: '',
      keyword: '',
      description: '',
      status: 'Actual',
      category: 'Other',
      location: null
    }
  }

  static setupInstance(data, { models }) {
    // Convert date strings into Date objects
    for (const prop of ['time']) {
      if (data[prop]) {
        data[prop] = new Date(data[prop])
      }
    }

    if (data.location) {
      data.location = new models.api.Location(data.location)
    }

    return data
  }
}

const servicePath = 'incidents'
const servicePlugin = makeServicePlugin({
  Model: Incident,
  service: feathersClient.service(servicePath),
  servicePath
})

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
})

export default servicePlugin
