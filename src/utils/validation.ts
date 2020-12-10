import { BadRequestError } from '../errors/BadRequestError';

export const validation = (keys, items) => {
  keys.forEach(key => {
    console.log(key, !Array.isArray(items[`${key}`]),['episodes','friends'].includes(key));

    if (!(key in items)) throw new BadRequestError(`Missing important field: ${key}`)
    else if (!items[`${key}`]) throw new BadRequestError(`Value is empty for field: ${key}`)
    else if (['episodes','friends'].includes(key) && !Array.isArray(items[`${key}`])) throw new BadRequestError(`Value have wrong type: ${key}. Need to be Array`)
  })
}
