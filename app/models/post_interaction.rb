# frozen_string_literal: true

class PostInteraction < ApplicationRecord
  include AsyncTouchable

  belongs_to :profile
  belongs_to :post
  validates :profile, uniqueness: { scope: :post }

  alias interactor profile

  after_commit :send_notification, on: :create

  async_touch :profile

  def send_notification
    LikedPostNotification.with(interaction: self).deliver_later(post.profile.user)
  end
end
