class ActivityFeed
  def self.for(profile)
    Post.includes(:profile)
      .order(created_at: :desc)
      .limit(50)
      .map do |post|
        ActivityFeedItem.new(post: post, current_profile: profile)
      end
  end
end
