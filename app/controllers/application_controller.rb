class ApplicationController < ActionController::Base
  before_action :check_app_token!, if: -> { request.format.json? }

  private

  def check_app_token!
    host = request.ip
    token = request.headers['X-ApiToken']
    valid = AppToken.where(token: token, host: host).exists?
    head :bad_request and return unless valid
  end
end
