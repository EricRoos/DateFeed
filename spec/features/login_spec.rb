require 'rails_helper'

RSpec.feature "Logins", type: :feature do
  scenario 'add feature spec' do
    FactoryBot.create(:app_token, app_name: 'rails_app')
    visit '/users/sign_in'
  end

end
