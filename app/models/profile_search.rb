class ProfileSearch
  include ActiveModel::Model

  attr_accessor :min_age, :max_age

  def perform
    @perform ||= Profile.search do
      with(:age, (min_age || 18)...(max_age || 120)) 
    end
  end

  def results
    perform.results
  end

  def total
    perform.total
  end

end
