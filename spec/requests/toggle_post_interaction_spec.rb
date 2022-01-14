# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'LikePosts', type: :request do
  subject { response }

  let(:app_token) { FactoryBot.create(:app_token) }
  let(:profile) { FactoryBot.create(:profile) }
  let(:current_user) { profile.user }
  let!(:created_post) { FactoryBot.create(:post) }
  let(:expected_like) { true }
  let(:liked) { true }

  let(:exists_query) { PostInteraction.where(post: created_post).where(profile: profile) }

  let(:gql) do
    <<-GQL
    mutation($postId: ID!, $liked: Boolean!){
      togglePostInteraction(postId: $postId, liked: $liked){
        liked
      }
    }
    GQL
  end

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
    post '/graphql',
         params: { query: gql, variables: { postId: created_post.id, liked: liked } },
         headers: current_user.create_new_auth_token,
         as: :json
  end

  it { is_expected.to have_attributes(body: expected_response.to_json) }
  it { is_expected.to have_http_status(:ok) }

  describe 'the added interaction' do
    subject { exists_query }

    it { is_expected.to exist }
  end

  context 'when i have already liked the post' do
    let!(:created_post) { FactoryBot.create(:post, interacted_with_by: [profile]) }
    let(:expected_like) { false }
    let(:liked) { false }

    it { is_expected.to have_attributes(body: expected_response.to_json) }
    it { is_expected.to have_http_status(:ok) }

    describe 'the removed interaction' do
      subject { exists_query }

      it { is_expected.not_to exist }
    end
  end

  context 'when i have already liked the post but I toggle on' do
    let!(:created_post) { FactoryBot.create(:post, interacted_with_by: [profile]) }
    let(:expected_like) { true }
    let(:liked) { true }

    it { is_expected.to have_attributes(body: expected_response.to_json) }
    it { is_expected.to have_http_status(:ok) }

    describe 'the original interaction' do
      subject { exists_query }

      it { is_expected.to exist }
    end
  end

  context 'when i have not already liked the post but I toggle off' do
    let(:expected_like) { false }
    let(:liked) { false }

    it { is_expected.to have_attributes(body: expected_response.to_json) }
    it { is_expected.to have_http_status(:ok) }

    describe 'the original interaction' do
      subject { exists_query }

      it { is_expected.not_to exist }
    end
  end
end
