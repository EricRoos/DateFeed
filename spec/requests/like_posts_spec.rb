require 'rails_helper'

RSpec.describe "LikePosts", type: :request do
  let(:profile) { FactoryBot.create(:profile) }
  let(:current_user) { profile.user }
  let!(:created_post) { FactoryBot.create(:post) }

  let(:gql) { <<-GQL
    mutation($postId: ID!){
      likeActivityFeedItem(postId: $postId){
        liked
      }
    }
    GQL
  }

  let(:expected_response) do
    {
      data: {
        likeActivityFeedItem: {
          liked: true
        }
      }
    }
  end

  before do
    sign_in current_user
    post '/graphql', params: { query: gql, variables: { postId: created_post.id } }
  end

  subject { response }
  it { is_expected.to have_attributes(body: expected_response.to_json) }
  it { is_expected.to have_http_status(200) }
end
