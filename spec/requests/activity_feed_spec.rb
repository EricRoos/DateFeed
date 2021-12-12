require 'rails_helper'

RSpec.describe "FetchActivityFeed", type: :request do
  describe "GRAPHQL #activity_feed" do
    let(:profile) { FactoryBot.create(:profile) }
    let(:current_user) { profile.user }
    let!(:created_post) { FactoryBot.create(:post, profile: profile) }

    let(:expected_likeable) { false }
    let(:gql) { <<-GQL
      {
        activityFeed {
          likeable
          post {
            content
            profile {
              name
            }
          }
        }
      }
      GQL
    }

    let(:expected_response) do
      {
        data: {
          activityFeed: [
            {
              likeable: expected_likeable,
              post: {
                content: created_post.content,
                profile: {
                  name: profile.name
                }
              }
            }
          ]
        }
      }
    end

    before do
      sign_in current_user
      post '/graphql', params: { query: gql }
    end

    subject { response }
    it { is_expected.to have_attributes(body: expected_response.to_json) }
    it { is_expected.to have_http_status(200) }

    context 'when current user is someone else' do
      let(:current_user) { FactoryBot.create(:user) }
      let(:expected_likeable) { true }
      it { is_expected.to have_attributes(body: expected_response.to_json) }
      it { is_expected.to have_http_status(200) }
    end
  end
end
