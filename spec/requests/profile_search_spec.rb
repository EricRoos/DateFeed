require 'rails_helper'

RSpec.describe "Search Profiles", type: :request do
  describe "GRAPHQL #search_profiles" do
    let(:profile) { FactoryBot.create(:profile, age: 21) }
    let(:current_user) { profile.user }
    let!(:created_post) { FactoryBot.create(:post, profile: profile) }

    let!(:sought_for) { FactoryBot.create(:profile, age: 50) }
    
    let!(:outliers) do
      FactoryBot.create(:profile, age: 66)
    end 

    let(:gql) { <<-GQL
      query ProfileSearch($searchParam: ProfileSearchInput!){
        profileSearch(searchParam: $searchParam) {
          name
          age
        }
      }
      GQL
    }

    let(:expected_response) do
      {
        data: {
          profileSearch: [
            { name: sought_for.name, age: sought_for.age }        
          ]
        }
      }
    end

    before do

      sign_in current_user
      Sunspot.commit
      searchParam = {
        minAge: 45,
        maxAge: 65
      }
      post '/graphql', params: { query: gql, variables: { searchParam: searchParam } }, as: :json
    end

    subject { response }
    it { is_expected.to have_attributes(body: expected_response.to_json) }
    it { is_expected.to have_http_status(200) }

  end
end
