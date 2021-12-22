class ProfileGeoDetail < ApplicationRecord
  belongs_to :profile
  validates_uniqueness_of :profile
end
