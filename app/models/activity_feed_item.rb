class ActivityFeedItem
  include ActiveModel::Model
  attr_accessor :post, :current_profile

  def likeable?
    post.profile != current_profile
  end
end
