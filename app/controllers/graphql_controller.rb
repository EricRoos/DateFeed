# frozen_string_literal: true

class GraphqlController < ApplicationController
  include GraphqlDevise::Concerns::SetUserByToken

  # If accessing from outside this domain, nullify the session
  # This allows for outside API access while preventing CSRF attacks,
  # but you'll have to authenticate your user separately
  protect_from_forgery with: :null_session
  skip_before_action :authenticate_user!
  #before_action :check_app_token!

  def execute
    variables = prepare_variables(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]


    context = {
      current_user: current_user
    }.merge(gql_devise_context(User))


    if query.match(/^\{?\s*async\./)
      query.gsub!(/^\{\s*async\./, '{')
      actual_query = query.gsub(/^\s*async\./, '')
      job_id = GraphqlResolveJob.perform_later({
        query: actual_query,
        context: context,
        operation_name: operation_name,
        variables: variables
      }).job_id
      query = actual_query
      render json: { data: { jobId: job_id} }
    elsif variables[:async]
      job_id = GraphqlResolveJob.perform_later({
        query: query,
        context: context.to_h.slice(:current_user),
        operation_name: operation_name,
        variables: variables
      }).job_id
      render json: { data: { jobId: job_id} }
    else
      result = DateFeedSchema.execute(query, variables: variables, context: context, operation_name: operation_name)
      render json: result
    end
  rescue StandardError => e
    raise e unless Rails.env.development?

    handle_error_in_development(e)
  end

  private

  def check_app_token!
    host = request.ip
    token = request.headers['X-ApiToken']
    Rails.logger.info("[AppTokenCheck][#{host}] - #{token}")
    valid = AppToken.exists?(token: token, host: host)
    head :bad_request and return unless valid
  end

  # Handle variables in form data, JSON body, or a blank value
  def prepare_variables(variables_param)
    case variables_param
    when String
      if variables_param.present?
        JSON.parse(variables_param) || {}
      else
        {}
      end
    when Hash
      variables_param
    when ActionController::Parameters
      variables_param.to_unsafe_hash # GraphQL-Ruby will validate name and type of incoming variables.
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{variables_param}"
    end
  end

  def handle_error_in_development(e)
    logger.error e.message
    logger.error e.backtrace.join("\n")

    render json: { errors: [{ message: e.message, backtrace: e.backtrace }], data: {} }, status: :internal_server_error
  end

end
