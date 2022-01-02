class Subscriptions::Notifications < Subscriptions::BaseSubscription
  field :notifications, [Integer]
  def update
    "test"
  end

  def resolve
    { notifications: [1,2,3] }
  end
end
