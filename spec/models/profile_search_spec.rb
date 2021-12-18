# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ProfileSearch, type: :model do
  describe '#results' do
    context 'when search by min and max age' do
      subject { described_class.new(search_params).results }

      let(:search_params) do
        { min_age: 35, max_age: 50 }
      end
      let(:in_range) do
        [
          FactoryBot.create(:profile, age: 35),
          FactoryBot.create(:profile, age: 40),
          FactoryBot.create(:profile, age: 50)
        ]
      end
      let(:out_range) do
        [
          FactoryBot.create(:profile, age: 34),
          FactoryBot.create(:profile, age: 51),
          FactoryBot.create(:profile, age: 70)
        ]
      end

      before do
        in_range
        out_range
        Sunspot.commit
      end

      it { is_expected.to match_array in_range }
      it { is_expected.not_to match_array out_range }
    end

    context 'when search by max age' do
      subject { described_class.new(search_params).results }

      let(:search_params) do
        { max_age: 50 }
      end
      let(:in_range) do
        [
          FactoryBot.create(:profile, age: 35),
          FactoryBot.create(:profile, age: 40),
          FactoryBot.create(:profile, age: 50)
        ]
      end
      let(:out_range) do
        [
          FactoryBot.create(:profile, age: 51),
          FactoryBot.create(:profile, age: 70)
        ]
      end

      before do
        in_range
        out_range
        Sunspot.commit
      end

      it { is_expected.to match_array in_range }
      it { is_expected.not_to match_array out_range }
    end

    context 'when search by min age' do
      subject { described_class.new(search_params).results }

      let(:search_params) do
        { min_age: 35 }
      end
      let(:in_range) do
        [
          FactoryBot.create(:profile, age: 35),
          FactoryBot.create(:profile, age: 40),
          FactoryBot.create(:profile, age: 50)
        ]
      end
      let(:out_range) do
        [
          FactoryBot.create(:profile, age: 18),
          FactoryBot.create(:profile, age: 20)
        ]
      end

      before do
        in_range
        out_range
        Sunspot.commit
      end

      it { is_expected.to match_array in_range }
      it { is_expected.not_to match_array out_range }
    end
  end
end
