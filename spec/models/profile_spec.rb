require 'rails_helper'

RSpec.describe Profile, type: :model do
  describe '#valid?' do
    subject { FactoryBot.build(:profile) }
    it { is_expected.to be_valid }
  end
end
