require 'rails_helper'

RSpec.describe "LikePosts", type: :request do
  let(:profile) { FactoryBot.create(:profile) }
  let(:current_user) { profile.user }
  let!(:created_post) { FactoryBot.create(:post) }
  let(:expected_like) { true }

  let(:exists_query) { PostInteraction.where(post: created_post).where(profile: profile) }

  let(:gql) { <<-GQL
    mutation($postId: ID!){
      togglePostInteraction(postId: $postId){
        liked
      }
    }
    GQL
  }

  let(:expected_response) do
    {
      data: {
        togglePostInteraction: {
          liked: expected_like 
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

  describe 'the added interaction' do
    subject { exists_query }
    it { is_expected.to exist }
  end

  context 'when i have already liked the post' do
    let!(:created_post) { FactoryBot.create(:post, interacted_with_by: [ profile ]) }
    let(:expected_like) { false }
    it { is_expected.to have_attributes(body: expected_response.to_json) }
    it { is_expected.to have_http_status(200) }
    describe 'the removed interaction' do
      subject { exists_query }
      it { is_expected.to_not exist }
    end
  end
end
