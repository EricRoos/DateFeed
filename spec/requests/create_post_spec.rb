# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Create Post', type: :request do
  subject { response }

  let(:intended_post) { FactoryBot.build(:post, profile: profile) }
  let(:app_token) { FactoryBot.create(:app_token) }
  let(:profile) { FactoryBot.create(:profile) }
  let(:current_user) { profile.user }
  let(:exists_query) { Post.where(profile: profile, content: intended_post.content) }

  let(:gql) do
    <<-GQL
    mutation($postInput: CreatePostInput!){
      createPost(postInput: $postInput){
        post {
          id
          content
        }
        errors {
          field
          messages
        }
      }
    }
    GQL
  end

  let(:expected_response) do
    {
      data: {
        createPost: {
          post: {
            id: exists_query.first.id.to_s,
            content: intended_post.content
          },
          errors: []
        }
      }
    }
  end

  before do
    post '/graphql',
        params: { query: gql, variables: { postInput: { content: intended_post.content}}},
        headers: current_user.create_new_auth_token,
        as: :json
  end

  it { is_expected.to have_attributes(body: expected_response.to_json) }
  it { is_expected.to have_http_status(:ok) }

  describe 'the added post' do
    subject { exists_query }
    it { is_expected.to exist }
  end
  context 'when submitting an empty note' do
    let(:intended_post) { FactoryBot.build(:post, profile: profile, content: '') }
    let(:expected_response) do
      {
        data: {
          createPost: {
            post: nil,
            errors: [
              {field: 'content', messages: ["can't be blank"] }
            ]
          }
        }
      }
    end
    it { is_expected.to have_attributes(body: expected_response.to_json) }
  end
end
