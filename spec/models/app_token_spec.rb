# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AppToken, type: :model do
  describe 'uniqueness' do
    let(:token) { FactoryBot.create(:app_token) }
    subject { token.dup.tap(&:save) }
    it { is_expected.to_not be_persisted }
  end
end
