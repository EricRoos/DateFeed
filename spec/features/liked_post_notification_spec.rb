require 'rails_helper'

RSpec.feature "LikedPostNotifications", type: :feature do
  scenario 'someone liking my post and receiving a notification', js: true do
    me = FactoryBot.create(:profile)
    post = FactoryBot.create(:post, profile: me)
    sign_in me.user
    visit '/#/search'
    find '#app' #wait for app to finish loading
    FactoryBot.create(:post_interaction, post: post)
    within '.toast' do
      expect(page).to have_content("liked your post")
    end
  end
end
