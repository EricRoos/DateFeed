require 'rails_helper'

RSpec.describe ProfileImage, type: :model do
  describe 'can only have one primary image' do
    let(:image) { FactoryBot.create(:profile_image, primary: true) }
    subject { image.dup.tap { |s| s.save } }
    it { is_expected.to_not be_persisted }
    it { is_expected.to satisfy { |s| s.errors.include?(:primary) } }
  end
end
