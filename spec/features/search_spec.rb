require 'rails_helper'

RSpec.feature "Searches", type: :feature do

  # Given someone has liked one of my posts
  # When I like their post
  # And I search for them
  # Then I see them in the search results
  scenario 'search for people', js: true do
    FactoryBot.create(:app_token, app_name: 'rails_app')

    someone = FactoryBot.create(:profile)
    me = FactoryBot.create(:profile)

    FactoryBot.create(:post, profile: me, interacted_with_by: [ someone ] )
    FactoryBot.create(:post, profile: someone, interacted_with_by: [ me ] )

    me.index
    someone.index
    Sunspot.commit

    sign_in me.user
    visit '/#/search'
    expect(page).to have_content(someone.name)
  end
end