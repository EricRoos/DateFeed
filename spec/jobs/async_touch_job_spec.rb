require 'rails_helper'

RSpec.describe AsyncTouchJob, type: :job do
  let(:post) { FactoryBot.create(:post) }
  before do
    post
    sleep 2
    described_class.new.perform(post)
  end

  subject { post.updated_at }
  it { is_expected.to_not eq post.created_at }

end
