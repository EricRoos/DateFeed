# frozen_string_literal: true

class PostInteraction < ApplicationRecord
  belongs_to :profile
  belongs_to :post
  validates :profile, uniqueness: { scope: :post }

  alias interactor profile

  after_commit :send_notification, on: :create

  def send_notification
    LikedPostNotification.with(interaction: self).deliver(post.profile.user)
  end
end
