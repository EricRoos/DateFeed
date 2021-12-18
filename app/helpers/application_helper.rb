module ApplicationHelper
  def app_token
    AppToken.where(app_name: 'rails_app').first.token
  end
end
