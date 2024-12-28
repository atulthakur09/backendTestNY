{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
      "brand": {
        "type": "string",
        "minLength": 1
      },
      "model": {
        "type": "string",
        "minLength": 1
      },
      "periodicServices": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "minLength": 1
            },
            "services": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "serviceName": {
                    "type": "string",
                    "minLength": 1
                  },
                  "price": {
                    "type": "number",
                    "minimum": 0
                  }
                },
                "required": ["serviceName", "price"]
              }
            }
          },
          "required": ["name", "services"]
        }
      },
      "acServiceRepair": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "minLength": 1
            },
            "services": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "serviceName": {
                    "type": "string",
                    "minLength": 1
                  },
                  "price": {
                    "type": "number",
                    "minimum": 0
                  }
                },
                "required": ["serviceName", "price"]
              }
            }
          },
          "required": ["name", "services"]
        }
      },
      "batteries": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "minLength": 1
            },
            "types": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                    "minLength": 1
                  },
                  "services": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "serviceName": {
                          "type": "string",
                          "minLength": 1
                        },
                        "price": {
                          "type": "number",
                          "minimum": 0
                        }
                      },
                      "required": ["serviceName", "price"]
                    }
                  }
                },
                "required": ["name", "services"]
              }
            }
          },
          "required": ["name", "types"]
        }
      },
      "tyresWheelCare": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "minLength": 1
            },
            "types": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                    "minLength": 1
                  },
                  "services": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "serviceName": {
                          "type": "string",
                          "minLength": 1
                        },
                        "price": {
                          "type": "number",
                          "minimum": 0
                        }
                      },
                      "required": ["serviceName", "price"]
                    }
                  }
                },
                "required": ["name", "services"]
              }
            }
          },
          "required": ["name", "types"]
        }
      },
      "dentingPainting": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "minLength": 1
            },
            "services": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "serviceName": {
                    "type": "string",
                    "minLength": 1
                  },
                  "price": {
                    "type": "number",
                    "minimum": 0
                  }
                },
                "required": ["serviceName", "price"]
              }
            }
          },
          "required": ["name", "services"]
        }
      },
      "detailingService": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "minLength": 1
            },
            "services": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "serviceName": {
                    "type": "string",
                    "minLength": 1
                  },
                  "price": {
                    "type": "number",
                    "minimum": 0
                  }
                },
                "required": ["serviceName", "price"]
              }
            }
          },
          "required": ["name", "services"]
        }
      },
      "carSpaCleaningService": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "minLength": 1
            },
            "services": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "serviceName": {
                    "type": "string",
                    "minLength": 1
                  },
                  "price": {
                    "type": "number",
                    "minimum": 0
                  }
                },
                "required": ["serviceName", "price"]
              }
            }
          },
          "required": ["name", "services"]
        }
      },
      "carInspection": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "minLength": 1
            },
            "services": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "serviceName": {
                    "type": "string",
                    "minLength": 1
                  },
                  "price": {
                    "type": "number",
                    "minimum": 0
                  }
                },
                "required": ["serviceName", "price"]
              }
            }
          },
          "required": ["name", "services"]
        }
      },
      "windshieldsLights": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "minLength": 1
            },
            "services": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "serviceName": {
                    "type": "string",
                    "minLength": 1
                  },
                  "price": {
                    "type": "number",
                    "minimum": 0
                  }
                },
                "required": ["serviceName", "price"]
              }
            }
          },
          "required": ["name", "services"]
        }
      },
      "suspensionFitments": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "minLength": 1
            },
            "services": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "serviceName": {
                    "type": "string",
                    "minLength": 1
                  },
                  "price": {
                    "type": "number",
                    "minimum": 0
                  }
                },
                "required": ["serviceName", "price"]
              }
            }
          },
          "required": ["name", "services"]
        }
      },
      "clutchBodyParts": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "minLength": 1
            },
            "services": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "serviceName": {
                    "type": "string",
                    "minLength": 1
                  },
                  "price": {
                    "type": "number",
                    "minimum": 0
                  }
                },
                "required": ["serviceName", "price"]
              }
            }
          },
          "required": ["name", "services"]
        }
      },
      "insurance": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "minLength": 1
            },
            "services": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "serviceName": {
                    "type": "string",
                    "minLength": 1
                  },
                  "price": {
                    "type": "number",
                    "minimum": 0
                  }
                },
                "required": ["serviceName", "price"]
              }
            }
          },
          "required": ["name", "services"]
        }
      }
    },
    "required": [
      "brand",
      "model",
      "periodicServices",
      "acServiceRepair",
      "batteries",
      "tyresWheelCare",
      "dentingPainting",
      "detailingService",
      "carSpaCleaningService",
      "carInspection",
      "windshieldsLights",
      "suspensionFitments",
      "clutchBodyParts",
      "insurance"
    ]
  }
  

// const { checkSchema } = require('express-validator');

// const vehicleServicePricesSchema = checkSchema({
//     brand: {
//         notEmpty: {
//             errorMessage: 'Brand cannot be empty'
//         },
//         trim: true,
//         isString: {
//             errorMessage: 'Brand must be a string'
//         }
//     },
//     model: {
//         notEmpty: {
//             errorMessage: 'Vehicle model cannot be empty'
//         },
//         trim: true,
//         isString: {
//             errorMessage: 'Vehicle model must be a string'
//         }
//     },
//     periodicServices: {
//         isArray: {
//             errorMessage: 'Periodic Services must be an array'
//         },
//         custom: {
//             options: (items) => {
//                 if (!items.length) {
//                     throw new Error('At least one periodic service must be included');
//                 }
//                 items.forEach(item => {
//                     if (!item.name || !Array.isArray(item.services)) {
//                         throw new Error('Each periodic service must have a name and services array');
//                     }
//                     item.services.forEach(service => {
//                         if (!service.serviceName || typeof service.price !== 'number' || service.price <= 0) {
//                             throw new Error('Each service must have a valid serviceName and positive price');
//                         }
//                     });
//                 });
//                 return true;
//             }
//         }
//     },
//     acServiceRepair: {
//         isArray: {
//             errorMessage: 'AC Service Repair must be an array'
//         },
//         optional: true,
//         custom: {
//             options: (items) => {
//                 if (items && items.length) {
//                     items.forEach(item => {
//                         if (!item.name || !Array.isArray(item.services)) {
//                             throw new Error('Each AC Service Repair must have a name and services array');
//                         }
//                         item.services.forEach(service => {
//                             if (!service.serviceName || typeof service.price !== 'number' || service.price <= 0) {
//                                 throw new Error('Each AC Service must have a valid serviceName and positive price');
//                             }
//                         });
//                     });
//                 }
//                 return true;
//             }
//         }
//     },
//     batteries: {
//         isArray: {
//             errorMessage: 'Batteries must be an array'
//         },
//         optional: true,
//         custom: {
//             options: (items) => {
//                 if (items && items.length) {
//                     items.forEach(item => {
//                         if (!item.name || !Array.isArray(item.services) || !Array.isArray(item.types)) {
//                             throw new Error('Each Batteries entry must have a name, types array and services array');
//                         }
//                         item.services.forEach(service => {
//                             if (!service.serviceName || typeof service.price !== 'number' || service.price <= 0) {
//                                 throw new Error('Each Battery Service must have a valid serviceName and positive price');
//                             }
//                         });
//                         item.types.forEach(type => {
//                             if (!type.name || !Array.isArray(type.services)) {
//                                 throw new Error('Each Battery type must have a name and services array');
//                             }
//                             type.services.forEach(service => {
//                                 if (!service.serviceName || typeof service.price !== 'number' || service.price <= 0) {
//                                     throw new Error('Each Battery Type Service must have a valid serviceName and positive price');
//                                 }
//                             });
//                         });
//                     });
//                 }
//                 return true;
//             }
//         }
//     },
//     tyresWheelCare: {
//         isArray: {
//             errorMessage: 'Tyres Wheel Care must be an array'
//         },
//         optional: true,
//         custom: {
//             options: (items) => {
//                 if (items && items.length) {
//                     items.forEach(item => {
//                         if (!item.name || !Array.isArray(item.services) || !Array.isArray(item.types)) {
//                             throw new Error('Each Tyres Wheel Care entry must have a name, types array and services array');
//                         }
//                         item.services.forEach(service => {
//                             if (!service.serviceName || typeof service.price !== 'number' || service.price <= 0) {
//                                 throw new Error('Each Tyres Wheel Care Service must have a valid serviceName and positive price');
//                             }
//                         });
//                         item.types.forEach(type => {
//                             if (!type.name || !Array.isArray(type.services)) {
//                                 throw new Error('Each Tyre Type must have a name and services array');
//                             }
//                             type.services.forEach(service => {
//                                 if (!service.serviceName || typeof service.price !== 'number' || service.price <= 0) {
//                                     throw new Error('Each Tyre Type Service must have a valid serviceName and positive price');
//                                 }
//                             });
//                         });
//                     });
//                 }
//                 return true;
//             }
//         }
//     },
//     dentingPainting: {
//         isArray: {
//             errorMessage: 'Denting Painting must be an array'
//         },
//         optional: true,
//         custom: {
//             options: (items) => {
//                 if (items && items.length) {
//                     items.forEach(item => {
//                         if (!item.name || !Array.isArray(item.services)) {
//                             throw new Error('Each Denting Painting entry must have a name and services array');
//                         }
//                         item.services.forEach(service => {
//                             if (!service.serviceName || typeof service.price !== 'number' || service.price <= 0) {
//                                 throw new Error('Each Denting Painting Service must have a valid serviceName and positive price');
//                             }
//                         });
//                     });
//                 }
//                 return true;
//             }
//         }
//     },
//     detailingService: {
//         isArray: {
//             errorMessage: 'Detailing Service must be an array'
//         },
//         optional: true,
//         custom: {
//             options: (items) => {
//                 if (items && items.length) {
//                     items.forEach(item => {
//                         if (!item.name || !Array.isArray(item.services)) {
//                             throw new Error('Each Detailing Service entry must have a name and services array');
//                         }
//                         item.services.forEach(service => {
//                             if (!service.serviceName || typeof service.price !== 'number' || service.price <= 0) {
//                                 throw new Error('Each Detailing Service must have a valid serviceName and positive price');
//                             }
//                         });
//                     });
//                 }
//                 return true;
//             }
//         }
//     },
//     carSpaCleaningService: {
//         isArray: {
//             errorMessage: 'Car Spa Cleaning Service must be an array'
//         },
//         optional: true,
//         custom: {
//             options: (items) => {
//                 if (items && items.length) {
//                     items.forEach(item => {
//                         if (!item.name || !Array.isArray(item.services)) {
//                             throw new Error('Each Car Spa Cleaning Service entry must have a name and services array');
//                         }
//                         item.services.forEach(service => {
//                             if (!service.serviceName || typeof service.price !== 'number' || service.price <= 0) {
//                                 throw new Error('Each Car Spa Cleaning Service must have a valid serviceName and positive price');
//                             }
//                         });
//                     });
//                 }
//                 return true;
//             }
//         }
//     }
// });

// module.exports = vehicleServicePricesSchema;


//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// const { checkSchema } = require('express-validator');
// const VehicleServicePrices = require('../models/vehicle-service-prices-model')



// const vehicleServicePricesSchema = checkSchema({
//     brand :{
//         notEmpty: {
//             errorMessage: 'Brand cannot be empty'
//         }
//     },
//     model: {
        
//         notEmpty: {
//             errorMessage: 'Vehicle model cannot be empty'
//         },
//         trim: true,
//         isString: {
//             errorMessage: 'Vehicle model must be a string'
//         }
//     },
//     services: {
//         isArray: {
//             errorMessage: 'Items must be an array'
//         },
//         custom: {
//             options: (items) => {
//                 if (!items.length) {
//                     throw new Error('At least one item must be included');
//                 }
//                 return true;
//             }
//         }
//     },
//     'services.*.servicesName':{
//         notEmpty: {
//             errorMessage: 'Item number cannot be empty'
//         },
//         trim: true
//     },
//     'services.*.price': {
//         exists: {
//             errorMessage: 'Pice is required'
//         },
//         notEmpty: {
//             errorMessage: 'price cannot be empty'
//         },
//         isFloat: {
//             errorMessage: 'price should be a numeric value'
//         },
//         toFloat: true
//     },
// })
    

// module.exports = vehicleServicePricesSchema;
