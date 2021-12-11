class ActivityFeed
  def self.for(profile)
    Post.includes(:profile)
      .order(created_at: :desc)
      .limit(50)
  end
end
