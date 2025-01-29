import {stripe} from "~/server/utils/stripe";

export default defineEventHandler(async (event) => {
  const { email } = getQuery(event)

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email is required',
    })
  }

  return await stripe.customers.create({
    email: email as string,
  })
})