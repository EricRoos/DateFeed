require 'rails_helper'

RSpec.describe ProfileGeoDetail, type: :model do
  describe 'can only create one location per profile 'do
    let(:profile) { FactoryBot.create(:profile) }
    let(:detail) { FactoryBot.create(:profile_geo_detail, profile: profile) }
    before do
      FactoryBot.create(:profile_geo_detail, profile: profile)
    end

    subject { FactoryBot.build(:profile_geo_detail, profile: profile) }
    it { is_expected.to_not be_valid }
  end

  describe 'updating existing record' do
    let(:profile) { FactoryBot.create(:profile) }
    let(:detail) { FactoryBot.create(:profile_geo_detail, profile: profile) }
    let(:new_lat) { 5.0 }
    let(:new_long) { 7.0 }

    before do
      detail.update(latitude: new_lat, longitude: new_long )
      detail.reload
    end

    subject { detail }
    it { is_expected.to have_attributes(latitude: new_lat, longitude: new_long) }
  end

end
