module Types
  class SubscriptionType < Types::BaseObject
    field :notifications, subscription: Subscriptions::Notifications
    field :graphql_resolve, subscription: Subscriptions::GraphqlResolve

    def randomNumber
      (SecureRandom.random_number * 10000).to_i
    end
  end
end

