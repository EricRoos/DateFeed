# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :check_app_token!, if: -> { request.format.json? }

  private

  def check_app_token!
    host = request.ip
    token = request.headers['X-ApiToken']
    valid = AppToken.exists?(token: token, host: host)
    head :bad_request and return unless valid
  end
end
