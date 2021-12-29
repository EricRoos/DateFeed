require 'rails_helper'

RSpec.feature "Signups", type: :feature do
  scenario 'can signup', js: true do
    FactoryBot.create(:app_token, app_name: 'rails_app')
    visit '/users/sign_up'
    fill_in 'Email', with: "foobar@test.com"
    fill_in 'Password', with: 'test123456'
    fill_in 'Password confirmation', with: 'test123456'
    click_on 'Sign up'
    expect(page).to have_content('Activity Feed')
  end
end
