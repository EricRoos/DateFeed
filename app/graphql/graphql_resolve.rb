class Subscriptions::GraphqlResolve < Subscriptions::BaseSubscription
  subscription_scope :current_user_id

  field :result, [Types::Json]


  def resolve
    {
      result: {foo: :bar}
    }
  end

end
