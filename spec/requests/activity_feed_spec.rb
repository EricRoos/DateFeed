require 'rails_helper'

RSpec.describe "FetchActivityFeed", type: :request do
  describe "GRAPHQL #activity_feed" do
    let(:profile) { FactoryBot.create(:profile) }
    let!(:created_post) { FactoryBot.create(:post, profile: profile) }

    let(:gql) { <<-GQL
      {
        activityFeed {
          content
          profile {
            name
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
              content: created_post.content,
              profile: {
                name: profile.name
              }
            }
          ]
        }
      }
    end

    before do
      post '/graphql', params: { query: gql }
    end

    subject { response }
    it { is_expected.to have_attributes(body: expected_response.to_json) }
    it { is_expected.to have_http_status(200) }
  end
end
