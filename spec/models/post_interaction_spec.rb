# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PostInteraction, type: :model do
  describe '#interactor' do
    let(:interaction) { FactoryBot.build(:post_interaction) }
    subject { interaction.interactor }
    it { is_expected.to eq interaction.profile }
  end

  describe 'validations' do
    describe 'post interaction uniqueness' do
      let!(:interaction) { FactoryBot.create(:post_interaction) }
      subject { interaction.dup.tap(&:save) }
      it { is_expected.to_not be_persisted }
    end
  end
end
