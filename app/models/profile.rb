class Profile < ApplicationRecord
  belongs_to :user

  searchable auto_index: false do
    integer :age
    integer :shared_interactions_with, multiple: true
  end

  def shared_interactions_with
    interaction_profiles = Hash.new(0)
    PostInteraction
      .joins(:post)
      .joins(:profile)
      .where("profiles.id = ? OR posts.profile_id = ?", id, id)
      .group("profiles.id, posts.profile_id")
      .order("profiles.id")
      .pluck("profiles.id, posts.profile_id")
      .flatten
      .each { |profile_id| interaction_profiles[profile_id] += 1 unless profile_id == self.id}

    interaction_profiles
      .select { |k,v| v > 1 }
      .keys
  end
end
