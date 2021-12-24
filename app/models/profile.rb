# frozen_string_literal: true
require 'haversine'

class Profile < ApplicationRecord
  belongs_to :user
  validates_uniqueness_of :user
  has_many :posts
  has_one :profile_geo_detail

  delegate :latitude, :longitude, to: :profile_geo_detail, allow_nil: true

  has_many :profile_images

  searchable do
    integer :age
    integer :shared_interactions_with, multiple: true
    latlon(:coord) { Sunspot::Util::Coordinates.new(self.latitude, self.longitude) }
  end

  def shared_interactions_with
    interaction_profiles = Hash.new(0)
    PostInteraction
      .joins(:post)
      .joins(:profile)
      .where('profiles.id = ? OR posts.profile_id = ?', id, id)
      .group('profiles.id, posts.profile_id')
      .order('profiles.id')
      .pluck('profiles.id, posts.profile_id')
      .flatten
      .each { |profile_id| interaction_profiles[profile_id] += 1 unless profile_id == id }

    interaction_profiles
      .select { |_k, v| v > 1 }
      .keys
  end

  def profile_image
    profile_images.primary
  end

  def distance_to_profile(profile, unit=:miles)
    return nil unless latitude.present? && longitude.present? && profile.latitude.present? && profile.longitude.present?
    Haversine.distance_in_mile(
      latitude,
      longitude,
      profile.latitude,
      profile.longitude
    )
  end
end
