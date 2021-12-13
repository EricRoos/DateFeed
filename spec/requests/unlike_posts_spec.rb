require 'rails_helper'

RSpec.describe "UnLikePosts", type: :request do
  let(:profile) { FactoryBot.create(:profile) }
  let(:current_user) { profile.user }
  let!(:created_post) { FactoryBot.create(:post, interacted_with_by: [ profile ]) }

  let(:gql) { <<-GQL
    mutation($postId: ID!){
      unlikeActivityFeedItem(postId: $postId){
        unliked
      }
    }
    GQL
  }

  let(:expected_response) do
    {
      data: {
        unlikeActivityFeedItem: {
          unliked: true
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

  describe 'the removed like' do
    subject { PostInteraction.where(post: created_post).where(profile: profile) }
    it { is_expected.to_not exist }
  end
end
