class JavascriptErrorsController < ApplicationController

  def create
    Sentry.capture_message(params.to_json) if Rails.env.production?
  end
end
