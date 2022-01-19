require 'rails_helper'

RSpec.feature "Searches", type: :feature do

  # Given someone has liked one of my posts
  # When I like their post
  # And I search for them
  # Then I see them in the search results
  scenario 'search for people', js: true do
    FactoryBot.create(:app_token, app_name: 'rails_app')
    me = FactoryBot.create(:profile, name: '', age: nil)
    sign_in me.user
    visit '/#/'
    click_on 'Menu'
    click_on 'Profile'
    fill_in 'Name', with: 'updated name'
    click_on 'Save'
    me.reload
    expect(me.name).to eq 'updated name'
  end
end
