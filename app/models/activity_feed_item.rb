# frozen_string_literal: true

class ActivityFeedItem
  include ActiveModel::Model
  attr_accessor :post, :current_profile, :liked

  # are we able to interact with the like button or not
  def likeable?
    return false unless current_profile

    post.profile != current_profile
  end
end
