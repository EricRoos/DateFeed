# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Post, type: :model do
  describe 'content presence' do
    let(:post) { FactoryBot.build(:post, content: nil) }
    before do
      post.valid?
    end
    subject { post.errors[:content] }
    it { is_expected.to be_present }
  end
end
