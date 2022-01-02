module Types
  class SubscriptionType < Types::BaseObject
    field :notifications, subscription: Subscriptions::Notifications
    field :randomNumber, Integer, null: false, description: 'A new link'

    def randomNumber
      (SecureRandom.random_number * 10000).to_i
    end
  end
end

