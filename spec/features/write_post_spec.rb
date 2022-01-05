require 'rails_helper'

RSpec.feature "Searches", type: :feature do

  # Given someone has liked one of my posts
  # When I like their post
  # And I search for them
  # Then I see them in the search results
  scenario 'search for people', js: true do
    FactoryBot.create(:app_token, app_name: 'rails_app')
    me = FactoryBot.create(:profile)
    sign_in me.user
    visit '/#/'
    click_on 'New post'
    fill_in 'Content', with: 'my post'
    click_on 'Share'
    expect(page).to have_content('Post saved')
    expect(page).to have_content(me.name)
  end
end
