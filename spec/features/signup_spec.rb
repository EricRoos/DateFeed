require 'rails_helper'

RSpec.feature "Signups", type: :feature do
  scenario 'can signup', js: true do
    FactoryBot.create(:app_token, app_name: 'rails_app')
    visit '/users/sign_up'
    fill_in 'Email', with: "foobar@test.com"
    click_on "Next"
    fill_in 'Password', with: 'test123456'
    click_on "Next"
    fill_in 'Re-Enter Password', with: 'test123456'
    click_on "Next"
    click_on "I Accept"
    expect(page).to have_content('You did it!')
  end
end
