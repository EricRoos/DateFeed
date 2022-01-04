class Subscriptions::Notifications < Subscriptions::BaseSubscription
  subscription_scope :current_user_id

  field :messages, [String]


  def update
    "test"
  end

  def resolve
    if object && object[:notification_id]
      message = Notification.find(object[:notification_id]).to_notification.message
    else
      message = nil
    end
    {
      messages: [ message ].compact
    }
  end

end
