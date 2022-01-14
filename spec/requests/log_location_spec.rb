# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Log Location', type: :request do
  subject { response }

  let(:app_token) { FactoryBot.create(:app_token) }
  let(:latitude) { 32.345 }
  let(:longitude) { -72.34 }
  let(:profile) { FactoryBot.create(:profile) }
  let(:current_user) { profile.user }
  let(:exists_query) { ProfileGeoDetail.where(profile: profile, latitude: latitude, longitude: longitude) }
  let(:existing_geo_location) { nil }

  let(:gql) do
    <<-GQL
    mutation($latitude: Float! $longitude: Float!){
      logLocation(latitude: $latitude, longitude: $longitude){
        logged
      }
    }
    GQL
  end

  let(:expected_response) do
    {
      data: {
        logLocation: {
          logged: true
        }
      }
    }
  end

  before do
    existing_geo_location
    post '/graphql',
        params: { query: gql, variables: { latitude: latitude, longitude: longitude}},
        headers: current_user.create_new_auth_token,
        as: :json
  end

  it { is_expected.to have_attributes(body: expected_response.to_json) }
  it { is_expected.to have_http_status(:ok) }

  describe 'the added location' do
    let(:existing_geo_location) { FactoryBot.create(:profile_geo_detail, profile: profile) }
    subject { exists_query }
    it { is_expected.to exist }
  end

end
