# frozen_string_literal: true

class ProfileSearch
  include ActiveModel::Model

  attr_accessor :min_age, :max_age, :profile_id

  def perform
    @perform ||= Profile.search do
      with(:age, (min_age || 18)...(max_age || 120))
      with(:shared_interactions_with, [profile_id]) if profile_id.present?
    end
  end

  def results
    perform.results
  end

  def total
    perform.total
  end
end
