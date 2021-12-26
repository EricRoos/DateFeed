class ProfileImage < ApplicationRecord
  validates_uniqueness_of :primary, scope: :profile, if: -> { primary }
  belongs_to :profile
  has_one_attached :image

  scope :primary, -> { where(primary: true).first }
end
