# frozen_string_literal: true

module ApplicationHelper
  def app_token
    AppToken.where(app_name: 'rails_app').first.token
  end
end
