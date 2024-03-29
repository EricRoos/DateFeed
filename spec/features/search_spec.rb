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


    # 8 miles apart
    FactoryBot.create(:profile_geo_detail, profile: me, latitude: 32.3424, longitude: -96.34343)
    FactoryBot.create(:profile_geo_detail, profile: someone, latitude: 32.423, longitude: -96.444)

    sign_in me.user
    visit '/#/search'
    click_on "Open Filters"
    fill_in 'Min Age', with: ''
    fill_in 'Min Age', with: '19'
    fill_in 'Max Age', with: 98
    click_on someone.name

    expect(page).to have_content(someone.name)
    expect(page).to have_content(someone.age)
    expect(page).to have_content(/\d+ mi./)
    someone.looking_for.each do |looking_for|
      expect(page).to have_content(looking_for)
    end
  end
end
