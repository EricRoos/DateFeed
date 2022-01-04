class Subscriptions::GraphqlResolve < Subscriptions::BaseSubscription
  subscription_scope :current_user_id

  field :result, GraphQL::Types::JSON
  field :job_id, ID

  def resolve
    {
      result: object.try(:[],:result),
      job_id: object.try(:[], :job_id)
    }
  end

end
