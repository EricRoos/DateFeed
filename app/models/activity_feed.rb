# frozen_string_literal: true

class ActivityFeed
  def self.for(profile, radius=5)
    in_range_profile_ids = []
    if profile.latitude && profile.longitude
      in_range_profile_ids = Profile.search {
        with(:coord).in_radius(profile.latitude, profile.longitude, 5) 
      }.hits.map{ |h| h.primary_key.to_i }
    end
    in_range_profile_ids << profile.id
    Post.select('posts.*, post_interactions.id as interaction_id')
        .includes(:profile)
        .joins("LEFT JOIN post_interactions on post_interactions.post_id = posts.id and post_interactions.profile_id = #{profile.id}")
        .where(posts: { profile_id: in_range_profile_ids})
        .order(created_at: :desc)
        #.where.not(posts: { profile_id: profile.id })
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
