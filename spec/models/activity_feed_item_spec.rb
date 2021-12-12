require 'rails_helper'

RSpec.describe ActivityFeedItem , type: :model do
  let(:post) { FactoryBot.create(:post) }
  let(:current_profile) { post.profile }
  let(:feed_item) { described_class.new({post: post, current_profile: current_profile}) }

  describe '#likeable?' do
    subject { feed_item.likeable? }
    it { is_expected.to be false }

    context 'when current_profile is someone else' do
      let(:current_profile) { FactoryBot.build(:profile) }
      it { is_expected.to be true }
    end
  end
end
