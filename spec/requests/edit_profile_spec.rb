# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Edit Profile', type: :request do
  subject { response }

  let(:app_token) { FactoryBot.create(:app_token) }
  let(:profile) { FactoryBot.create(:profile) }

  let(:new_data) do
    {
      age: profile.age+1,
      name: 'new name'
    }
  end

  let(:gql) do
    <<-GQL
    mutation($profile: ProfileInput!){
      editProfile(profile: $profile){
        profile {
          age
          name
        }
      }
    }
    GQL
  end

  let(:expected_response) do
    {
      data: {
        editProfile: {
          profile: new_data
        }
      }
    }
  end

  before do
    sign_in profile.user
    post '/graphql',
        params: { query: gql, variables: { profile: new_data } },
        headers: { 'X-ApiToken': app_token.token },
        as: :json
  end

  it { is_expected.to have_attributes(body: expected_response.to_json) }
  it { is_expected.to have_http_status(:ok) }

end
