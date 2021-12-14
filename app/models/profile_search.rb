class ProfileSearch
  include ActiveModel::Model

  attr_accessor :min_age, :max_age, :profile_id

  def perform
    @perform ||= Profile.search do
      with(:age, (min_age || 18)...(max_age || 120)) 
      if profile_id.present?
        with(:shared_interactions_with, [profile_id])
      end
    end
  end

  def results
    perform.results
  end

  def total
    perform.total
  end

end
