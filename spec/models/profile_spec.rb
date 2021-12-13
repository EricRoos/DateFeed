require 'rails_helper'

RSpec.describe Profile, type: :model do
  describe '#valid?' do
    subject { FactoryBot.build(:profile) }
    it { is_expected.to be_valid }
  end

  describe '#shared_interactions_with' do
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

    subject { me.shared_interactions_with }

    it { is_expected.to eq [other.id, other3.id] }
  end
end
