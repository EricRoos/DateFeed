# frozen_string_literal: true

class ActivityFeedItem
  include ActiveModel::Model
  attr_accessor :post, :current_profile, :liked

  def likeable?
    return false unless current_profile

    post.profile != current_profile
  end
end
