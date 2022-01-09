# frozen_string_literal: true

class Post < ApplicationRecord
  include AsyncTouchable
  belongs_to :profile
  validates_presence_of :content
  async_touch :profile
end
