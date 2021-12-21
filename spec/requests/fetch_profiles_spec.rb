# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'FetchProfiles', type: :request do
  let(:app_token) { FactoryBot.create(:app_token) }
  let(:current_user) { FactoryBot.create(:profile).user }

  describe 'GRAPHQL #profile' do
    subject { response }

    let(:profile) { FactoryBot.create(:profile) }
    let(:request) do
      <<-GQL
      {
        profile(id: #{profile.id}) {
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
      sign_in current_user
      post '/graphql',
           params: { query: request },
           headers: { 'X-ApiToken': app_token.token },
           as: :json
    end

    it { is_expected.to have_attributes(body: expected_response.to_json) }
    it { is_expected.to have_http_status(:ok) }
  end
end
