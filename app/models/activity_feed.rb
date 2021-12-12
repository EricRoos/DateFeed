class ActivityFeed
  def self.for(profile)
    Post.select("posts.*, post_interactions.id as interaction_id")
      .joins(:profile)
      .joins("LEFT JOIN post_interactions on post_interactions.post_id = posts.id and post_interactions.profile_id = #{profile.id}")
      .order(created_at: :desc)
      .limit(50)
      .map do |post|
        ActivityFeedItem.new(
          post: post,
          current_profile: profile,
          liked: post.interaction_id.present?
        )
      end
  end
end
