const path = require("path");
module.exports = {
  friendlyName: "Vane",
  description:
    "Create realistic test data for a given model using the model factory found in config/factories",
  inputs: {
    model: {
      type: "string",
      required: true,
    },
    count: {
      type: 'number',
      min: 1,
      defaultsTo: 1
    },
    data: {
      type: "ref",
      defaultsTo: {},
    }
  },
  exits: {
    success: {
      description: "All done.",
    },
  },
  fn: async function ({ model, count, data: overwriteValues }) {
    const factoryPath = path.resolve(
      process.cwd(),
      `config/factories/${model}`
    );

    const factoryValues = require(factoryPath);
    const initialValues = { ...factoryValues, ...overwriteValues };
    const model = sails.models[model]
    const initialValuesArray = [];
    
      for (let i = 0; i < count; i++) {
        initialValuesArray.push(initialValues)
      }
    const result = await model.createEach(initialValuesArray).fetch();
    if(count === 1){
      return result[0]
    }
    return result;
  },
};
