# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PostInteraction, type: :model do
  describe '#interactor' do
    subject { interaction.interactor }

    let(:interaction) { FactoryBot.build(:post_interaction) }

    it { is_expected.to eq interaction.profile }
  end

  describe 'validations' do
    describe 'post interaction uniqueness' do
      subject { interaction.dup.tap(&:save) }

      let!(:interaction) { FactoryBot.create(:post_interaction) }

      it { is_expected.not_to be_persisted }
    end
  end
end
