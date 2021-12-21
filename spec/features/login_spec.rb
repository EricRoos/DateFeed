require 'rails_helper'

RSpec.feature "Logins", type: :feature do
  scenario 'add feature spec', js: true do
    FactoryBot.create(:app_token, app_name: 'rails_app')
    profile = FactoryBot.create(:profile)
    visit '/users/sign_in'
    fill_in 'Email', with: profile.user.email
    fill_in 'Password', with: 'test123456'
    click_on 'Log in'
    expect(page).to have_content('Activity Feed')
  end

end
