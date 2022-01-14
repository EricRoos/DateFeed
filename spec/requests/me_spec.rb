# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'FetchMe', type: :request do
  let(:app_token) { FactoryBot.create(:app_token) }
  let(:current_user) { FactoryBot.create(:profile).user }

  describe 'GRAPHQL #me' do
    subject { response }

    let(:profile) { current_user.profile }

    let(:request) do
      <<-GQL
      {
        profile(id: null) {
          name
          age
        }
      }
      GQL
    end
    let(:expected_response) do
      {
        data: {
          profile: {
            name: profile.name,
            age: profile.age
          }
        }
      }
    end

    before do
      post '/graphql',
           params: { query: request },
           headers: current_user.create_new_auth_token,
           as: :json
    end

    it { is_expected.to have_attributes(body: expected_response.to_json) }
    it { is_expected.to have_http_status(:ok) }
  end
end
