class PostInteraction < ApplicationRecord
  belongs_to :profile
  belongs_to :post
  validates_uniqueness_of :profile, scope: :post

  alias :interactor :profile
end
