# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'FetchActivityFeed', type: :request do
  let(:app_token) { FactoryBot.create(:app_token) }

  describe 'GRAPHQL #activity_feed' do
    subject { response }

    let(:profile) { FactoryBot.create(:profile) }
    let(:current_user) { profile.user }
    let!(:created_post) { FactoryBot.create(:post) }
    let!(:profile_image) { FactoryBot.create(:profile_image, primary: true, randomized_image: true, profile: created_post.profile) }

    let(:expected_likeable) { true }
    let(:gql) do
      <<-GQL
      {
        activityFeed {
          likeable
          post {
            content
            profile {
              name
              profileImageUrl
            }
          }
        }
      }
      GQL
    end

    let(:expected_response) do
      {
        data: {
          activityFeed: [
            {
              likeable: expected_likeable,
              post: {
                content: created_post.content,
                profile: {
                  name: created_post.profile.name,
                  profileImageUrl: Rails.application.routes.url_helpers.rails_blob_url(created_post.profile.profile_image.image)
                }
              }
            }
          ]
        }
      }
    end

    before do
      sign_in current_user
      post '/graphql',
           params: { query: gql },
           headers: { 'X-ApiToken': app_token.token },
           as: :json
    end

    it { is_expected.to have_attributes(body: expected_response.to_json) }
    it { is_expected.to have_http_status(:ok) }

    context 'when current user is someone else' do
      let(:current_user) { FactoryBot.create(:user) }
      let(:expected_likeable) { true }

      it { is_expected.to have_attributes(body: expected_response.to_json) }
      it { is_expected.to have_http_status(:ok) }
    end
  end
end
