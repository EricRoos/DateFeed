# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ActivityFeed, type: :model do
  describe '#for' do
    let(:current_profile) { FactoryBot.create(:profile) }
    let(:num_posts) { 5 }
    let!(:posts) { num_posts.times { FactoryBot.create(:post) } }
    subject { described_class.for(current_profile) }
    it { is_expected.to have_attributes(size: num_posts) }
    it { is_expected.to satisfy { |items| items.all?(&:likeable?) } }
    context 'when I have liked something in the feed already' do
      let!(:post) { FactoryBot.create(:post, interacted_with_by: [current_profile]) }
      subject { super().detect { |a| a.post == post } }
      it { is_expected.to have_attributes(likeable?: true) }
    end

    context 'when I have a post in the feed' do
      let!(:post) { FactoryBot.create(:post, profile: current_profile) }
      subject { super().detect { |a| a.post == post } }
      it { is_expected.to be_nil }
    end
  end
end
