import {stripe} from "~/server/utils/stripe";
import {serverSupabaseUser} from "#supabase/server";

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User not found',
    })
  }

  const { data: subscriptions} = await stripe.subscriptions.list({
    customer: user.user_metadata.stripe_customer_id,
  })

  if (!subscriptions.length) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Subscription not found',
    })
  }

  user.user_metadata.plan = 'premium'
})