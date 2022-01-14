# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Search Profiles', type: :request do
  let(:app_token) { FactoryBot.create(:app_token) }

  describe 'GRAPHQL #search_profiles' do
    subject { response }

    let(:profile) { FactoryBot.create(:profile, age: 21) }
    let(:current_user) { profile.user }
    let!(:created_post) { FactoryBot.create(:post, profile: profile) }

    let!(:sought_for) { FactoryBot.create(:profile, age: 50, looking_for: [:right_now]) }

    let!(:sought_for_post) { FactoryBot.create(:post, profile: sought_for, interacted_with_by: [profile]) }
    let!(:my_post) { FactoryBot.create(:post, profile: profile, interacted_with_by: [sought_for]) }

    let!(:outliers) do
      FactoryBot.create(:profile, age: 66)
      sought_for.dup.update(looking_for: [:dates])
    end

    let(:gql) do
      <<-GQL
      query ProfileSearch($searchParam: ProfileSearchInput!){
        profileSearch(searchParam: $searchParam) {
          name
          age
          distance
          lookingFor
        }
      }
      GQL
    end

    let(:expected_response) do
      {
        data: {
          profileSearch: [
            {
              name: sought_for.name,
              age: sought_for.age,
              distance: '8 mi.',
              lookingFor: sought_for.looking_for
            }
          ]
        }
      }
    end

    before do
      FactoryBot.create(:profile_geo_detail, profile: sought_for, latitude: 32.3424, longitude: -96.34343)
      FactoryBot.create(:profile_geo_detail, profile: profile, latitude: 32.423, longitude: -96.444)
      Profile.all.each(&:index)
      Sunspot.commit
      searchParam = {
        minAge: 45,
        maxAge: 65,
        lookingFor: [:right_now]
      }
      post '/graphql',
           params: { query: gql, variables: { searchParam: searchParam } },
           headers: current_user.create_new_auth_token,
           as: :json
    end

    it { is_expected.to have_attributes(body: expected_response.to_json) }
    it { is_expected.to have_http_status(:ok) }
  end
end
