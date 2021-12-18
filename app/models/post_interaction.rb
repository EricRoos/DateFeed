# frozen_string_literal: true

class PostInteraction < ApplicationRecord
  belongs_to :profile
  belongs_to :post
  validates :profile, uniqueness: { scope: :post }

  alias interactor profile
end
