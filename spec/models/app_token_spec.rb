# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AppToken, type: :model do
  describe 'uniqueness' do
    subject { token.dup.tap(&:save) }

    let(:token) { FactoryBot.create(:app_token) }

    it { is_expected.not_to be_persisted }
  end
end
