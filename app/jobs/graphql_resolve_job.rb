class GraphqlResolveJob < ApplicationJob
  queue_as :default

  def perform(args)
    args.symbolize_keys!
    query = args[:query]
    variables = args[:variables]
    context = args[:context]
    operation_name = args[:operation_name]
    result = DateFeedSchema.execute(query, variables: variables, context: context, operation_name: operation_name)
    Rails.logger.info("STORE RESULT[User ID: #{context[:current_user].id}][#{job_id}] - #{result}")
    DateFeedSchema.subscriptions.trigger(
      "graphql_resolve",
      {},
      {result: result, job_id: job_id},
      scope: context[:current_user].id
    )
  end
end
