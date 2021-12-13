module Types
  class ProfileSearchInputType < Types::BaseInputObject
    argument :min_age, Integer, "min age to return", required: false
    argument :max_age, Integer, "max age to return", required: false
  end
end
