# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Profile, type: :model do
  let(:profile) { FactoryBot.create(:profile) }

  describe '#latitude, #longitude' do
    let(:geo) { FactoryBot.create(:profile_geo_detail, profile: profile) }
    subject { profile }

    it { is_expected.to have_attributes(latitude: geo.latitude, longitude: geo.longitude) }
    context 'when no geo location' do
      let(:geo) { nil }
      it { is_expected.to have_attributes(latitude: nil, longitude: nil) }
    end
  end

  describe '#valid?' do
    subject { profile } 
    it { is_expected.to be_valid }
  end

  describe '#shared_interactions_with' do
    subject { me.shared_interactions_with }

    let(:other) { FactoryBot.create(:profile) }
    let(:other2) { FactoryBot.create(:profile) }
    let(:other3) { FactoryBot.create(:profile) }
    let(:me) { FactoryBot.create(:profile) }

    let!(:my_post) { FactoryBot.create(:post, profile: me, interacted_with_by: [other]) }
    let!(:my_other_post) { FactoryBot.create(:post, profile: me, interacted_with_by: [other2]) }
    let!(:my_other_other_post) { FactoryBot.create(:post, profile: me, interacted_with_by: [other3]) }

    let!(:other_post) { FactoryBot.create(:post, profile: other, interacted_with_by: [me]) }
    let!(:other_other_post) { FactoryBot.create(:post, profile: other3, interacted_with_by: [me]) }
    let!(:misc_post) { FactoryBot.create(:post, interacted_with_by: [other]) }

    it { is_expected.to match_array [other.id, other3.id] }
  end

  describe '#distance_to_profile' do
    let(:me) { FactoryBot.build(:profile_geo_detail, latitude: 32.524, longitude: -96.4342).profile }
    let(:them) { FactoryBot.build(:profile_geo_detail, latitude: 32.14, longitude: -96.78342).profile }

    subject { me.distance_to_profile(them) }

    it { is_expected.to eq 33.49793318686372 }
  end
end
