# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :profile
  validates_presence_of :content
end
