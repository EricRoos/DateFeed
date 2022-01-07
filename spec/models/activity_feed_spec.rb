# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ActivityFeed, type: :model do
  describe '#for' do
    subject { described_class.for(current_profile) }

    let(:current_profile) { FactoryBot.create(:profile, with_geo_detail: true) }
    let(:num_posts) { 5 }
    let(:interacted_with_by){ [] }
    before do
      num_posts.times { 
        profile = FactoryBot.create(:profile, with_geo_detail: true)
        FactoryBot.create(:post, profile: profile, interacted_with_by: interacted_with_by)
      }
      Profile.all.each(&:index!)
    end

    it { is_expected.to have_attributes(size: num_posts) }
    it { is_expected.to satisfy { |items| items.all?(&:likeable?) } }
    it { is_expected.to satisfy { |items| items.none?(:liked) } }

    context 'when I have liked the feed already' do
      let(:interacted_with_by){ [current_profile] }
      it { is_expected.to have_attributes(size: num_posts) }
      it { is_expected.to satisfy { |items| items.all?(&:likeable?) } }
      it { is_expected.to satisfy { |items| items.all?(&:liked) } }
    end

  end
end
