# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'post create' do
    let(:user) { FactoryBot.create(:profile).user }

    describe '#profile' do
      subject { user.profile }

      it { is_expected.to be_persisted }
    end
  end
end
